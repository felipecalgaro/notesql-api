import { makeUser } from "../../../test/factory/user-factory";
import { InMemoryUsersRepository } from "../../../test/in-memory-repositories/in-memory-users-repository";
import { describe, expect, it } from "vitest";
import { getUserResolver } from "./resolver";

describe("user resolver", () => {
  const inMemoryUsersRepository = new InMemoryUsersRepository();
  const userResolver = getUserResolver(inMemoryUsersRepository);

  it("should be able to get users", async () => {
    await Promise.all([
      inMemoryUsersRepository.createUser(makeUser()),
      inMemoryUsersRepository.createUser(makeUser()),
      inMemoryUsersRepository.createUser(makeUser()),
    ]);

    const users = await userResolver.Query.getUsers();

    expect(users.length).toBe(3);
    expect(users).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "John Doe" }),
        expect.objectContaining({ name: "John Doe" }),
        expect.objectContaining({ name: "John Doe" }),
      ])
    );
  });

  it("should be able to authenticate user", async () => {
    const user = makeUser("test-password");

    await Promise.all([
      inMemoryUsersRepository.createUser(user),
      inMemoryUsersRepository.createUser(makeUser("another-password")),
    ]);

    const authenticatedUser = await userResolver.Query.authenticate(undefined, {
      email: user.email,
      password: user.password,
    });

    const unauthenticatedUser = await userResolver.Query.authenticate(
      undefined,
      {
        email: "fake@email.com",
        password: "123",
      }
    );

    expect(authenticatedUser).toEqual(
      expect.objectContaining({ email: user.email, password: user.password })
    );
    expect(unauthenticatedUser).toBeFalsy();
  });

  it("should be able to create user", async () => {
    await userResolver.Mutation.createUser(undefined, {
      email: "test@email.com",
      name: "John",
      password: "123",
    });

    expect(inMemoryUsersRepository.users).toEqual(
      expect.arrayContaining([expect.objectContaining({ password: "123" })])
    );
  });
});
