import { Note } from "../../../../entities/note";
import { INotesRepository } from "../../../../repositories/notes-repository";

export interface WriteNoteArgs {
  note: {
    body: string;
    title: string;
    authorId: number;
  };
}

export async function writeNoteService(
  args: WriteNoteArgs,
  repository: INotesRepository
) {
  const note = new Note({
    body: args.note.body,
    title: args.note.title,
    priority: false,
    status: "UNFINISHED",
  });

  const writtenNote = await repository.writeNote(note, args.note.authorId);

  if (!writtenNote) throw new Error("Error while writing a note.");

  return writtenNote;
}
