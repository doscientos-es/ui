import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AspectRatio } from "./aspect-ratio";

describe("AspectRatio", () => {
  it("sets the requested CSS aspect ratio", () => {
    render(<AspectRatio ratio={16 / 9} data-testid="preview" />);
    expect(screen.getByTestId("preview").style.aspectRatio).toBe("1.7777777777777777");
  });
});