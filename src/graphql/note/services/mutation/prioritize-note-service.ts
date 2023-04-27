import { INotesRepository } from "../../../../repositories/notes-repository";

export interface PrioritizeNoteArgs {
  id: string;
  priority: boolean;
}

export async function prioritizeNoteService(
  args: PrioritizeNoteArgs,
  repository: INotesRepository
) {
  const note = await repository.prioritizeNote(Number(args.id), args.priority);

  if (!note) throw new Error("Error while prioritizing a note.");

  return note;
}
