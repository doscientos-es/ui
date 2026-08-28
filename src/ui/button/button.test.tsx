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
    expect(button.className).toContain("overflow-hidden");
    expect(button.className.split(" ")).not.toContain("rounded-full");
    expect(button.className).not.toContain("translate-y-px");
  });

  it("completes an independent ripple after each click", () => {
    render(<Button>Guardar</Button>);
    const button = screen.getByRole("button", { name: "Guardar" });

    fireEvent.click(button);
    const firstRipple = button.querySelector('[data-slot="button-ripple"]');
    expect(firstRipple?.className).toContain("animate-ui-ripple");

    fireEvent.click(button);
    const latestRipple = button.querySelector('[data-slot="button-ripple"]');
    expect(latestRipple).not.toBe(firstRipple);

    fireEvent.animationEnd(latestRipple!);
    expect(button.querySelector('[data-slot="button-ripple"]')).toBeNull();
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

  it("hides the ripple for the link variant", () => {
    render(<Button variant="link">Más información</Button>);
    const button = screen.getByRole("button", { name: "Más información" });

    fireEvent.click(button);

    expect(button.querySelector('[data-slot="button-ripple"]')).toBeNull();
  });

  it("uses React Aria disabled semantics", () => {
    render(<Button isDisabled>No disponible</Button>);
    expect(screen.getByRole("button", { name: "No disponible" })).toHaveProperty("disabled", true);
  });
});
