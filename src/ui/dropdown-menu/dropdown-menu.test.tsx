import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Button } from '../button/button'
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger } from './dropdown-menu'

describe('DropdownMenu', () => {
  it('opens with the package surface and interaction tokens', async () => {
    const user = userEvent.setup()
    render(
      <DropdownMenuTrigger>
        <Button>Acciones</Button>
        <DropdownMenu>
          <DropdownMenuItem id="edit">Editar</DropdownMenuItem>
        </DropdownMenu>
      </DropdownMenuTrigger>,
    )

    await user.click(screen.getByRole('button', { name: 'Acciones' }))
    const item = await screen.findByRole('menuitem', { name: 'Editar' })
    expect(item.className).toContain('focus:bg-muted')
    expect(item.closest('[data-slot="dropdown-menu-content"]')?.className).toContain(
      'border-border',
    )
  })
})
