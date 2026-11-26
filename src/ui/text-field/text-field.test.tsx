import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef, useState } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { TextareaField, TextField } from './text-field'

describe('TextField', () => {
  it('associates feedback, forwards native attributes and merges external descriptions', () => {
    const ref = createRef<HTMLInputElement>()
    const { rerender } = render(
      <>
        <p id="extra">Información adicional</p>
        <TextField
          id="email"
          ref={ref}
          label="Email"
          type="email"
          name="email"
          required
          description="Usa tu correo de trabajo."
          errorMessage="Email inválido."
          aria-describedby="extra"
          className="w-72"
          inputClassName="text-lg"
        />
      </>,
    )
    const input = screen.getByRole('textbox', { name: /Email/ }) as HTMLInputElement
    expect(ref.current).toBe(input)
    expect(input.id).toBe('email')
    expect(input.type).toBe('email')
    expect(input.required).toBe(true)
    expect(input.className).toContain('text-lg')
    expect(input.parentElement?.className).toContain('w-72')
    expect(input.getAttribute('aria-invalid')).toBe('true')
    expect(input.getAttribute('aria-describedby')?.split(' ')).toEqual([
      'email-description',
      'email-error',
      'extra',
    ])
    expect(screen.getByRole('alert').id).toBe('email-error')

    rerender(
      <>
        <p id="extra">Información adicional</p>
        <TextField label="Email" id="email" aria-invalid="grammar" disabled />
      </>,
    )
    expect(input.disabled).toBe(true)
    expect(input.getAttribute('aria-invalid')).toBe('grammar')
    expect(input.hasAttribute('aria-describedby')).toBe(false)
  })

  it('emits string values and supports controlled updates and native form submission', async () => {
    const onChange = vi.fn()
    function Example() {
      const [value, setValue] = useState('')
      return (
        <form aria-label="Cliente">
          <TextField
            label="Nombre"
            name="name"
            value={value}
            onChange={(next) => {
              onChange(next)
              setValue(next)
            }}
          />
        </form>
      )
    }
    render(<Example />)
    await userEvent.type(screen.getByRole('textbox', { name: 'Nombre' }), 'Ana')
    expect(onChange).toHaveBeenLastCalledWith('Ana')
    expect(new FormData(screen.getByRole('form') as HTMLFormElement).get('name')).toBe('Ana')
  })
})

describe('TextareaField', () => {
  it('supports uncontrolled editing, generated accessible feedback and form submission', async () => {
    const ref = createRef<HTMLTextAreaElement>()
    const onChange = vi.fn()
    render(
      <form aria-label="Notas">
        <TextareaField
          ref={ref}
          label="Observaciones"
          name="notes"
          defaultValue="Inicial"
          description="Información para el equipo."
          errorMessage="Revisa las notas."
          onChange={onChange}
        />
      </form>,
    )
    const textarea = screen.getByRole('textbox', { name: 'Observaciones' }) as HTMLTextAreaElement
    expect(ref.current).toBe(textarea)
    expect(textarea.getAttribute('aria-invalid')).toBe('true')
    expect(textarea.getAttribute('aria-describedby')?.split(' ')).toEqual([
      screen.getByText('Información para el equipo.').id,
      screen.getByRole('alert').id,
    ])
    await userEvent.clear(textarea)
    await userEvent.type(textarea, 'Nueva nota')
    expect(onChange).toHaveBeenLastCalledWith('Nueva nota')
    expect(new FormData(screen.getByRole('form') as HTMLFormElement).get('notes')).toBe(
      'Nueva nota',
    )
  })

  it('forwards readOnly and preserves an externally supplied invalid state', async () => {
    const onChange = vi.fn()
    render(
      <TextareaField
        label="Notas"
        defaultValue="Solo lectura"
        readOnly
        aria-invalid
        onChange={onChange}
      />,
    )
    const textarea = screen.getByRole('textbox', { name: 'Notas' }) as HTMLTextAreaElement
    await userEvent.type(textarea, ' extra')
    expect(textarea.value).toBe('Solo lectura')
    expect(textarea.getAttribute('aria-invalid')).toBe('true')
    expect(onChange).not.toHaveBeenCalled()
  })
})
