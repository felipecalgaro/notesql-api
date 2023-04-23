import { Name } from "../../../../entities/name";
import { User } from "../../../../entities/user";
import { IUsersRepository } from "../../../../repositories/users-repository";
import { authService } from "../auth";

export interface CreateUserArgs {
  user: {
    email: string;
    password: string;
    name: string;
  };
}

export async function createUserService(
  args: CreateUserArgs,
  repository: IUsersRepository
) {
  const hashedPassword = await authService.hashPassword(args.user.password);

  const user = new User({
    email: args.user.email,
    name: new Name(args.user.name).value,
    password: hashedPassword,
  });

  const createdUser = await repository.createUser(user);

  if (!createdUser) throw new Error("Error while creating a user.");

  return createdUser;
}
