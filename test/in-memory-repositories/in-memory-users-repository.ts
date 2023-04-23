import { User } from "../../src/entities/user";
import { IUsersRepository } from "../../src/repositories/users-repository";

export class InMemoryUsersRepository implements IUsersRepository {
  public users: User[] = [];

  async getUsers() {
    return this.users;
  }

  async authenticateUser(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email);

    if (!user) return null;

    return user;
  }

  async createUser(user: User): Promise<User | null> {
    this.users.push(user);

    if (!user) return null;

    return user;
  }
}
