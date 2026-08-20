import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Drawer, DrawerTitle } from "./drawer";
describe("Drawer", () => { it("renders its dialog content when open", () => { render(<Drawer isOpen aria-label="Filtros"><DrawerTitle>Filtros</DrawerTitle></Drawer>); expect(screen.getByRole("dialog").textContent).toContain("Filtros"); }); });
