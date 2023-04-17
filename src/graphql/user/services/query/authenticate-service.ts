import { IUsersRepository } from "../../../../repositories/users-repository";

export interface AuthenticateArgs {
  email: string;
  password: string;
}

export async function authenticateUserService(
  args: AuthenticateArgs,
  repository: IUsersRepository
) {
  const { email, password } = args;

  const user = await repository.authenticateUser({ email, password });

  if (!user) throw new Error("Incorrect credentials.");

  return user;
}
