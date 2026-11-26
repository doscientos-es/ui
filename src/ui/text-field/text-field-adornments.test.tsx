import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { expect, it, vi } from 'vitest'

import { TextField } from './text-field'

it('associates prefix, suffix, help and errors while preserving native input behavior', async () => {
  const ref = createRef<HTMLInputElement>()
  const onChange = vi.fn()
  render(
    <form aria-label="Precio">
      <TextField
        label="Importe"
        name="amount"
        ref={ref}
        defaultValue="12"
        prefix="€"
        suffix="por hora"
        description="Sin IVA"
        errorMessage="Revisa el importe"
        aria-describedby="extra"
        onChange={onChange}
      />
      <span id="extra">Información adicional</span>
    </form>,
  )
  const input = screen.getByRole('textbox', { name: 'Importe' }) as HTMLInputElement
  const ids = input.getAttribute('aria-describedby')?.split(' ') ?? []
  expect(ref.current).toBe(input)
  for (const text of ['€', 'por hora', 'Sin IVA', 'Revisa el importe', 'Información adicional'])
    expect(ids).toContain(screen.getByText(text).id)
  expect(input.getAttribute('aria-invalid')).toBe('true')
  await userEvent.type(input, '3')
  expect(onChange).toHaveBeenLastCalledWith('123')
  expect(new FormData(screen.getByRole('form') as HTMLFormElement).get('amount')).toBe('123')
})
