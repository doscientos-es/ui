import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Button } from '../button/button'
import { Sheet, SheetDescription, SheetTitle, SheetTrigger } from './sheet'

describe('Sheet', () => {
  it('opens an accessible dialog and closes it', async () => {
    const user = userEvent.setup()
    render(
      <SheetTrigger>
        <Button>Abrir filtros</Button>
        <Sheet>
          <SheetTitle>Filtros</SheetTitle>
          <SheetDescription>Limita los resultados.</SheetDescription>
        </Sheet>
      </SheetTrigger>,
    )
    await user.click(screen.getByRole('button', { name: 'Abrir filtros' }))
    expect(screen.getByRole('dialog', { name: 'Filtros' })).toBeTruthy()
    expect(screen.getByText('Limita los resultados.')).toBeTruthy()
    await user.click(screen.getByRole('button', { name: 'Cerrar' }))
    expect(screen.queryByRole('dialog', { name: 'Filtros' })).toBeNull()
  })
})
