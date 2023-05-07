import { INotesRepository } from "../../../../repositories/notes-repository";
import { UserContext } from "../../../user/resolver";

export interface GetNotesByAuthorArgs {
  authorId: string;
}

export async function getNotesByAuthorService(
  args: GetNotesByAuthorArgs,
  repository: INotesRepository,
  { user }: UserContext
) {
  if (!user) throw new Error("You are not authenticated.");

  const notes = await repository.getNotesByAuthor(Number(args.authorId));

  return notes;
}
