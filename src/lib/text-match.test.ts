import { describe, expect, it } from "vitest";
import { getTextMatchParts } from "./text-match";

describe("getTextMatchParts", () => {
  it("preserves original text while matching accents and casing", () => {
    expect(getTextMatchParts("Melocotón", "COTO")).toEqual([
      { text: "Melo", match: false },
      { text: "cotó", match: true },
      { text: "n", match: false },
    ]);
  });

  it("returns unmarked text for an empty query", () => {
    expect(getTextMatchParts("Manzana", "  ")).toEqual([{ text: "Manzana", match: false }]);
  });
});
