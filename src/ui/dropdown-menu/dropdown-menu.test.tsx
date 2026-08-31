import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Button } from '../button/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu'

describe('DropdownMenu', () => {
  it('opens from a default button created from its text trigger', async () => {
    const user = userEvent.setup()
    render(
      <DropdownMenu trigger="Acciones" triggerProps={{ variant: 'outline' }}>
        <DropdownMenuItem id="edit">Editar</DropdownMenuItem>
      </DropdownMenu>,
    )

    await user.click(screen.getByRole('button', { name: 'Acciones' }))
    const item = await screen.findByRole('menuitem', { name: 'Editar' })
    expect(item.className).toContain('focus:bg-muted')
    expect(item.closest('[data-slot="dropdown-menu-content"]')?.className).toContain(
      'border-border',
    )
  })

  it('opens from a custom trigger element', async () => {
    const user = userEvent.setup()
    render(
      <DropdownMenu trigger={<Button variant="ghost">Opciones</Button>}>
        <DropdownMenuItem id="edit">Editar</DropdownMenuItem>
      </DropdownMenu>,
    )

    await user.click(screen.getByRole('button', { name: 'Opciones' }))
    expect(await screen.findByRole('menuitem', { name: 'Editar' })).toBeTruthy()
  })

  it('supports advanced composition with explicit trigger and content', async () => {
    const user = userEvent.setup()
    render(
      <DropdownMenuTrigger>
        <Button>Acciones</Button>
        <DropdownMenuContent>
          <DropdownMenuItem id="edit">Editar</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuTrigger>,
    )

    await user.click(screen.getByRole('button', { name: 'Acciones' }))
    expect(await screen.findByRole('menuitem', { name: 'Editar' })).toBeTruthy()
  })
})
