import { IUsersRepository } from "../../../../repositories/users-repository";

export async function getUsersService(repository: IUsersRepository) {
  return await repository.getUsers();
}
