import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Button } from "../button/button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

describe("Popover", () => {
  it("opens from a default button created from its text trigger", async () => {
    render(<Popover trigger="Abrir perfil">Contenido del perfil</Popover>);

    fireEvent.click(screen.getByRole("button", { name: "Abrir perfil" }));
    const content = await screen.findByText("Contenido del perfil");
    expect(content.closest('[data-slot="popover"]')?.className).toContain("z-50");
  });

  it("opens from a custom trigger element", async () => {
    render(
      <Popover trigger={<Button variant="ghost">Opciones</Button>}>Contenido del perfil</Popover>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Opciones" }));
    expect(await screen.findByText("Contenido del perfil")).toBeTruthy();
  });

  it("supports advanced composition with a custom trigger", async () => {
    render(
      <PopoverTrigger>
        <Button>Abrir perfil</Button>
        <PopoverContent>Contenido del perfil</PopoverContent>
      </PopoverTrigger>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Abrir perfil" }));
    expect(await screen.findByText("Contenido del perfil")).toBeTruthy();
  });
});
