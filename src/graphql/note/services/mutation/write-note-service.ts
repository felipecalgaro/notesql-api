import { Note } from "../../../../entities/note";
import { INotesRepository } from "../../../../repositories/notes-repository";

export interface WriteNoteArgs {
  body: string;
  title: string;
  authorId: number;
}

export async function writeNoteService(
  args: WriteNoteArgs,
  repository: INotesRepository
) {
  const note = new Note({
    body: args.body,
    title: args.title,
    priority: false,
    status: "UNFINISHED",
  });

  const writtenNote = await repository.writeNote(note, args.authorId);

  if (!writtenNote) throw new Error("Error while writing a note.");

  return writtenNote;
}
