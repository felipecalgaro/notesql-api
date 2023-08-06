import { IUsersRepository } from "../../../../repositories/users-repository";
import { UserContext } from "../../resolver";

export async function getUserAndNotesService(
  repository: IUsersRepository,
  { userId }: UserContext
) {
  if (!userId) throw new Error("You are not authenticated.");

  let data;
  try {
    data = await repository.getUserAndNotes(userId);
  } catch {
    throw new Error("Could not find a user.");
  }

  return data;
}
