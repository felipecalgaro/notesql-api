import { User } from "../entities/User";

export interface AuthenticateData {
  email: string;
  password: string;
}

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
}

export interface IUsersRepository {
  getUsers: () => Promise<User[]>;
  authenticate: (data: AuthenticateData) => Promise<User | null>;
  createUser: (user: User) => Promise<void>;
}
