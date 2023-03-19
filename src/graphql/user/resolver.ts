import { User } from "../../entities/user";
import {
  AuthenticateData,
  CreateUserData,
  IUsersRepository,
} from "../../repositories/users-repository";
import { DateTimeResolver } from "graphql-scalars";
import { Name } from "../../entities/name";

export function getUserResolver(repository: IUsersRepository) {
  return {
    DateTime: DateTimeResolver,
    Query: {
      getUsers: async () => await repository.getUsers(),
      authenticate: async (_: any, args: AuthenticateData) =>
        await repository.authenticate(args),
    },
    Mutation: {
      createUser: async (_: any, args: CreateUserData) => {
        const user = new User({
          email: args.email,
          name: new Name(args.name).value,
          password: args.password,
        });

        await repository.createUser(user);
      },
    },
  };
}
