import { describe, expect, it } from "vitest";
import { Name } from "./name";
import { User } from "./user";

describe("user entity", () => {
  it("should be able to create a user", () => {
    const user = new User({
      created_at: new Date(),
      email: "test@email.com",
      name: new Name("Felipe").value,
      password: "123",
    });

    expect(user).toBeTruthy();
    expect(user).toEqual(expect.objectContaining({ name: "Felipe" }));
  });
});
