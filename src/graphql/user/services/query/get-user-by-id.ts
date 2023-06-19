import { IUsersRepository } from "../../../../repositories/users-repository";
import { UserContext } from "../../resolver";

export interface GetUserAndNotesArgs {
  id: number;
}

export async function getUserAndNotesService(
  args: GetUserAndNotesArgs,
  repository: IUsersRepository,
  { user }: UserContext
) {
  if (!user) throw new Error("You are not authenticated.");

  const data = await repository.getUserAndNotes(Number(args.id));

  if (!data) throw new Error("Could not find a user.");

  return data;
}
