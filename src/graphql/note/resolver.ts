import { DateTimeResolver } from "graphql-scalars";
import { Note } from "../../entities/note";
import { INotesRepository } from "../../repositories/notes-repository";

interface MutationArgs {
  id: string;
}

export function getNoteResolver(repository: INotesRepository) {
  return {
    DateTime: DateTimeResolver,
    Query: {
      getNotes: async () => await repository.getNotes(),
    },
    Mutation: {
      writeNote: async (_: any, args: Note) => await repository.writeNote(args),
      prioritizeNote: async (_: any, { id }: MutationArgs) =>
        await repository.prioritizeNote(id),
      updateStatus: async (_: any, { id }: MutationArgs) =>
        await repository.updateStatus(id),
      deleteNote: async (_: any, { id }: MutationArgs) =>
        await repository.deleteNote(id),
    },
  };
}
