import { IUsersRepository } from "../../repositories/users-repository";
import { DateTimeResolver } from "graphql-scalars";
import {
  AuthenticateArgs,
  authenticateUserService,
} from "./services/query/authenticate-service";
import { getUsersService } from "./services/query/get-users-service";
import {
  CreateUserArgs,
  createUserService,
} from "./services/mutation/create-user-service";

export function getUserResolver(repository: IUsersRepository) {
  return {
    DateTime: DateTimeResolver,
    Query: {
      getUsers: async () => await getUsersService(repository),
      authenticateUser: async (_: any, args: AuthenticateArgs) =>
        await authenticateUserService(args, repository),
    },
    Mutation: {
      createUser: async (_: any, args: CreateUserArgs) =>
        await createUserService(args, repository),
    },
  };
}
