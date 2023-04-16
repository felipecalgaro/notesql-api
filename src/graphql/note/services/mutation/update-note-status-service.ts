import { Status } from "../../../../entities/note";
import { INotesRepository } from "../../../../repositories/notes-repository";

export interface UpdateNoteStatusArgs {
  id: number;
  status: Status;
}

export async function updateNoteStatusService(
  args: UpdateNoteStatusArgs,
  repository: INotesRepository
) {
  const note = await repository.updateStatus(args.id, args.status);

  if (!note) throw new Error("Error while updating a note status.");

  return note;
}
