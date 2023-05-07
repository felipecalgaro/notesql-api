import { Note, Status } from "../../../../entities/note";
import { INotesRepository } from "../../../../repositories/notes-repository";
import { UserContext } from "../../../user/resolver";

export interface WriteNoteArgs {
  note: {
    body: string;
    title: string;
    authorId: string;
  };
}

export async function writeNoteService(
  args: WriteNoteArgs,
  repository: INotesRepository,
  { user }: UserContext
) {
  if (!user) throw new Error("You are not authenticated.");

  const note = new Note({
    body: args.note.body,
    title: args.note.title,
    priority: false,
    status: Status.UNFINISHED,
  });

  const writtenNote = await repository.writeNote(
    note,
    Number(args.note.authorId)
  );

  if (!writtenNote) throw new Error("Error while writing a note.");

  return writtenNote;
}
