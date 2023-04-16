import { INotesRepository } from "../../../../repositories/notes-repository";

export interface DeleteNoteArgs {
  id: number;
}

export async function deleteNoteService(
  args: DeleteNoteArgs,
  repository: INotesRepository
) {
  const deleted = await repository.deleteNote(args.id);

  if (!deleted) throw new Error("Error while deleting a note.");

  return deleted;
}
