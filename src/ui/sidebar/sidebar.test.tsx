import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Sidebar, SidebarContent, SidebarGroup, SidebarItem, SidebarProvider, SidebarTrigger } from "./sidebar";

describe("Sidebar", () => {
  it("renders accessible navigation and active item", () => {
    render(<SidebarProvider><Sidebar><SidebarContent><SidebarGroup label="Workspace"><SidebarItem href="/clientes" label="Clientes" active /></SidebarGroup></SidebarContent></Sidebar></SidebarProvider>);
    expect(screen.getByRole("navigation", { name: "Navegación principal" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Clientes" }).getAttribute("aria-current")).toBe("page");
  });

  it("toggles its collapsed state with an accessible trigger", async () => {
    const user = userEvent.setup();
    render(<SidebarProvider><Sidebar><SidebarTrigger /></Sidebar></SidebarProvider>);
    const trigger = screen.getByRole("button", { name: "Colapsar navegación" });
    await user.click(trigger);
    expect(screen.getByRole("button", { name: "Expandir navegación" })).toBeTruthy();
  });
});
