import { Name } from "../../src/entities/name";
import { User } from "../../src/entities/user";

export function makeUser(password = "1234", email = "test@test.com", id = 1) {
  return new User(
    {
      created_at: new Date(),
      email,
      name: new Name("John Doe").value,
      password,
      avatar_url: null,
    },
    id
  );
}
