import { Note, Status } from "../../../../entities/note";
import { INotesRepository } from "../../../../repositories/notes-repository";
import { UserContext } from "../../../user/resolver";

export interface WriteNoteArgs {
  note: {
    body: string;
    title: string;
  };
}

export async function writeNoteService(
  args: WriteNoteArgs,
  repository: INotesRepository,
  { userId }: UserContext
) {
  if (!userId) throw new Error("You are not authenticated.");

  if (!args.note.title || !args.note.body)
    throw new Error("Please fill out all fields.");

  const note = new Note({
    body: args.note.body,
    title: args.note.title,
    priority: false,
    status: Status.UNFINISHED,
  });

  const writtenNote = await repository.writeNote(note, userId);

  if (!writtenNote) throw new Error("Error while writing a note.");

  return writtenNote;
}
