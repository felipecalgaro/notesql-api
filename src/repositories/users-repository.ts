import { User } from "../entities/user";

export interface IUsersRepository {
  getUsers: () => Promise<User[]>;
  authenticateUser: (email: string) => Promise<User | null>;
  createUser: (user: User) => Promise<User | null>;
  getUserAndNotes: (id: number) => Promise<User | null>;
}
