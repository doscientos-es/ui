import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarItem,
  SidebarProfile,
  SidebarProvider,
  SidebarSearch,
  SidebarTrigger,
  SidebarWorkspace,
} from './sidebar'

describe('Sidebar', () => {
  it('renders accessible navigation and active item', () => {
    render(
      <SidebarProvider>
        <Sidebar>
          <SidebarContent>
            <SidebarGroup label="Workspace">
              <SidebarItem href="/clientes" label="Clientes" active />
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>,
    )
    expect(screen.getByRole('navigation', { name: 'Navegación principal' })).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Clientes' }).getAttribute('aria-current')).toBe('page')
  })

  it('toggles its collapsed state with an accessible trigger', async () => {
    const user = userEvent.setup()
    render(
      <SidebarProvider>
        <Sidebar>
          <SidebarTrigger />
        </Sidebar>
      </SidebarProvider>,
    )
    const trigger = screen.getByRole('button', { name: 'Colapsar navegación' })
    await user.click(trigger)
    expect(screen.getByRole('button', { name: 'Expandir navegación' })).toBeTruthy()
  })

  it('composes consumer handlers without losing its toggle behavior', async () => {
    const user = userEvent.setup()
    const onPress = vi.fn()
    render(
      <SidebarProvider>
        <Sidebar>
          <SidebarTrigger onPress={onPress} />
        </Sidebar>
      </SidebarProvider>,
    )

    await user.click(screen.getByRole('button', { name: 'Colapsar navegación' }))

    expect(onPress).toHaveBeenCalledOnce()
    expect(screen.getByRole('button', { name: 'Expandir navegación' })).toBeTruthy()
  })

  it('reports state changes in controlled usage', async () => {
    const user = userEvent.setup()
    const onCollapsedChange = vi.fn()
    render(
      <SidebarProvider collapsed={false} onCollapsedChange={onCollapsedChange}>
        <Sidebar>
          <SidebarTrigger />
        </Sidebar>
      </SidebarProvider>,
    )

    await user.click(screen.getByRole('button', { name: 'Colapsar navegación' }))

    expect(onCollapsedChange).toHaveBeenCalledWith(true)
  })

  it('keeps workspace, search and profile accessible when collapsed', () => {
    render(
      <SidebarProvider defaultCollapsed>
        <Sidebar>
          <SidebarWorkspace name="Estudio" />
          <SidebarSearch label="Buscar" />
          <SidebarProfile avatar={<span>GM</span>} name="Guillem" description="Admin" />
        </Sidebar>
      </SidebarProvider>,
    )

    expect(screen.getByRole('button', { name: 'Estudio' })).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Buscar' })).toBeTruthy()
    expect(screen.getByText('Guillem').parentElement?.className).toContain('sr-only')
  })
})
