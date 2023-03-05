import { Note, Status } from "../../src/entities/note";
import { INotesRepository } from "../../src/repositories/notes-repository";

export class InMemoryNotesRepository implements INotesRepository {
  private notes: Note[] = [];

  async getNotes(): Promise<Note[]> {
    return this.notes;
  }

  async writeNote(note: Note): Promise<void> {
    this.notes.push(note);
  }

  async prioritizeNote(id: number, priority: boolean): Promise<void> {
    const note = this.notes.find((note) => note.id === id);

    if (!note) {
      throw new Error("Could not find a note.");
    }

    note.priority = priority;
  }

  async updateStatus(id: number, status: Status): Promise<void> {
    const note = this.notes.find((note) => note.id === id);

    if (!note) {
      throw new Error("Could not find a note.");
    }

    note.status = status;
  }

  async deleteNote(id: number): Promise<void> {
    const note = this.notes.find((note) => note.id === id);

    if (!note) {
      throw new Error("Could not find a note.");
    }

    note.delete(new Date());
  }
}
