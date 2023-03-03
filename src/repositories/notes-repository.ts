import { Note, Status } from "../entities/note";

export interface INotesRepository {
  getNotes: () => Promise<Note[]>;
  writeNote(note: Note): Promise<void>;
  prioritizeNote(id: number, priority: boolean): Promise<void>;
  updateStatus(id: number, status: Status): Promise<void>;
  deleteNote(id: number): Promise<void>;
}
