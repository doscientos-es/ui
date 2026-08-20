import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Alert } from "./alert";
describe("Alert", () => { it("renders an alert role", () => { render(<Alert>Ha ocurrido un problema</Alert>); expect(screen.getByRole("alert").textContent).toContain("Ha ocurrido"); }); });
