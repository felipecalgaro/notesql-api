import { DateTimeResolver } from "graphql-scalars";
import { INotesRepository } from "../../repositories/notes-repository";
import {
  WriteNoteArgs,
  writeNoteService,
} from "./services/mutation/write-note-service";
import {
  PrioritizeNoteArgs,
  prioritizeNoteService,
} from "./services/mutation/prioritize-note-service";
import {
  UpdateNoteStatusArgs,
  updateNoteStatusService,
} from "./services/mutation/update-note-status-service";
import {
  DeleteNoteArgs,
  deleteNoteService,
} from "./services/mutation/delete-note-service";
import {
  GetNotesByAuthorArgs,
  getNotesByAuthorService,
} from "./services/query/get-notes-by-author-service";
import { Status } from "../../entities/note";

export function getNoteResolver(repository: INotesRepository) {
  return {
    Status,
    DateTime: DateTimeResolver,
    Query: {
      getNotesByAuthor: async (_: any, args: GetNotesByAuthorArgs) =>
        await getNotesByAuthorService(args, repository),
    },
    Mutation: {
      writeNote: async (_: any, args: WriteNoteArgs) =>
        await writeNoteService(args, repository),
      prioritizeNote: async (_: any, args: PrioritizeNoteArgs) =>
        await prioritizeNoteService(args, repository),
      updateStatus: async (_: any, args: UpdateNoteStatusArgs) =>
        await updateNoteStatusService(args, repository),
      deleteNote: async (_: any, args: DeleteNoteArgs) =>
        await deleteNoteService(args, repository),
    },
  };
}
