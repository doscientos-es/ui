import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  AppShell,
  AppShellContent,
  AppShellHeader,
  AppShellMain,
  AppShellMobileHeader,
  AppShellSidebar,
} from "./app-shell";

describe("AppShell", () => {
  it("provides landmark regions for an application layout", () => {
    render(
      <AppShell>
        <AppShellMain>
          <AppShellHeader>Header</AppShellHeader>
          <AppShellContent>Content</AppShellContent>
        </AppShellMain>
      </AppShell>,
    );
    expect(screen.getByRole("main")).toBeTruthy();
    expect(screen.getByRole("banner")).toBeTruthy();
    expect(screen.getByText("Content")).toBeTruthy();
  });

  it("supports a persistent sidebar and mobile header at a configurable breakpoint", () => {
    const { container } = render(
      <AppShell sidebarBreakpoint="lg">
        <AppShellSidebar aria-label="Navegación">Navegación</AppShellSidebar>
        <AppShellMain>
          <AppShellMobileHeader>Menú</AppShellMobileHeader>
          <AppShellContent size="full" padded={false} scrollable={false}>
            Contenido
          </AppShellContent>
        </AppShellMain>
      </AppShell>,
    );

    const shell = container.querySelector('[data-slot="app-shell"]');
    const sidebar = container.querySelector('[data-slot="app-shell-sidebar"]');
    const mobileHeader = container.querySelector('[data-slot="app-shell-mobile-header"]');
    const content = screen.getByText("Contenido");
    expect(shell?.getAttribute("data-sidebar-breakpoint")).toBe("lg");
    expect(sidebar?.textContent).toBe("Navegación");
    expect(mobileHeader?.textContent).toBe("Menú");
    expect(content.getAttribute("data-size")).toBe("full");
    expect(content.hasAttribute("data-padded")).toBe(false);
    expect(content.hasAttribute("data-scrollable")).toBe(false);
  });
});
