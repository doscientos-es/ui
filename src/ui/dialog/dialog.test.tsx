import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
  it('opens from a default button created from its text trigger', () => {
    render(
      <Dialog trigger="Editar cliente" triggerProps={{ variant: 'outline' }}>
        <DialogTitle>Editar cliente</DialogTitle>
      </Dialog>,
    )

    const trigger = screen.getByRole('button', { name: 'Editar cliente' })
    expect(trigger.className).toContain('border')
    fireEvent.click(trigger)
    expect(screen.getByRole('dialog', { name: 'Editar cliente' })).toBeTruthy()
  })

  it('opens from a custom trigger element in the simple API', () => {
    render(
      <Dialog trigger={<button type="button">Editar cliente</button>}>
        <DialogTitle>Editar cliente</DialogTitle>
      </Dialog>,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Editar cliente' }))
    expect(screen.getByRole('dialog', { name: 'Editar cliente' })).toBeTruthy()
  })

  it('opens from an asChild trigger and closes from an asChild action', () => {
    const onCancel = vi.fn()
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
              <button type="button" onClick={onCancel}>
                Cancelar
              </button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Abrir' }))
    expect(screen.getByRole('dialog', { name: 'Editar cliente' })).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: 'Cancelar' }))
    expect(onCancel).toHaveBeenCalledOnce()
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
          <DialogFooter>Acciones</DialogFooter>
        </DialogContent>
      </Dialog>,
    )

    const dialog = screen.getByRole('dialog', { name: 'Enviar factura' })
    expect(dialog.classList.contains('relative')).toBe(true)
    expect(dialog.classList.contains('mx-auto')).toBe(true)
    expect(dialog.classList.contains('box-border')).toBe(true)
    expect(dialog.classList.contains('max-h-[calc(100dvh-2rem)]')).toBe(true)
    expect(dialog.classList.contains('min-h-0')).toBe(true)
    expect(dialog.classList.contains('overflow-x-hidden')).toBe(true)
    expect(dialog.parentElement?.classList.contains('w-full')).toBe(true)
    expect(dialog.parentElement?.classList.contains('max-h-full')).toBe(true)
    expect(dialog.parentElement?.classList.contains('min-h-0')).toBe(true)
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
    expect(
      document.querySelector('[data-slot="dialog-footer"]')?.classList.contains('border-border'),
    ).toBe(true)
  })

  it('limits its default width without relying on a responsive breakpoint', () => {
    render(
      <Dialog open>
        <DialogContent>
          <DialogTitle>Detalle del pedido</DialogTitle>
        </DialogContent>
      </Dialog>,
    )

    const dialog = screen.getByRole('dialog', { name: 'Detalle del pedido' })
    expect(dialog.classList.contains('w-full')).toBe(true)
    expect(dialog.classList.contains('max-w-[32rem]')).toBe(true)
    expect(dialog.getAttribute('data-size')).toBe('md')
    expect(document.querySelector('[data-slot="dialog-overlay"]')?.classList.contains('p-4')).toBe(
      true,
    )
  })

  it('allows consumers to opt into a full-width dialog explicitly', () => {
    render(
      <Dialog open>
        <DialogContent size="full">
          <DialogTitle>Calendario completo</DialogTitle>
        </DialogContent>
      </Dialog>,
    )

    const dialog = screen.getByRole('dialog', { name: 'Calendario completo' })
    expect(dialog.classList.contains('w-full')).toBe(true)
    expect(dialog.classList.contains('max-w-none')).toBe(true)
    expect(dialog.classList.contains('max-w-[32rem]')).toBe(false)
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

  it('notifies controlled consumers when the area outside its panel is pressed', async () => {
    const onOpenChange = vi.fn()
    render(
      <Dialog open onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogTitle>Enviar factura</DialogTitle>
        </DialogContent>
      </Dialog>,
    )

    const dialog = screen.getByRole('dialog', { name: 'Enviar factura' })
    const dialogOverlay = dialog.parentElement
    if (!dialogOverlay) throw new Error('Expected dialog to have an overlay parent.')
    await userEvent.click(dialogOverlay)

    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it.each([
    ['sm', 'max-w-[24rem]'],
    ['md', 'max-w-[32rem]'],
    ['lg', 'max-w-[42rem]'],
    ['xl', 'max-w-[56rem]'],
  ] as const)('supports the %s size in the simple API', (size, widthClass) => {
    render(
      <Dialog trigger="Abrir" defaultOpen size={size}>
        <DialogTitle>Formulario</DialogTitle>
      </Dialog>,
    )
    expect(screen.getByRole('dialog').classList.contains(widthClass)).toBe(true)
  })

  it('still allows custom width overrides', () => {
    render(
      <Dialog trigger="Abrir" defaultOpen className="max-w-none">
        <DialogTitle>Formulario</DialogTitle>
      </Dialog>,
    )
    const dialog = screen.getByRole('dialog')
    expect(dialog.classList.contains('max-w-none')).toBe(true)
    expect(dialog.classList.contains('max-w-[32rem]')).toBe(false)
  })

  it('associates its description and removes the association when it unmounts', () => {
    const content = (description: boolean) => (
      <Dialog open>
        <DialogContent>
          <DialogTitle>Cliente</DialogTitle>
          {description && <DialogDescription>Actualiza sus datos.</DialogDescription>}
        </DialogContent>
      </Dialog>
    )
    const { rerender } = render(content(true))
    const dialog = screen.getByRole('dialog', { name: 'Cliente' })
    expect(dialog.getAttribute('aria-describedby')).toBe(
      screen.getByText('Actualiza sus datos.').id,
    )
    rerender(content(false))
    expect(dialog.hasAttribute('aria-describedby')).toBe(false)
  })

  it('preserves an explicitly provided accessible description', () => {
    render(
      <Dialog open>
        <DialogContent aria-describedby="external-description">
          <DialogTitle>Cliente</DialogTitle>
          <DialogDescription>Ayuda local.</DialogDescription>
          <p id="external-description">Ayuda personalizada.</p>
        </DialogContent>
      </Dialog>,
    )
    expect(screen.getByRole('dialog').getAttribute('aria-describedby')).toBe('external-description')
  })

  it('can prevent outside dismissal without preventing Escape', async () => {
    const onOpenChange = vi.fn()
    render(
      <Dialog open onOpenChange={onOpenChange}>
        <DialogContent isDismissable={false}>
          <DialogTitle>Edición</DialogTitle>
        </DialogContent>
      </Dialog>,
    )
    const dialog = screen.getByRole('dialog')
    const panel = dialog.parentElement
    if (!panel) throw new Error('Expected modal panel.')
    await userEvent.click(panel)
    expect(onOpenChange).not.toHaveBeenCalled()
    fireEvent.keyDown(dialog, { key: 'Escape' })
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('can prevent Escape dismissal', () => {
    const onOpenChange = vi.fn()
    render(
      <Dialog open onOpenChange={onOpenChange}>
        <DialogContent isKeyboardDismissDisabled>
          <DialogTitle>Guardando</DialogTitle>
        </DialogContent>
      </Dialog>,
    )
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' })
    expect(onOpenChange).not.toHaveBeenCalled()
  })

  it('supports keyboard opening, close callbacks and restoring focus to the trigger', async () => {
    const user = userEvent.setup()
    const onOpenClick = vi.fn()
    const onCloseClick = vi.fn()
    render(
      <Dialog>
        <DialogTrigger onClick={onOpenClick}>Editar</DialogTrigger>
        <DialogContent>
          <DialogTitle>Cliente</DialogTitle>
          <DialogClose onClick={onCloseClick}>Cancelar</DialogClose>
        </DialogContent>
      </Dialog>,
    )
    const trigger = screen.getByRole('button', { name: 'Editar' })
    expect(trigger.getAttribute('aria-haspopup')).toBe('dialog')
    expect(trigger.getAttribute('aria-expanded')).toBe('false')
    trigger.focus()
    await user.keyboard('{Enter}')
    expect(onOpenClick).toHaveBeenCalledOnce()
    expect(trigger.getAttribute('aria-expanded')).toBe('true')
    await user.click(screen.getByRole('button', { name: 'Cancelar' }))
    expect(onCloseClick).toHaveBeenCalledOnce()
    await waitFor(() => expect(document.activeElement).toBe(trigger))
  })

  it('places the optional footer close action before the primary action in DOM order', () => {
    render(
      <Dialog open>
        <DialogContent>
          <DialogTitle>Cliente</DialogTitle>
          <DialogFooter showCloseButton>
            <button type="button">Guardar</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>,
    )
    const footer = document.querySelector('[data-slot="dialog-footer"]')
    expect(footer?.firstElementChild?.textContent).toBe('Cerrar')
    expect(footer?.lastElementChild?.textContent).toBe('Guardar')
  })
})
