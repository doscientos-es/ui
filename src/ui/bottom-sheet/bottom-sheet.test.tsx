import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Button } from '../button/button'
import { BottomSheet, BottomSheetTrigger } from './bottom-sheet'

describe('BottomSheet', () => {
  it('opens through a trigger and requests closure through its close slot', async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    render(
      <BottomSheetTrigger onOpenChange={onOpenChange}>
        <Button>Filtrar</Button>
        <BottomSheet title="Filtros" description="Refina los resultados" peekHeight={320}>
          <p>Estado del pedido</p>
        </BottomSheet>
      </BottomSheetTrigger>,
    )

    expect(screen.queryByRole('dialog')).toBeNull()
    await user.click(screen.getByRole('button', { name: 'Filtrar' }))
    expect(onOpenChange).toHaveBeenLastCalledWith(true)
    expect(
      screen.getByRole('dialog', { name: 'Filtros', description: 'Refina los resultados' }),
    ).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Expandir panel' })).toBeTruthy()
    await user.click(screen.getByRole('button', { name: 'Cerrar' }))
    expect(onOpenChange).toHaveBeenLastCalledWith(false)
  })
})
