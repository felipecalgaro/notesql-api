import { INotesRepository } from "../../../../repositories/notes-repository";
import { UserContext } from "../../../user/resolver";

export interface DeleteNoteArgs {
  id: string;
}

export async function deleteNoteService(
  args: DeleteNoteArgs,
  repository: INotesRepository,
  { user }: UserContext
) {
  if (!user) throw new Error("You are not authenticated.");

  const deleted = await repository.deleteNote(Number(args.id));

  if (!deleted) throw new Error("Error while deleting a note.");

  return deleted;
}
