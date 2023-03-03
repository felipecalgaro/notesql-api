import { DateTimeResolver } from "graphql-scalars";
import { Note, Status } from "../../entities/note";
import { INotesRepository } from "../../repositories/notes-repository";

export function getNoteResolver(repository: INotesRepository) {
  return {
    DateTime: DateTimeResolver,
    Query: {
      getNotes: async () => await repository.getNotes(),
    },
    Mutation: {
      writeNote: async (_: any, args: Note) => await repository.writeNote(args),
      prioritizeNote: async (_: any, args: { id: number; priority: boolean }) =>
        await repository.prioritizeNote(args.id, args.priority),
      updateStatus: async (_: any, args: { id: number; status: Status }) =>
        await repository.updateStatus(args.id, args.status),
      deleteNote: async (_: any, args: { id: number }) =>
        await repository.deleteNote(args.id),
    },
  };
}
