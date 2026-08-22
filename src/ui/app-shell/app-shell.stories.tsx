import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  AppShell,
  AppShellContent,
  AppShellMain,
  AppShellMobileHeader,
  AppShellSidebar,
} from "./app-shell";

const meta = {
  title: "Application/AppShell",
  component: AppShell,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof AppShell>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <AppShell>
      <AppShellSidebar aria-label="Navegación principal">
        <div className="px-4 py-5 font-semibold">doscientos</div>
        <nav className="flex flex-1 flex-col gap-1 px-2 py-1" aria-label="Navegación principal">
          <a className="rounded-md bg-secondary px-3 py-2 text-sm font-medium" href="#clientes">
            Clientes
          </a>
          <a className="rounded-md px-3 py-2 text-sm text-muted-foreground" href="#facturas">
            Facturas
          </a>
        </nav>
        <div className="border-t border-border p-2 text-xs text-muted-foreground">v0.1.0</div>
      </AppShellSidebar>
      <AppShellMain>
        <AppShellMobileHeader>
          <button className="size-8 rounded-md hover:bg-secondary" type="button" aria-label="Abrir menú">
            ☰
          </button>
          <strong>doscientos</strong>
        </AppShellMobileHeader>
        <AppShellContent>
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h1 className="text-lg font-semibold">Clientes</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Área de contenido con sidebar persistente y navegación móvil.
            </p>
          </div>
        </AppShellContent>
      </AppShellMain>
    </AppShell>
  ),
};
