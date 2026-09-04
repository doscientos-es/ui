import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Checkbox } from './checkbox'

describe('Checkbox', () => {
  it('supports pointer and keyboard selection with native checkbox semantics', async () => {
    const user = userEvent.setup()
    render(<Checkbox>Recibir avisos</Checkbox>)
    const checkbox = screen.getByRole('checkbox', { name: 'Recibir avisos' })
    await user.click(checkbox)
    expect(checkbox).toHaveProperty('checked', true)
    await user.keyboard(' ')
    expect(checkbox).toHaveProperty('checked', false)
  })

  it('renders a distinct indicator for indeterminate selection', () => {
    render(<Checkbox isIndeterminate>Seleccionar todos</Checkbox>)

    expect(screen.getByRole('checkbox')).toHaveProperty('indeterminate', true)
    expect(document.querySelector('[data-slot="checkbox-indeterminate"]')).not.toBeNull()
  })
})
