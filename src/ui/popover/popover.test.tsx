import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Button } from '../button/button'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

describe('Popover', () => {
  it('opens from a default button created from its text trigger', async () => {
    render(<Popover trigger="Abrir perfil">Contenido del perfil</Popover>)

    fireEvent.click(screen.getByRole('button', { name: 'Abrir perfil' }))
    const content = await screen.findByText('Contenido del perfil')
    expect(content.closest('[data-slot="popover"]')?.className).toContain('z-50')
    expect(content.closest('[data-slot="popover-dialog"]')).toBeNull()
  })

  it('opens from a custom trigger element', async () => {
    render(
      <Popover trigger={<Button variant="ghost">Opciones</Button>}>Contenido del perfil</Popover>,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Opciones' }))
    expect(await screen.findByText('Contenido del perfil')).toBeTruthy()
  })

  it('supports advanced composition with a custom trigger', async () => {
    render(
      <PopoverTrigger>
        <Button>Abrir perfil</Button>
        <PopoverContent>Contenido del perfil</PopoverContent>
      </PopoverTrigger>,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Abrir perfil' }))
    expect(await screen.findByText('Contenido del perfil')).toBeTruthy()
  })

  it('renders one named and described dialog, preserves render props, and restores focus', async () => {
    const user = userEvent.setup()
    render(
      <Popover
        trigger="Abrir perfil"
        title="Perfil"
        description="Edita los datos públicos."
        placement="bottom"
        shouldFlip={false}
      >
        {({ placement }) => <p>Posición: {placement}</p>}
      </Popover>,
    )

    const trigger = screen.getByRole('button', { name: 'Abrir perfil' })
    await user.click(trigger)
    const dialog = await screen.findByRole('dialog', {
      name: 'Perfil',
      description: 'Edita los datos públicos.',
    })
    expect(screen.getAllByRole('dialog')).toEqual([dialog])
    expect(trigger.getAttribute('aria-controls')).toBe(dialog.id)
    expect(within(dialog).getByText('Posición: bottom')).toBeTruthy()

    await user.keyboard('{Escape}')
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull())
    await waitFor(() => expect(document.activeElement).toBe(trigger))
  })
})
