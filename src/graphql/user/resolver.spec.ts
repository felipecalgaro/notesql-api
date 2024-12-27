import { makeUser } from "../../../test/factory/user-factory";
import { InMemoryUsersRepository } from "../../../test/in-memory-repositories/in-memory-users-repository";
import { describe, expect, it } from "vitest";
import { getUserResolver } from "./resolver";
import { authService } from "./services/auth";
import { makeNote } from "../../../test/factory/note-factory";

describe("user resolver", () => {
  const inMemoryUsersRepository = new InMemoryUsersRepository();
  const userResolver = getUserResolver(inMemoryUsersRepository);

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

  it("should be able to get a user and their notes", async () => {
    const notes = [makeNote(20), makeNote(21)];
    const user = makeUser("test-password", "test@test.com", 98, notes);

    await inMemoryUsersRepository.createUser(user);

    const data = await userResolver.Query.getUserAndNotes(
      undefined,
      undefined,
      { userId: user.id! }
    );

    expect(data).toEqual(
      expect.objectContaining({
        id: 98,
        notes: expect.arrayContaining([
          expect.objectContaining({
            id: 20,
          }),
          expect.objectContaining({
            id: 21,
          }),
        ]),
      })
    );

    expect(
      userResolver.Query.getUserAndNotes(undefined, undefined, {
        userId: 999,
      })
    ).resolves.toBeFalsy();
  });
});
