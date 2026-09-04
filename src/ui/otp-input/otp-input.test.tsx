import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef, useState } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { OtpInput } from './otp-input'

describe('OtpInput', () => {
  it('uses one real input and exposes OTP autofill semantics', () => {
    const ref = createRef<HTMLInputElement>()
    const { container } = render(<OtpInput ref={ref} aria-label="Código" />)
    const input = screen.getByRole('textbox', { name: 'Código' })

    expect(input).toBe(ref.current)
    expect(input.getAttribute('autocomplete')).toBe('one-time-code')
    expect(input.getAttribute('inputmode')).toBe('numeric')
    expect(input.getAttribute('maxlength')).toBe('6')
    expect(container.querySelectorAll('[data-slot="otp-input-slot"]')).toHaveLength(6)
    expect(container.querySelectorAll('input')).toHaveLength(1)
  })

  it('falls back to six slots for invalid lengths', () => {
    const { container } = render(<OtpInput aria-label="Código" length={Number.NaN} />)

    expect(screen.getByRole('textbox', { name: 'Código' }).getAttribute('maxlength')).toBe('6')
    expect(container.querySelectorAll('[data-slot="otp-input-slot"]')).toHaveLength(6)
  })

  it('filters non-numeric characters in controlled usage', async () => {
    const user = userEvent.setup()
    function Example() {
      const [value, setValue] = useState('')
      return <OtpInput aria-label="Código" value={value} onChange={setValue} />
    }
    render(<Example />)
    const input = screen.getByRole('textbox', { name: 'Código' }) as HTMLInputElement

    await user.type(input, '12a3 45-6')
    expect(input.value).toBe('123456')
  })

  it('highlights the next empty slot while editing', async () => {
    const user = userEvent.setup()
    const { container } = render(<OtpInput aria-label="Código" />)
    const input = screen.getByRole('textbox', { name: 'Código' })

    await user.type(input, '12')
    const slots = container.querySelectorAll('[data-slot="otp-input-slot"]')
    expect(slots[2]?.getAttribute('data-active')).toBe('true')
  })

  it('supports uncontrolled editing and completion', () => {
    const onChange = vi.fn()
    const onComplete = vi.fn()
    render(
      <OtpInput
        aria-label="Código"
        length={4}
        defaultValue="1a"
        onChange={onChange}
        onComplete={onComplete}
      />,
    )
    const input = screen.getByRole('textbox', { name: 'Código' }) as HTMLInputElement

    fireEvent.change(input, { target: { value: '12-34' } })
    expect(input.value).toBe('1234')
    expect(onChange).toHaveBeenLastCalledWith('1234')
    expect(onComplete).toHaveBeenCalledOnce()
  })

  it('only calls onComplete when the code first becomes complete', () => {
    const onComplete = vi.fn()
    render(<OtpInput aria-label="Código" length={4} onComplete={onComplete} />)
    const input = screen.getByRole('textbox', { name: 'Código' }) as HTMLInputElement

    fireEvent.change(input, { target: { value: '1234' } })
    fireEvent.change(input, { target: { value: '1235' } })

    expect(onComplete).toHaveBeenCalledOnce()
    expect(onComplete).toHaveBeenLastCalledWith('1234')
  })

  it('reflects disabled and invalid states on its slots', () => {
    const { container } = render(<OtpInput aria-label="Código" disabled aria-invalid="true" />)

    expect(screen.getByRole('textbox', { name: 'Código' })).toHaveProperty('disabled', true)
    expect(container.querySelector('[data-slot="otp-input"]')?.getAttribute('data-invalid')).toBe(
      'true',
    )
  })
})
