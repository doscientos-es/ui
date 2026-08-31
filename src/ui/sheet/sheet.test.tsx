import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Button } from '../button/button'
import { Drawer, DrawerContent, DrawerDescription, DrawerTitle, DrawerTrigger } from './sheet'

describe('Drawer', () => {
  it('opens an accessible dialog from its text trigger and closes it', async () => {
    const user = userEvent.setup()
    render(
      <Drawer trigger="Abrir filtros" triggerProps={{ variant: 'outline' }}>
        <DrawerTitle>Filtros</DrawerTitle>
        <DrawerDescription>Limita los resultados.</DrawerDescription>
      </Drawer>,
    )
    await user.click(screen.getByRole('button', { name: 'Abrir filtros' }))
    expect(screen.getByRole('dialog', { name: 'Filtros' })).toBeTruthy()
    expect(screen.getByText('Limita los resultados.')).toBeTruthy()
    await user.click(screen.getByRole('button', { name: 'Cerrar' }))
    expect(screen.queryByRole('dialog', { name: 'Filtros' })).toBeNull()
  })

  it('opens from a custom trigger in the simple API', async () => {
    const user = userEvent.setup()
    render(
      <Drawer trigger={<Button variant="ghost">Abrir filtros</Button>}>
        <DrawerTitle>Filtros</DrawerTitle>
      </Drawer>,
    )

    await user.click(screen.getByRole('button', { name: 'Abrir filtros' }))
    expect(screen.getByRole('dialog', { name: 'Filtros' })).toBeTruthy()
  })

  it('supports advanced composition with a custom trigger', async () => {
    const user = userEvent.setup()
    render(
      <DrawerTrigger>
        <Button>Abrir filtros</Button>
        <DrawerContent>
          <DrawerTitle>Filtros</DrawerTitle>
        </DrawerContent>
      </DrawerTrigger>,
    )

    await user.click(screen.getByRole('button', { name: 'Abrir filtros' }))
    expect(screen.getByRole('dialog', { name: 'Filtros' })).toBeTruthy()
  })
})
