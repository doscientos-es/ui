import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LoadingOverlay } from "./loading-overlay";
describe("LoadingOverlay", () => { it("communicates the loading state", () => { render(<LoadingOverlay label="Cargando clientes" />); expect(screen.getByRole("status")).toBeTruthy(); expect(screen.getByText("Cargando clientes")).toBeTruthy(); }); });
