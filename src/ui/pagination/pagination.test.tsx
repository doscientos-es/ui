import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Pagination } from "./pagination";

describe("Pagination", () => {
  it("labels pages, uses custom summaries and abbreviates long ranges", () => {
    render(
      <Pagination ariaLabel="Paginación de clientes" page={4} pageCount={8} onPageChange={vi.fn()} summary="Mostrando 31–40 de 80" />,
    );

    expect(screen.getByRole("navigation", { name: "Paginación de clientes" })).toBeTruthy();
    expect(screen.getByText("Mostrando 31–40 de 80")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Página 4" }).getAttribute("aria-current")).toBe("page");
    expect(screen.getAllByText("…")).toHaveLength(2);
  });
});
