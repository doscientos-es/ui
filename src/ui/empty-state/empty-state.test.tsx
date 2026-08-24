import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  EmptyState,
  EmptyStateContent,
  EmptyStateDescription,
  EmptyStateHeader,
  EmptyStateMedia,
  EmptyStateTitle,
} from "./empty-state";

describe("EmptyState", () => {
  it("composes media, copy and actions", () => {
    render(
      <EmptyState>
        <EmptyStateHeader>
          <EmptyStateMedia variant="icon">!</EmptyStateMedia>
          <EmptyStateTitle>Sin resultados</EmptyStateTitle>
          <EmptyStateDescription>Prueba otros filtros.</EmptyStateDescription>
        </EmptyStateHeader>
        <EmptyStateContent>Limpiar filtros</EmptyStateContent>
      </EmptyState>,
    );
    expect(screen.getByRole("heading", { name: "Sin resultados" })).toBeTruthy();
    expect(screen.getByText("!").getAttribute("data-variant")).toBe("icon");
    expect(screen.getByText("Limpiar filtros").getAttribute("data-slot")).toBe(
      "empty-state-content",
    );
  });
});
