import { User } from "../entities/user";

export interface AuthenticateData {
  email: string;
  password: string;
}

export interface CreateUserData {
  email: string;
  password: string;
  name: string;
}

export interface IUsersRepository {
  getUsers: () => Promise<User[]>;
  authenticate: (data: AuthenticateData) => Promise<User | null>;
  createUser: (user: User) => Promise<void>;
}
