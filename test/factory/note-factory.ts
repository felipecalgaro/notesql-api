import { Note } from "../../src/entities/note";
import { makeUser } from "./user-factory";

export function makeNote(authorPassword?: string, id?: number) {
  return new Note(
    {
      created_at: new Date(),
      author: makeUser(authorPassword),
      body: "This is a note.",
      title: "My note",
      priority: false,
      status: "UNFINISHED",
    },
    id
  );
}
