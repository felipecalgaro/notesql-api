import { describe, expect, it } from "vitest";
import { InMemoryNotesRepository } from "../../../test/in-memory-repositories/in-memory-notes-repository";
import { getNoteResolver } from "./resolver";
import { makeNote } from "../../../test/factory/note-factory";

describe("note resolver", () => {
  const inMemoryNotesRepository = new InMemoryNotesRepository();
  const noteResolver = getNoteResolver(inMemoryNotesRepository);

  it("should be able to get notes by author", async () => {
    await Promise.all([
      inMemoryNotesRepository.writeNote(makeNote("test", 1, 1)),
      inMemoryNotesRepository.writeNote(makeNote(undefined, 2, 2)),
      inMemoryNotesRepository.writeNote(makeNote("123456", 3, 2)),
    ]);

    const notes = await noteResolver.Query.getNotesByAuthor(undefined, {
      authorId: 2,
    });

    expect(notes.length).toBe(2);
    expect(notes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ author: expect.objectContaining({ id: 2 }) }),
        expect.objectContaining({ author: expect.objectContaining({ id: 2 }) }),
      ])
    );
  });

  it("should be able to write a note", async () => {
    const note = makeNote("test-password", 8);

    await noteResolver.Mutation.writeNote(undefined, note);

    expect(inMemoryNotesRepository.notes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 8,
          author: expect.objectContaining({ password: "test-password" }),
        }),
      ])
    );
  });

  it("should be able to prioritize a note", async () => {
    await Promise.all([
      inMemoryNotesRepository.writeNote(makeNote("123", 10)),
      inMemoryNotesRepository.writeNote(makeNote("123", 11)),
    ]);

    await noteResolver.Mutation.prioritizeNote(undefined, {
      id: 10,
      priority: true,
    });

    expect(inMemoryNotesRepository.notes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 10, priority: true }),
        expect.objectContaining({ id: 11, priority: false }),
      ])
    );
  });

  it("should be able to update a note status", async () => {
    await Promise.all([
      inMemoryNotesRepository.writeNote(makeNote("1234", 12)),
      inMemoryNotesRepository.writeNote(makeNote("123", 13)),
    ]);

    await noteResolver.Mutation.updateStatus(undefined, {
      id: 13,
      status: "FINISHED",
    });

    expect(inMemoryNotesRepository.notes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 12, status: "UNFINISHED" }),
        expect.objectContaining({ id: 13, status: "FINISHED" }),
      ])
    );
  });

  it("should be able to delete a note", async () => {
    await noteResolver.Mutation.deleteNote(undefined, {
      id: 12,
    });

    expect(
      inMemoryNotesRepository.notes.find((note) => note.id === 12)
    ).toHaveProperty("deleted_at", expect.any(Date));
    expect(
      inMemoryNotesRepository.notes.find((note) => note.id !== 12)
    ).toHaveProperty("deleted_at", undefined);
    expect(() =>
      noteResolver.Mutation.deleteNote(undefined, { id: 99 })
    ).rejects.toThrow();
  });
});
