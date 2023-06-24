import { Status } from "../../../../entities/note";
import { INotesRepository } from "../../../../repositories/notes-repository";
import { UserContext } from "../../../user/resolver";

export interface UpdateNoteStatusArgs {
  id: string;
  status: Status;
}

export async function updateNoteStatusService(
  args: UpdateNoteStatusArgs,
  repository: INotesRepository,
  payload: UserContext
) {
  if (!payload) throw new Error("You are not authenticated.");

  const note = await repository.updateStatus(Number(args.id), args.status);

  if (!note) throw new Error("Error while updating a note status.");

  return note;
}
