import { describe, expect, it } from "vitest";
import { Name } from "./name";

describe("name entity", () => {
  it("should not be able to create a name of more than 30 characters", () => {
    expect(() => new Name("John Doe ".repeat(5))).toThrow();
  });
});
