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
})
