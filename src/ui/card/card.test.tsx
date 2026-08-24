import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";

describe("Card", () => {
  it("composes its regions and size", () => {
    render(
      <Card size="sm">
        <CardHeader>
          <CardTitle>Factura</CardTitle>
          <CardDescription>Actualizada hoy</CardDescription>
          <CardAction>Acción</CardAction>
        </CardHeader>
        <CardContent>Contenido</CardContent>
        <CardFooter>Total</CardFooter>
      </Card>,
    );
    const card = screen.getByText("Factura").closest('[data-slot="card"]');
    expect(card?.getAttribute("data-size")).toBe("sm");
    expect(card?.className).toContain("border-border");
    expect(screen.getByText("Acción").getAttribute("data-slot")).toBe("card-action");
    expect(screen.getByText("Total").getAttribute("data-slot")).toBe("card-footer");
  });
});
