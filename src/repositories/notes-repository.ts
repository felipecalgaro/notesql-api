import { Note, Status } from "../entities/note";

export interface INotesRepository {
  getNotesByAuthor: (authorId: number) => Promise<Note[]>;
  writeNote: (data: Note, authorId: number) => Promise<Note | null>;
  prioritizeNote: (noteId: number, priority: boolean) => Promise<Note | null>;
  updateStatus: (noteId: number, status: Status) => Promise<Note | null>;
  deleteNote: (noteId: number) => Promise<boolean>;
}
