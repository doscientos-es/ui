import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Alert, AlertAction, AlertDescription, AlertTitle } from "./alert";

describe("Alert", () => {
  it("renders structured alert content and action", () => {
    render(
      <Alert variant="warning">
        <AlertTitle>Revisión pendiente</AlertTitle>
        <AlertDescription>Comprueba los datos.</AlertDescription>
        <AlertAction>Editar</AlertAction>
      </Alert>,
    );
    const alert = screen.getByRole("alert");
    expect(alert.textContent).toContain("Revisión pendiente");
    expect(screen.getByText("Editar").getAttribute("data-slot")).toBe("alert-action");
  });
});
