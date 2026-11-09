import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
  AppShell,
  AppShellContent,
  AppShellHeader,
  AppShellHeaderActions,
  AppShellHeaderContext,
  AppShellMain,
  AppShellMobileHeader,
  AppShellSidebar,
  AppShellSidebarContent,
  AppShellSidebarFooter,
  AppShellSidebarHeader,
} from './app-shell'

describe('AppShell', () => {
  it('provides landmark regions for an application layout', () => {
    render(
      <AppShell>
        <AppShellMain>
          <AppShellHeader>Header</AppShellHeader>
          <AppShellContent>Content</AppShellContent>
        </AppShellMain>
      </AppShell>,
    )
    expect(screen.getByRole('main')).toBeTruthy()
    expect(screen.getByRole('banner')).toBeTruthy()
    expect(screen.getByText('Content')).toBeTruthy()
  })

  it('supports a persistent sidebar and mobile header at a configurable breakpoint', () => {
    const { container } = render(
      <AppShell sidebarBreakpoint="lg">
        <AppShellSidebar width="wide" aria-label="Navegación">
          Navegación
        </AppShellSidebar>
        <AppShellMain>
          <AppShellMobileHeader>Menú</AppShellMobileHeader>
          <AppShellContent size="full" padded={false} scrollable={false} density="compact">
            Contenido
          </AppShellContent>
        </AppShellMain>
      </AppShell>,
    )

    const shell = container.querySelector('[data-slot="app-shell"]')
    const sidebar = container.querySelector('[data-slot="app-shell-sidebar"]')
    const mobileHeader = container.querySelector('[data-slot="app-shell-mobile-header"]')
    const content = screen.getByText('Contenido')
    expect(shell?.getAttribute('data-sidebar-breakpoint')).toBe('lg')
    expect(sidebar?.textContent).toBe('Navegación')
    expect(sidebar?.getAttribute('data-width')).toBe('wide')
    expect(mobileHeader?.textContent).toBe('Menú')
    expect(content.getAttribute('data-size')).toBe('full')
    expect(content.hasAttribute('data-padded')).toBe(false)
    expect(content.hasAttribute('data-scrollable')).toBe(false)
    expect(content.getAttribute('data-density')).toBe('compact')
  })

  it('supports a framed application treatment', () => {
    const { container } = render(<AppShell variant="inset" />)
    expect(container.querySelector('[data-slot="app-shell"]')?.getAttribute('data-variant')).toBe(
      'inset',
    )
  })

  it('composes named navigation and workspace slots without swallowing attributes', () => {
    const { container } = render(
      <AppShell>
        <AppShellSidebar>
          <AppShellSidebarHeader className="custom-brand">Marca</AppShellSidebarHeader>
          <AppShellSidebarContent aria-label="Espacio de trabajo">
            <a href="#example" aria-current="page">
              Ejemplo
            </a>
          </AppShellSidebarContent>
          <AppShellSidebarFooter>Ayuda</AppShellSidebarFooter>
        </AppShellSidebar>
        <AppShellMain>
          <AppShellHeader>
            <AppShellHeaderContext>Contexto</AppShellHeaderContext>
            <AppShellHeaderActions>
              <button type="button">Crear</button>
            </AppShellHeaderActions>
          </AppShellHeader>
        </AppShellMain>
      </AppShell>,
    )
    expect(
      screen
        .getByRole('navigation', { name: 'Espacio de trabajo' })
        .contains(screen.getByRole('link', { name: 'Ejemplo' })),
    ).toBe(true)
    expect(screen.getByRole('link').getAttribute('aria-current')).toBe('page')
    expect(container.querySelector('[data-slot="app-shell-sidebar-header"]')?.className).toContain(
      'custom-brand',
    )
    expect(container.querySelector('[data-slot="app-shell-sidebar-footer"]')?.textContent).toBe(
      'Ayuda',
    )
    expect(container.querySelector('[data-slot="app-shell-header-context"]')?.textContent).toBe(
      'Contexto',
    )
    expect(
      container
        .querySelector('[data-slot="app-shell-header-actions"]')
        ?.contains(screen.getByRole('button', { name: 'Crear' })),
    ).toBe(true)
  })
})
