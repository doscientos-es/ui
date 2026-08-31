import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { ConfirmDialog } from './confirm-dialog'

describe('ConfirmDialog', () => {
  afterEach(cleanup)

  it('keeps cancellation separate from the confirmed action', () => {
    const onOpenChange = vi.fn()
    const onConfirm = vi.fn()
    render(
      <ConfirmDialog
        open
        onOpenChange={onOpenChange}
        onConfirm={onConfirm}
        title="¿Eliminar?"
        description="No se puede deshacer."
        destructive
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Cancelar' }))
    expect(onOpenChange).toHaveBeenCalledWith(false)
    expect(onConfirm).not.toHaveBeenCalled()
    fireEvent.click(screen.getByRole('button', { name: 'Confirmar' }))
    expect(onConfirm).toHaveBeenCalledOnce()
  })

  it('requests closure when Escape is pressed', () => {
    const onOpenChange = vi.fn()
    render(<ConfirmDialog open onOpenChange={onOpenChange} onConfirm={vi.fn()} title="¿Cerrar?" />)

    fireEvent.keyDown(screen.getByRole('alertdialog'), { key: 'Escape' })
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })
})
