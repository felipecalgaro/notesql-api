import { IUsersRepository } from "../../../../repositories/users-repository";
import { authService } from "../auth";

export interface AuthenticateArgs {
  email: string;
  password: string;
}

export async function authenticateUserService(
  args: AuthenticateArgs,
  repository: IUsersRepository
) {
  const { email, password } = args;

  const user = await repository.authenticateUser({
    email,
  });

  if (!user) throw new Error("Incorrect e-mail.");

  const isPasswordValid = await authService.comparePassword(
    password,
    user.password
  );

  if (!isPasswordValid) throw new Error("Incorrect password.");

  return user;
}
