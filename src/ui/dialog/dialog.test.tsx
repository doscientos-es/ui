import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './dialog'

describe('Dialog', () => {
  it('opens from an asChild trigger and closes from an asChild action', () => {
    render(
      <Dialog>
        <DialogTrigger asChild>
          <button type="button">Abrir</button>
        </DialogTrigger>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Editar cliente</DialogTitle>
            <DialogDescription>Actualiza sus datos.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <button type="button">Cancelar</button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Abrir' }))
    expect(screen.getByRole('dialog', { name: 'Editar cliente' })).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: 'Cancelar' }))
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('notifies controlled consumers when its close button is pressed', () => {
    const onOpenChange = vi.fn()
    render(
      <Dialog open onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogTitle>Enviar factura</DialogTitle>
        </DialogContent>
      </Dialog>,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Cerrar diálogo' }))
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('keeps the dialog card centered and positioned for its close button', () => {
    render(
      <Dialog open>
        <DialogContent>
          <DialogTitle>Enviar factura</DialogTitle>
        </DialogContent>
      </Dialog>,
    )

    const dialog = screen.getByRole('dialog', { name: 'Enviar factura' })
    expect(dialog.classList.contains('relative')).toBe(true)
    expect(dialog.classList.contains('mx-auto')).toBe(true)
    expect(dialog.parentElement?.classList.contains('w-full')).toBe(true)
    expect(dialog.parentElement?.classList.contains('contents')).toBe(false)
    expect(
      dialog.parentElement?.classList.contains('motion-safe:data-entering:animate-ui-surface-in'),
    ).toBe(true)
    expect(
      dialog.parentElement?.classList.contains('motion-safe:data-exiting:animate-ui-surface-out'),
    ).toBe(true)
    expect(
      document
        .querySelector('[data-slot="dialog-overlay"]')
        ?.classList.contains('motion-safe:data-entering:animate-ui-overlay-in'),
    ).toBe(true)
  })

  it('applies custom classes only to the dialog content', () => {
    render(
      <Dialog open>
        <DialogContent className="custom-dialog-card" showCloseButton={false}>
          <DialogTitle>Detalle del box</DialogTitle>
        </DialogContent>
      </Dialog>,
    )

    const dialog = screen.getByRole('dialog', { name: 'Detalle del box' })
    expect(dialog.classList.contains('custom-dialog-card')).toBe(true)
    expect(document.querySelectorAll('.custom-dialog-card')).toHaveLength(1)
  })
})
