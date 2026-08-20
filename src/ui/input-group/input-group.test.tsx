import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { InputGroup, InputGroupInput, InputGroupText } from "./input-group";
describe("InputGroup", () => { it("groups the control and addon", () => { render(<InputGroup><InputGroupText>€</InputGroupText><InputGroupInput aria-label="Precio" /></InputGroup>); expect(screen.getByRole("group").contains(screen.getByRole("textbox", { name: "Precio" }))).toBe(true); }); });
