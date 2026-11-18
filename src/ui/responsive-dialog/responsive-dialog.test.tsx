import { act, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { DialogClose } from '../dialog/dialog'
import { ResponsiveDialog } from './responsive-dialog'

function mockViewport(initialMobile: boolean) {
  const matchMedia = window.matchMedia.bind(window)
  const media = Object.assign(new EventTarget(), { matches: initialMobile })
  vi.spyOn(window, 'matchMedia').mockImplementation((query) =>
    query === '(max-width: 47.99rem)' ? (media as MediaQueryList) : matchMedia(query),
  )
  return (mobile: boolean) => {
    act(() => {
      media.matches = mobile
      media.dispatchEvent(new Event('change'))
    })
  }
}

function expectPresentation(dialog: HTMLElement, mobile: boolean) {
  if (mobile) expect(dialog.closest('[data-slot="bottom-sheet"]')).not.toBeNull()
  else expect(dialog.dataset.slot).toBe('dialog-content')
}

afterEach(() => vi.restoreAllMocks())

describe('ResponsiveDialog', () => {
  it.each([false, true])('keeps the form mounted on resize (mobile: %s)', async (mobile) => {
    const resize = mockViewport(mobile)
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    render(
      <ResponsiveDialog
        title="Filtros"
        description="Elige un cliente."
        trigger="Filtrar"
        onOpenChange={onOpenChange}
        showCloseButton={false}
      >
        <input aria-label="Cliente" />
        <DialogClose>Aplicar filtros</DialogClose>
      </ResponsiveDialog>,
    )

    const trigger = screen.getByRole('button', { name: 'Filtrar' })
    await user.click(trigger)
    const dialog = screen.getByRole('dialog', { name: 'Filtros', description: 'Elige un cliente.' })
    expectPresentation(dialog, mobile)
    expect(within(dialog).queryByRole('button', { name: 'Cerrar' })).toBeNull()
    const input = within(dialog).getByRole<HTMLInputElement>('textbox', { name: 'Cliente' })
    await user.type(input, 'Ana')

    resize(!mobile)
    expect(screen.getByRole('dialog', { name: 'Filtros' })).toBe(dialog)
    expect(input.value).toBe('Ana')
    expect(document.activeElement).toBe(input)
    expect(onOpenChange.mock.calls).toEqual([[true]])

    await user.click(within(dialog).getByRole('button', { name: 'Aplicar filtros' }))
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull())
    expect(onOpenChange.mock.calls).toEqual([[true], [false]])

    expect(screen.getByRole('button', { name: 'Filtrar' })).toBe(trigger)
    await user.click(trigger)
    expectPresentation(await screen.findByRole('dialog', { name: 'Filtros' }), !mobile)
  })

  it.each([false, true])('respects controlled state (mobile: %s)', async (mobile) => {
    mockViewport(mobile)
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    const props = { title: 'Confirmar', closeLabel: 'Salir', preventDismissal: true, onOpenChange }
    const { rerender } = render(
      <ResponsiveDialog {...props} open>
        Contenido
      </ResponsiveDialog>,
    )

    const dialog = screen.getByRole('dialog', { name: 'Confirmar' })
    expectPresentation(dialog, mobile)
    const close = within(dialog).getByRole('button', { name: 'Salir' })
    act(() => close.focus())
    await user.keyboard('{Escape}')
    expect(onOpenChange).not.toHaveBeenCalled()

    await user.click(close)
    expect(onOpenChange.mock.calls).toEqual([[false]])
    expect(screen.getByRole('dialog', { name: 'Confirmar' })).toBe(dialog)

    rerender(
      <ResponsiveDialog {...props} open={false}>
        Contenido
      </ResponsiveDialog>,
    )
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull())
  })
})
