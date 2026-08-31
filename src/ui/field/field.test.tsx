import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Input } from '../input/input'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from './field'

describe('Field', () => {
  it('connects native labels and exposes validation feedback as an alert', () => {
    render(
      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input id="email" aria-invalid="true" />
        <FieldError>Email inválido.</FieldError>
      </Field>,
    )
    expect(screen.getByLabelText('Email').getAttribute('aria-invalid')).toBe('true')
    expect(screen.getByRole('alert').textContent).toBe('Email inválido.')
  })

  it('deduplicates structured validation errors', () => {
    render(
      <FieldError
        errors={[
          { message: 'Campo obligatorio' },
          { message: 'Campo obligatorio' },
          { message: 'Formato inválido' },
        ]}
      />,
    )
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
  })

  it('groups related fields with native fieldset semantics', () => {
    render(
      <FieldSet>
        <FieldLegend>Contacto</FieldLegend>
        <FieldGroup>
          <Field aria-label="Email" />
          <FieldSeparator>o</FieldSeparator>
        </FieldGroup>
      </FieldSet>,
    )
    expect(screen.getByRole('group', { name: 'Contacto' })).toBeTruthy()
    expect(screen.getByText('o').getAttribute('data-slot')).toBe('field-separator-content')
  })
})
