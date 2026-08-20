import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./button";

describe("Button", () => {
  it("renders its semantic element, variant and interaction", () => {
    const onClick = vi.fn();
    render(<Button variant="destructive" onClick={onClick}>Eliminar</Button>);
    const button = screen.getByRole("button", { name: "Eliminar" });
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledOnce();
    expect(button.getAttribute("data-slot")).toBe("button");
    expect(button.className).toContain("text-destructive");
  });
});
