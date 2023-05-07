import { describe, expect, it } from "vitest";
import { InMemoryNotesRepository } from "../../../test/in-memory-repositories/in-memory-notes-repository";
import { getNoteResolver } from "./resolver";
import { Status } from "../../entities/note";

describe("note resolver", () => {
  const inMemoryNotesRepository = new InMemoryNotesRepository();
  const noteResolver = getNoteResolver(inMemoryNotesRepository);

  it("should be able to get notes by author", async () => {
    await Promise.all([
      inMemoryNotesRepository.writeNote(
        { title: "My note", body: "This is a note." },
        1
      ),
      inMemoryNotesRepository.writeNote(
        { title: "Another note", body: "This is another note." },
        2
      ),
    ]);

    const notes = await noteResolver.Query.getNotesByAuthor(
      undefined,
      {
        authorId: "2",
      },
      {
        user: {
          id: 2,
          email: "test@email.com",
          name: "John Doe",
        },
      }
    );

    expect(notes.length).toBe(1);
    expect(notes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ author: expect.objectContaining({ id: 2 }) }),
      ])
    );
  });

  it("should be able to write a note", async () => {
    await noteResolver.Mutation.writeNote(
      undefined,
      {
        note: {
          authorId: "8",
          body: "This is a note.",
          title: "My note",
        },
      },
      {
        user: {
          id: 8,
          email: "test@email.com",
          name: "John Doe",
        },
      }
    );

    expect(inMemoryNotesRepository.notes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          author: expect.objectContaining({ id: 8 }),
        }),
      ])
    );
  });

  it("should be able to prioritize a note", async () => {
    await Promise.all([
      inMemoryNotesRepository.writeNote(
        { body: "This is a note", title: "Note-10" },
        10
      ),
      inMemoryNotesRepository.writeNote(
        { body: "This is a note", title: "Note-11" },
        11
      ),
    ]);

    await noteResolver.Mutation.prioritizeNote(
      undefined,
      {
        id: "10",
        priority: true,
      },
      {
        user: {
          id: 10,
          email: "test@email.com",
          name: "John Doe",
        },
      }
    );

    expect(inMemoryNotesRepository.notes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 10, priority: true }),
        expect.objectContaining({ id: 11, priority: false }),
      ])
    );
  });

  it("should be able to update a note status", async () => {
    await Promise.all([
      inMemoryNotesRepository.writeNote(
        { body: "This is a test", title: "Note-12" },
        12
      ),
      inMemoryNotesRepository.writeNote(
        { body: "This is a test", title: "Note-13" },
        13
      ),
    ]);

    await noteResolver.Mutation.updateStatus(
      undefined,
      {
        id: "13",
        status: Status.FINISHED,
      },
      {
        user: {
          id: 13,
          email: "test1@email.com",
          name: "John Doe",
        },
      }
    );

    expect(inMemoryNotesRepository.notes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 12, status: "UNFINISHED" }),
        expect.objectContaining({ id: 13, status: "FINISHED" }),
      ])
    );
  });

  it("should be able to delete a note", async () => {
    await noteResolver.Mutation.deleteNote(
      undefined,
      {
        id: "12",
      },
      {
        user: {
          id: 12,
          email: "test1@email.com",
          name: "John Doe",
        },
      }
    );

    expect(
      inMemoryNotesRepository.notes.find((note) => note.id === 12)
    ).toHaveProperty("deleted_at", expect.any(Date));
    expect(
      inMemoryNotesRepository.notes.find((note) => note.id !== 12)
    ).toHaveProperty("deleted_at", undefined);
    expect(() =>
      noteResolver.Mutation.deleteNote(
        undefined,
        { id: "99" },
        {
          user: {
            id: 99,
            email: "test1@email.com",
            name: "John Doe",
          },
        }
      )
    ).rejects.toThrow();
  });
});
