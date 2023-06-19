import { Note, Status } from "../../src/entities/note";

export function makeNote(noteId?: number) {
  return new Note(
    {
      created_at: new Date(),
      body: "This is a note.",
      title: "My note",
      priority: false,
      status: Status.UNFINISHED,
    },
    noteId ?? 1
  );
}
