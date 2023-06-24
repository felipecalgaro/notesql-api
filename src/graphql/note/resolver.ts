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
  deleteNoteService,
  DeleteNoteArgs,
} from "./services/mutation/delete-note-service";
import { Status } from "../../entities/note";
import { UserContext } from "../user/resolver";

export function getNoteResolver(repository: INotesRepository) {
  return {
    Status,
    DateTime: DateTimeResolver,
    Mutation: {
      writeNote: async (_: any, args: WriteNoteArgs, context: UserContext) =>
        await writeNoteService(args, repository, context),
      prioritizeNote: async (
        _: any,
        args: PrioritizeNoteArgs,
        context: UserContext
      ) => await prioritizeNoteService(args, repository, context),
      updateStatus: async (
        _: any,
        args: UpdateNoteStatusArgs,
        context: UserContext
      ) => await updateNoteStatusService(args, repository, context),
      deleteNote: async (_: any, args: DeleteNoteArgs, context: UserContext) =>
        await deleteNoteService(args, repository, context),
    },
  };
}
