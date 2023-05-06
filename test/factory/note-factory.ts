import { Note, Status } from "../../src/entities/note";
import { makeUser } from "./user-factory";

export function makeNote(
  authorPassword?: string,
  noteId?: number,
  authorId?: number
) {
  return new Note(
    {
      created_at: new Date(),
      author: makeUser(authorPassword, "test@test.com", authorId),
      body: "This is a note.",
      title: "My note",
      priority: false,
      status: Status.UNFINISHED,
    },
    noteId ?? 1
  );
}
