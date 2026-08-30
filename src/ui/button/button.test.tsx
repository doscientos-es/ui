import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

  it("starts the ripple at the pointer and falls back to the center for keyboard clicks", async () => {
    const user = userEvent.setup();
    render(<Button>Guardar</Button>);
    const button = screen.getByRole("button", { name: "Guardar" });
    vi.spyOn(button, "getBoundingClientRect").mockReturnValue(new DOMRect(10, 20, 100, 40));

    await user.pointer([
      { keys: "[MouseLeft>]", target: button, coords: { x: 55, y: 35 } },
      { keys: "[/MouseLeft]", target: button, coords: { x: 55, y: 35 } },
    ]);
    await waitFor(() => expect(button.querySelector('[data-slot="button-ripple"]')).toBeTruthy());
    const firstRipple = button.querySelector('[data-slot="button-ripple"]');
    expect(firstRipple?.className).toContain("animate-ui-ripple");
    expect((firstRipple as HTMLElement).style.left).toBe("35px");
    expect((firstRipple as HTMLElement).style.top).toBe("-5px");

    fireEvent.animationEnd(firstRipple!);
    expect(button.querySelector('[data-slot="button-ripple"]')).toBeNull();

    button.focus();
    await user.keyboard("{Enter}");
    const keyboardRipple = button.querySelector('[data-slot="button-ripple"]');
    expect(keyboardRipple).not.toBe(firstRipple);
    expect((keyboardRipple as HTMLElement).style.left).toBe("50%");
    expect((keyboardRipple as HTMLElement).style.top).toBe("50%");
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

  it("supports React Aria and HTML disabled semantics", () => {
    render(<Button disabled>No disponible</Button>);
    const button = screen.getByRole("button", { name: "No disponible" });

    expect(button).toHaveProperty("disabled", true);
  });
});
