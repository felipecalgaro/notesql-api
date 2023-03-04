import { describe, expect, it } from "vitest";
import { makeUser } from "../../test/factory/user-factory";
import { Note } from "./note";

describe("note entity", () => {
  it("should be able to create a note", () => {
    const note = new Note({
      created_at: new Date(),
      author: makeUser(),
      body: "This is a test",
      title: "Note title",
      priority: false,
      status: "UNFINISHED",
    });

    expect(note).toEqual(
      expect.objectContaining({
        author: expect.objectContaining({
          password: "1234",
          name: "John Doe",
        }),
      })
    );
  });
});
