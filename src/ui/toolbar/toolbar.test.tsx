import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Toolbar } from "./toolbar";
describe("Toolbar", () => { it("exposes a toolbar landmark", () => { render(<Toolbar aria-label="Acciones de clientes">Acciones</Toolbar>); expect(screen.getByRole("toolbar", { name: "Acciones de clientes" })).toBeTruthy(); }); });
