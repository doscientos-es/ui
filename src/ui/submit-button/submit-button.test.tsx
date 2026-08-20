import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SubmitButton } from "./submit-button";
describe("SubmitButton", () => { it("renders a submit button", () => { render(<form><SubmitButton>Guardar</SubmitButton></form>); expect(screen.getByRole("button", { name: "Guardar" }).getAttribute("type")).toBe("submit"); }); });
