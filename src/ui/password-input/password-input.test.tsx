import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { describe, expect, it } from 'vitest'

import { PasswordInput } from './password-input'

describe('PasswordInput', () => {
  it('toggles visibility and keeps the input ref', async () => {
    const user = userEvent.setup()
    const ref = createRef<HTMLInputElement>()
    render(<PasswordInput aria-label="Contraseña" ref={ref} />)
    const input = screen.getByLabelText('Contraseña')
    const toggle = screen.getByRole('button', { name: 'Mostrar contraseña' })

    expect(input).toBe(ref.current)
    expect(input.getAttribute('type')).toBe('password')
    await user.click(toggle)
    expect(input.getAttribute('type')).toBe('text')
    expect(
      screen.getByRole('button', { name: 'Ocultar contraseña' }).getAttribute('aria-pressed'),
    ).toBe('true')
  })

  it('renders feedback only when supplied', () => {
    const { rerender } = render(<PasswordInput aria-label="Contraseña" />)
    expect(screen.queryByRole('status')).toBeNull()
    rerender(<PasswordInput aria-label="Contraseña" indicator={<output>Falta una norma</output>} />)
    expect(screen.getByRole('status').textContent).toContain('Falta una norma')
  })
})
