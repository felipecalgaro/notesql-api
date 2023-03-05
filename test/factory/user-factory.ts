import { Name } from "../../src/entities/name";
import { User } from "../../src/entities/user";

export function makeUser(password?: string) {
  return new User({
    created_at: new Date(),
    email: "test@test.com",
    name: new Name("John Doe").value,
    password: password ?? "1234",
  });
}
