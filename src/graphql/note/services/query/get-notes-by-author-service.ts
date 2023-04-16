import { INotesRepository } from "../../../../repositories/notes-repository";

export interface GetNotesByAuthorArgs {
  authorId: number;
}

export async function getNotesByAuthorService(
  args: GetNotesByAuthorArgs,
  repository: INotesRepository
) {
  const notes = await repository.getNotesByAuthor(args.authorId);

  return notes;
}
