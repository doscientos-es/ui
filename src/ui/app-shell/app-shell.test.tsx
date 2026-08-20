import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AppShell, AppShellContent, AppShellHeader, AppShellMain } from "./app-shell";

describe("AppShell", () => {
  it("provides landmark regions for an application layout", () => {
    render(<AppShell><AppShellMain><AppShellHeader>Header</AppShellHeader><AppShellContent>Content</AppShellContent></AppShellMain></AppShell>);
    expect(screen.getByRole("main")).toBeTruthy();
    expect(screen.getByRole("banner")).toBeTruthy();
    expect(screen.getByText("Content")).toBeTruthy();
  });
});
