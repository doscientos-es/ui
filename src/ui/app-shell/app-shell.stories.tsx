import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  AppShell,
  AppShellContent,
  AppShellMain,
  AppShellMobileHeader,
  AppShellSidebar,
} from './app-shell'

const meta = {
  title: 'Application/AppShell',
  component: AppShell,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof AppShell>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <AppShell>
      <AppShellSidebar aria-label="Navegación principal">
        <div className="px-4 py-5 font-semibold">doscientos</div>
        <nav className="flex flex-1 flex-col gap-1 px-2 py-1" aria-label="Navegación principal">
          <a className="bg-secondary rounded-md px-3 py-2 text-sm font-medium" href="#clientes">
            Clientes
          </a>
          <a className="text-muted-foreground rounded-md px-3 py-2 text-sm" href="#facturas">
            Facturas
          </a>
        </nav>
        <div className="border-border text-muted-foreground border-t p-2 text-xs">v0.1.0</div>
      </AppShellSidebar>
      <AppShellMain>
        <AppShellMobileHeader>
          <button
            className="hover:bg-secondary size-8 rounded-md"
            type="button"
            aria-label="Abrir menú"
          >
            ☰
          </button>
          <strong>doscientos</strong>
        </AppShellMobileHeader>
        <AppShellContent>
          <div className="border-border bg-card rounded-xl border p-6 shadow-sm">
            <h1 className="text-lg font-semibold">Clientes</h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Área de contenido con sidebar persistente y navegación móvil.
            </p>
          </div>
        </AppShellContent>
      </AppShellMain>
    </AppShell>
  ),
}
