import { User } from "../../entities/user";
import {
  AuthenticateData,
  IUsersRepository,
} from "../../repositories/users-repository";
import { DateTimeResolver } from "graphql-scalars";

export function getUserResolver(repository: IUsersRepository) {
  return {
    DateTime: DateTimeResolver,
    Query: {
      getUsers: async () => await repository.getUsers(),
      authenticate: async (_: any, args: AuthenticateData) =>
        await repository.authenticate(args),
    },
    Mutation: {
      createUser: async (_: any, args: User) =>
        await repository.createUser(args),
    },
  };
}
