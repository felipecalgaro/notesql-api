import { IUsersRepository } from "../../repositories/users-repository";
import { DateTimeResolver } from "graphql-scalars";
import {
  AuthenticateArgs,
  authenticateUserService,
} from "./services/query/authenticate-service";
import {
  CreateUserArgs,
  createUserService,
} from "./services/mutation/create-user-service";
import { getUserAndNotesService } from "./services/query/get-user-and-notes";

export interface UserContext {
  userId: number;
}

export function getUserResolver(repository: IUsersRepository) {
  return {
    DateTime: DateTimeResolver,
    Query: {
      authenticateUser: async (_: any, args: AuthenticateArgs) =>
        await authenticateUserService(args, repository),
      getUserAndNotes: async (_: any, args: undefined, context: UserContext) =>
        await getUserAndNotesService(repository, context),
    },
    Mutation: {
      createUser: async (_: any, args: CreateUserArgs) =>
        await createUserService(args, repository),
    },
  };
}
