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
  payload: UserContext
) {
  if (!payload) throw new Error("You are not authenticated.");

  const note = new Note({
    body: args.note.body,
    title: args.note.title,
    priority: false,
    status: Status.UNFINISHED,
  });

  const writtenNote = await repository.writeNote(note, payload.userId);

  if (!writtenNote) throw new Error("Error while writing a note.");

  return writtenNote;
}
