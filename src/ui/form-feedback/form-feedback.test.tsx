import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { FormFeedback } from './form-feedback'
describe('FormFeedback', () => {
  it('uses a live status for success', () => {
    render(<FormFeedback state={{ status: 'success' }} />)
    expect(screen.getByRole('status').textContent).toContain('Guardado')
  })
})
