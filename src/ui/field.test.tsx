import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Field, FieldError, FieldLabel } from "./field";
import { Input } from "./input";

describe("Field", () => {
  it("connects native labels and exposes validation feedback as an alert", () => {
    render(<Field><FieldLabel htmlFor="email">Email</FieldLabel><Input id="email" aria-invalid="true" /><FieldError>Email inválido.</FieldError></Field>);
    expect(screen.getByLabelText("Email").getAttribute("aria-invalid")).toBe("true");
    expect(screen.getByRole("alert").textContent).toBe("Email inválido.");
  });
});
