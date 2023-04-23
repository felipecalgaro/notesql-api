import { Note, Status } from "../../src/entities/note";
import { User } from "../../src/entities/user";
import { INotesRepository } from "../../src/repositories/notes-repository";
import { makeUser } from "../factory/user-factory";
import { InMemoryUsersRepository } from "./in-memory-users-repository";

export class InMemoryNotesRepository implements INotesRepository {
  public notes: Note[] = [];

  async getNotesByAuthor(authorId: number): Promise<Note[]> {
    return this.notes.filter((note) => note.author!.id === authorId);
  }

  async writeNote(
    data: { body: string; title: string },
    authorId: number
  ): Promise<Note | null> {
    const inMemoryUsersRepository = new InMemoryUsersRepository();

    await Promise.all([
      inMemoryUsersRepository.createUser(
        makeUser("test-1", "test1@email.com", authorId)
      ),
      inMemoryUsersRepository.createUser(
        makeUser("test-2", "test2@email.com", 1)
      ),
    ]);

    const note = new Note(
      {
        author: inMemoryUsersRepository.users.find(
          (user) => user.id === authorId
        ) as User,
        body: data.body,
        created_at: new Date(),
        priority: false,
        status: "UNFINISHED",
        title: data.title,
      },
      authorId ?? 1
    );

    this.notes.push(note);

    return note;
  }

  async prioritizeNote(id: number, priority: boolean): Promise<Note | null> {
    const note = this.notes.find((note) => note.id === id);

    if (!note) {
      return null;
    }

    note.priority = priority;

    return note;
  }

  async updateStatus(id: number, status: Status): Promise<Note | null> {
    const note = this.notes.find((note) => note.id === id);

    if (!note) {
      return null;
    }

    note.status = status;

    return note;
  }

  async deleteNote(id: number): Promise<boolean> {
    const note = this.notes.find((note) => note.id === id);

    if (!note) {
      return false;
    }

    return note.delete();
  }
}
