import { User } from "../../entities/user";
import {
  AuthenticateData,
  IUsersRepository,
} from "../../repositories/users-repository";

export function getUserResolver(repository: IUsersRepository) {
  return {
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
