import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
} from './alert-dialog'

describe('AlertDialog', () => {
  it('exposes alertdialog semantics and closes through the cancel action', () => {
    const onOpenChange = vi.fn()
    render(
      <AlertDialog open onOpenChange={onOpenChange}>
        <AlertDialogContent>
          <AlertDialogTitle>Eliminar cliente</AlertDialogTitle>
          <AlertDialogCancel />
        </AlertDialogContent>
      </AlertDialog>,
    )

    const dialog = screen.getByRole('alertdialog', { name: 'Eliminar cliente' })
    expect(dialog).toBeTruthy()
    expect(dialog.classList.contains('max-h-[calc(100dvh-2rem)]')).toBe(true)
    expect(dialog.classList.contains('box-border')).toBe(true)
    expect(dialog.parentElement?.classList.contains('max-h-full')).toBe(true)
    fireEvent.click(screen.getByRole('button', { name: 'Cancelar' }))
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('does not dismiss when the space outside its panel is pressed', async () => {
    const onOpenChange = vi.fn()
    render(<AlertDialog open onOpenChange={onOpenChange}><AlertDialogContent>
      <AlertDialogTitle>Eliminar cliente</AlertDialogTitle><AlertDialogCancel />
    </AlertDialogContent></AlertDialog>)
    const panel = screen.getByRole('alertdialog').parentElement
    if (!panel) throw new Error('Expected modal panel.')
    await userEvent.click(panel)
    const overlay = document.querySelector('[data-slot="alert-dialog-overlay"]')
    if (!overlay) throw new Error('Expected modal overlay.')
    await userEvent.click(overlay)
    expect(onOpenChange).not.toHaveBeenCalled()
  })
})
