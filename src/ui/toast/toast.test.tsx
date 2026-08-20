import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Toast } from "./toast";
describe("Toast", () => { it("announces errors as alerts", () => { render(<Toast id="test" title="No se ha podido guardar" variant="error" duration={0} state="open" />); expect(screen.getByRole("alert")).toBeTruthy(); }); });
