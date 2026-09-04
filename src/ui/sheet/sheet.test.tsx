import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Button } from '../button/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../dialog/dialog'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
  Sheet,
} from './sheet'

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

  it('keeps a controlled sheet open while interacting with a nested dialog', async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    render(
      <Sheet isOpen onOpenChange={onOpenChange} showCloseButton={false}>
        <DrawerTitle>Ficha del lead</DrawerTitle>
        <Dialog>
          <DialogTrigger>Registrar llamada</DialogTrigger>
          <DialogContent>
            <DialogTitle>Registrar llamada</DialogTitle>
            <input aria-label="Notas de la llamada" />
          </DialogContent>
        </Dialog>
      </Sheet>,
    )

    await user.click(screen.getByRole('button', { name: 'Registrar llamada' }))
    await user.click(screen.getByRole('textbox', { name: 'Notas de la llamada' }))

    expect(onOpenChange).not.toHaveBeenCalledWith(false)
    expect(screen.getByText('Ficha del lead')).toBeTruthy()
  })
})
