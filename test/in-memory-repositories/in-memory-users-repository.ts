import { User } from "../../src/entities/user";
import {
  AuthenticateData,
  IUsersRepository,
} from "../../src/repositories/users-repository";

export class InMemoryUsersRepository implements IUsersRepository {
  private users: User[] = [];

  async getUsers() {
    return this.users;
  }

  async authenticate(userData: AuthenticateData): Promise<User | null> {
    const user = this.users.find(
      (user) =>
        user.email === userData.email && user.password === userData.password
    );

    if (!user) {
      return null;
    }

    return user;
  }

  async createUser(user: User): Promise<void> {
    this.users.push(user);
  }
}
