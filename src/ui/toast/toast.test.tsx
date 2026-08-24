import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("sileo", () => ({
  Toaster: ({ position }: { position?: string }) => <div data-testid="sileo-toaster" data-position={position} />,
  sileo: {},
}));

import { ToastProvider } from "./toast";

describe("ToastProvider", () => {
  it("renders Sileo's toaster as the default viewport", () => {
    render(<ToastProvider><span>Contenido</span></ToastProvider>);
    expect(screen.getByTestId("sileo-toaster").getAttribute("data-position")).toBeNull();
  });
});
