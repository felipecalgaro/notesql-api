import { makeUser } from "../../../test/factory/user-factory";
import { InMemoryUsersRepository } from "../../../test/in-memory-repositories/in-memory-users-repository";
import { describe, expect, it } from "vitest";
import { getUserResolver } from "./resolver";
import { authService } from "./services/auth";

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
    const hashedPassword = await authService.hashPassword("test-password");

    const user = makeUser(hashedPassword, "auth-test@email.com");

    await inMemoryUsersRepository.createUser(user);

    const { user: authenticatedUser } =
      await userResolver.Query.authenticateUser(undefined, {
        email: "auth-test@email.com",
        password: "test-password",
      });

    expect(authenticatedUser).toEqual(
      expect.objectContaining({ email: user.email, password: user.password })
    );

    expect(() =>
      userResolver.Query.authenticateUser(undefined, {
        email: "fake@email.com",
        password: "123",
      })
    ).rejects.toThrow();
  });

  it("should be able to create user", async () => {
    await userResolver.Mutation.createUser(undefined, {
      user: {
        email: "create-user@email.com",
        name: "John",
        password: "123",
      },
    });

    expect(inMemoryUsersRepository.users).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "John",
          email: "create-user@email.com",
        }),
      ])
    );
  });
});
