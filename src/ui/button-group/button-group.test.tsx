import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ButtonGroup } from "./button-group";
describe("ButtonGroup", () => { it("renders a labelled group", () => { render(<ButtonGroup aria-label="Acciones"><button>Guardar</button></ButtonGroup>); expect(screen.getByRole("group", { name: "Acciones" })).toBeTruthy(); }); });
