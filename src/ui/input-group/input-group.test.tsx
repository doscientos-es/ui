import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from './input-group'

describe('InputGroup', () => {
  it('marks addon buttons as group focus sources', async () => {
    const user = userEvent.setup()
    render(
      <InputGroup>
        <InputGroupInput aria-label="Correo electrónico" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton aria-label="Mostrar contraseña">Ojo</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>,
    )

    await user.tab()
    await user.tab()
    const button = screen.getByRole('button', { name: 'Mostrar contraseña' })
    expect(document.activeElement).toBe(button)
    expect(button.closest('[data-slot="input-group"]')?.className).toContain(
      'has-[[data-slot=input-group-button]:focus-visible]:ring-3',
    )
  })
})
