import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Button } from '../button/button'
import { Menu, MenuContent, MenuItem, MenuTrigger } from './menu'

describe('Menu', () => {
  it('opens above other overlays and closes with Escape', async () => {
    const user = userEvent.setup()
    render(
      <MenuTrigger>
        <Button>Acciones</Button>
        <MenuContent>
          <Menu aria-label="Acciones de cliente">
            <MenuItem id="edit">Editar</MenuItem>
          </Menu>
        </MenuContent>
      </MenuTrigger>,
    )

    await user.click(screen.getByRole('button', { name: 'Acciones' }))
    const item = screen.getByRole('menuitem', { name: 'Editar' })

    expect(item.parentElement?.parentElement?.className).toContain('z-50')

    await user.keyboard('{Escape}')
    expect(screen.queryByRole('menuitem', { name: 'Editar' })).toBeNull()
  })
})
