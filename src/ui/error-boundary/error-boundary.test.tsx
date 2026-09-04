import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { ErrorBoundary } from './error-boundary'

function Broken() {
  throw new Error('Roto')
  return null
}

describe('ErrorBoundary', () => {
  it('renders a recoverable default fallback', async () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => undefined)
    const user = userEvent.setup()
    render(
      <ErrorBoundary>
        <Broken />
      </ErrorBoundary>,
    )

    expect(screen.getByRole('alert')).toBeTruthy()
    await user.click(screen.getByRole('button', { name: 'Reintentar' }))
    expect(screen.getByRole('alert')).toBeTruthy()
    error.mockRestore()
  })
})
