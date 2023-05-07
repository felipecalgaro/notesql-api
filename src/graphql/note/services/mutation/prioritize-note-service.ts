import { INotesRepository } from "../../../../repositories/notes-repository";
import { UserContext } from "../../../user/resolver";

export interface PrioritizeNoteArgs {
  id: string;
  priority: boolean;
}

export async function prioritizeNoteService(
  args: PrioritizeNoteArgs,
  repository: INotesRepository,
  { user }: UserContext
) {
  if (!user) throw new Error("You are not authenticated.");

  const note = await repository.prioritizeNote(Number(args.id), args.priority);

  if (!note) throw new Error("Error while prioritizing a note.");

  return note;
}
