import { IUsersRepository } from "../../../../repositories/users-repository";
import { UserContext } from "../../resolver";

export async function getUserAndNotesService(
  repository: IUsersRepository,
  payload: UserContext
) {
  if (!payload) throw new Error("You are not authenticated.");

  const data = await repository.getUserAndNotes(payload.userId);

  if (!data) throw new Error("Could not find a user.");

  return data;
}
