import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Popover, PopoverTrigger } from "./popover";

describe("PopoverTrigger", () => {
  it("opens from a native button that stops parent propagation", async () => {
    render(
      <PopoverTrigger>
        <button type="button" onPointerDown={(event) => event.stopPropagation()}>
          Abrir perfil
        </button>
        <Popover>Contenido del perfil</Popover>
      </PopoverTrigger>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Abrir perfil" }));
    expect(await screen.findByText("Contenido del perfil")).toBeTruthy();
  });
});