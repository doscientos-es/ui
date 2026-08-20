import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Pagination } from "./pagination";
describe("Pagination", () => { it("labels pages and disables boundaries", () => { render(<Pagination page={2} pageCount={3} onPageChange={vi.fn()} />); expect(screen.getByRole("navigation", { name: "Paginación" })).toBeTruthy(); expect(screen.getByRole("button", { name: "Página 2" }).getAttribute("aria-current")).toBe("page"); expect(screen.getByRole("button", { name: "Página anterior" }).hasAttribute("disabled")).toBe(false); }); });
