import { Status } from "../../../../entities/note";
import { INotesRepository } from "../../../../repositories/notes-repository";

export interface UpdateNoteStatusArgs {
  id: string;
  status: Status;
}

export async function updateNoteStatusService(
  args: UpdateNoteStatusArgs,
  repository: INotesRepository
) {
  const note = await repository.updateStatus(Number(args.id), args.status);

  if (!note) throw new Error("Error while updating a note status.");

  return note;
}
