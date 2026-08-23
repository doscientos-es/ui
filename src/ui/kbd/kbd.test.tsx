import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Kbd, KbdGroup } from "./kbd";

describe("Kbd", () => {
  it("groups shortcuts without invalid nested kbd elements", () => {
    const { container } = render(
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>,
    );

    const group = container.querySelector('[data-slot="kbd-group"]');
    expect(group?.tagName).toBe("SPAN");
    expect(group?.querySelectorAll("kbd")).toHaveLength(2);
  });
});