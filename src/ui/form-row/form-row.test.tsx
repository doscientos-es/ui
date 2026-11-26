import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { FormRow } from './form-row'
describe('FormRow', () => {
  it('associates label and error text', () => {
    render(
      <FormRow label="Nombre" htmlFor="name" error="Campo obligatorio">
        <input id="name" />
      </FormRow>,
    )
    expect(screen.getByLabelText('Nombre')).toBeTruthy()
    expect(screen.getByRole('alert').textContent).toContain('obligatorio')
  })

  it('connects a generated id, hint, validation and required state to the rendered control', () => {
    const { rerender } = render(
      <FormRow label="Nombre" hint="Nombre legal" error="Campo obligatorio" required>
        {(props) => <input {...props} />}
      </FormRow>,
    )
    const input = screen.getByRole('textbox', { name: /Nombre/ }) as HTMLInputElement
    const id = input.id
    expect(input.required).toBe(true)
    expect(input.getAttribute('aria-invalid')).toBe('true')
    expect(input.getAttribute('aria-describedby')).toBe(`${id}-hint ${id}-error`)
    expect(screen.getByText('Nombre legal').id).toBe(`${id}-hint`)
    expect(screen.getByRole('alert').id).toBe(`${id}-error`)

    rerender(
      <FormRow label="Nombre" hint="Nombre legal">
        {(props) => <input {...props} />}
      </FormRow>,
    )
    expect(input.id).toBe(id)
    expect(input.getAttribute('aria-describedby')).toBe(`${id}-hint`)
    expect(input.hasAttribute('aria-invalid')).toBe(false)
    expect(input.required).toBe(false)
  })

  it('uses an explicit id in the render function', () => {
    render(
      <FormRow label="Email" htmlFor="email" error="Email inválido">
        {(props) => <input {...props} />}
      </FormRow>,
    )
    const input = screen.getByLabelText('Email')
    expect(input.id).toBe('email')
    expect(input.getAttribute('aria-describedby')).toBe('email-error')
  })
})
