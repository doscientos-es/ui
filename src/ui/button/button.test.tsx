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

  it("starts the ripple at the pointer and falls back to the center for keyboard clicks", () => {
    render(<Button>Guardar</Button>);
    const button = screen.getByRole("button", { name: "Guardar" });
    vi.spyOn(button, "getBoundingClientRect").mockReturnValue(new DOMRect(10, 20, 100, 40));

    fireEvent.click(button, { clientX: 55, clientY: 35, detail: 1 });
    const firstRipple = button.querySelector('[data-slot="button-ripple"]');
    expect(firstRipple?.className).toContain("animate-ui-ripple");
    expect(firstRipple).toHaveStyle({ left: "45px", top: "15px" });

    fireEvent.animationEnd(firstRipple!);
    expect(button.querySelector('[data-slot="button-ripple"]')).toBeNull();

    fireEvent.click(button, { detail: 0 });
    const keyboardRipple = button.querySelector('[data-slot="button-ripple"]');
    expect(keyboardRipple).not.toBe(firstRipple);
    expect(keyboardRipple).toHaveStyle({ left: "50%", top: "50%" });
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
