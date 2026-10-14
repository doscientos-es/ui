import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { describe, expect, it } from 'vitest'

import { Input } from './input'

describe('Input', () => {
  it('forwards its ref to the native input element', () => {
    const ref = createRef<HTMLInputElement>()
    render(<Input ref={ref} aria-label="Nombre" />)

    expect(ref.current).toBeInstanceOf(HTMLInputElement)
    expect(ref.current?.classList.contains('box-border')).toBe(true)
  })

  it('keeps mobile text readable and distinguishes focused validation errors', () => {
    render(<Input aria-label="Email" aria-invalid />)
    const input = screen.getByRole('textbox')
    expect(input.classList.contains('text-base')).toBe(true)
    expect(input.classList.contains('md:text-sm')).toBe(true)
    expect(input.classList.contains('aria-invalid:focus-visible:ring-destructive/20')).toBe(true)
    expect(input.classList.contains('motion-reduce:transition-none')).toBe(true)
  })

  it('does not accept typing when disabled', async () => {
    render(<Input aria-label="Nombre" disabled />)
    const input = screen.getByRole('textbox') as HTMLInputElement
    await userEvent.type(input, 'Ana')
    expect(input.value).toBe('')
    expect(input.disabled).toBe(true)
  })
})
