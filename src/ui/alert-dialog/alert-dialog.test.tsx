import { fireEvent, render, screen } from '@testing-library/react'
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
    expect(dialog.classList.contains('max-h-full')).toBe(true)
    expect(dialog.classList.contains('box-border')).toBe(true)
    expect(dialog.parentElement?.classList.contains('max-h-full')).toBe(true)
    fireEvent.click(screen.getByRole('button', { name: 'Cancelar' }))
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })
})
