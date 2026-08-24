import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Button, LinkButton } from "./button";

describe("Button", () => {
  it("renders its semantic element, variant and interaction", () => {
    const onClick = vi.fn();
    render(
      <Button variant="destructive" onClick={onClick}>
        Eliminar
      </Button>,
    );
    const button = screen.getByRole("button", { name: "Eliminar" });
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledOnce();
    expect(button.getAttribute("data-slot")).toBe("button");
    expect(button.className).toContain("text-destructive");
    expect(button.className).toContain("rounded-lg");
    expect(button.className).not.toContain("rounded-full");
  });

  it("renders navigation with button styling as a link", () => {
    render(
      <LinkButton href="/clientes" variant="outline">
        Ver clientes
      </LinkButton>,
    );
    const link = screen.getByRole("link", { name: "Ver clientes" });
    expect(link.getAttribute("href")).toBe("/clientes");
    expect(link.getAttribute("data-variant")).toBe("outline");
  });

  it("uses React Aria disabled semantics", () => {
    render(<Button isDisabled>No disponible</Button>);
    expect(screen.getByRole("button", { name: "No disponible" })).toHaveProperty("disabled", true);
  });
});
