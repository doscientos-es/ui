import { describe, expect, it } from "vitest";
import { cn } from "./cn";

describe("cn", () => {
  it("combines conditional values and keeps the final conflicting utility", () => {
    expect(cn("px-2", false, "px-4", { "text-sm": true })).toBe("px-4 text-sm");
  });
});