import { User } from "../entities/user";
import { AuthenticateArgs } from "../graphql/user/services/query/authenticate-service";

export interface IUsersRepository {
  getUsers: () => Promise<User[]>;
  authenticateUser: (data: AuthenticateArgs) => Promise<User | null>;
  createUser: (user: User) => Promise<User | null>;
}
