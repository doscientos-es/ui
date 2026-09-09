import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from './sidebar'

function sidebarState() {
  return document.querySelector('[data-slot="sidebar"]')?.getAttribute('data-state')
}

describe('Sidebar', () => {
  it('marks the active menu link as the current page', () => {
    render(
      <SidebarProvider>
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton href="/clientes" isActive>
                      Clientes
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>,
    )

    const link = screen.getByRole('link', { name: 'Clientes' })
    expect(link.getAttribute('aria-current')).toBe('page')
    expect(link.getAttribute('data-active')).toBe('true')
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

    await user.click(screen.getByRole('button', { name: 'Colapsar navegación' }))

    expect(screen.getByRole('button', { name: 'Expandir navegación' })).toBeTruthy()
    expect(sidebarState()).toBe('collapsed')
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
    expect(sidebarState()).toBe('collapsed')
  })

  it('reports state changes in controlled usage', async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    render(
      <SidebarProvider open={false} onOpenChange={onOpenChange}>
        <Sidebar>
          <SidebarTrigger />
        </Sidebar>
      </SidebarProvider>,
    )

    await user.click(screen.getByRole('button', { name: 'Expandir navegación' }))

    expect(onOpenChange).toHaveBeenCalledWith(true)
  })

  it('toggles with the keyboard shortcut', () => {
    render(
      <SidebarProvider>
        <Sidebar>
          <SidebarTrigger />
        </Sidebar>
      </SidebarProvider>,
    )

    fireEvent.keyDown(window, { key: 'b', ctrlKey: true })

    expect(sidebarState()).toBe('collapsed')
  })
})
