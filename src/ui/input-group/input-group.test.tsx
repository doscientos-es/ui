import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "./input-group";

describe("InputGroup", () => {
  it("groups the control and addon", () => {
    render(
      <InputGroup>
        <InputGroupText>€</InputGroupText>
        <InputGroupInput aria-label="Precio" />
      </InputGroup>,
    );
    expect(
      screen.getByRole("group").contains(screen.getByRole("textbox", { name: "Precio" })),
    ).toBe(true);
  });

  it("focuses the control when its addon is pressed", async () => {
    const user = userEvent.setup();
    render(
      <InputGroup>
        <InputGroupAddon>https://</InputGroupAddon>
        <InputGroupInput aria-label="Dominio" />
      </InputGroup>,
    );
    await user.click(screen.getByText("https://"));
    expect(screen.getByRole("textbox", { name: "Dominio" })).toHaveProperty(
      "ownerDocument.activeElement",
      screen.getByRole("textbox", { name: "Dominio" }),
    );
  });

  it("uses a non-submitting button by default", () => {
    render(
      <InputGroup>
        <InputGroupInput aria-label="Buscar" />
        <InputGroupButton aria-label="Limpiar">×</InputGroupButton>
      </InputGroup>,
    );
    expect(screen.getByRole("button", { name: "Limpiar" }).getAttribute("type")).toBe("button");
  });
});
