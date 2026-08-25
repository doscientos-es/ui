import { describe, expect, it } from "vitest";
import { actionRipple } from "./action-ripple";

describe("actionRipple", () => {
  it("provides reusable press and reduced-motion styles", () => {
    const className = actionRipple();

    expect(className).toContain("overflow-hidden");
    expect(className).toContain("active:after:scale-150");
    expect(className).toContain("data-pressed:after:scale-150");
    expect(className).toContain("motion-reduce:after:hidden");
  });

  it("accepts additional classes", () => {
    expect(actionRipple({ className: "rounded-xl" })).toContain("rounded-xl");
  });
});