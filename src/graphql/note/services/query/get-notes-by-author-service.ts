import { INotesRepository } from "../../../../repositories/notes-repository";

export interface GetNotesByAuthorArgs {
  authorId: string;
}

export async function getNotesByAuthorService(
  args: GetNotesByAuthorArgs,
  repository: INotesRepository
) {
  const notes = await repository.getNotesByAuthor(Number(args.authorId));

  return notes;
}
