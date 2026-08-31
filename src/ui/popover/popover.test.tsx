import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Button } from '../button/button'
import { Popover, PopoverTrigger } from './popover'

describe('PopoverTrigger', () => {
  it('opens from the shared React Aria button', async () => {
    render(
      <PopoverTrigger>
        <Button>Abrir perfil</Button>
        <Popover>Contenido del perfil</Popover>
      </PopoverTrigger>,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Abrir perfil' }))
    expect(await screen.findByText('Contenido del perfil')).toBeTruthy()
  })
})
