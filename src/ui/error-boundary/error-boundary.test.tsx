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

  it('honors an explicitly empty fallback', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => undefined)
    const { container } = render(<ErrorBoundary fallback={null}><Broken /></ErrorBoundary>)
    expect(container.innerHTML).toBe('')
    error.mockRestore()
  })

  it('normalizes non-Error thrown values for the public fallback API', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => undefined)
    function BrokenValue() { throw 'failure'; return null }
    const onError = vi.fn()
    render(<ErrorBoundary onError={onError} fallback={({ error: cause }) => <p>{cause instanceof Error ? 'Recovered' : 'Invalid error'}</p>}><BrokenValue /></ErrorBoundary>)
    expect(screen.getByText('Recovered')).toBeTruthy()
    expect(onError.mock.calls[0]?.[0]).toBeInstanceOf(Error)
    error.mockRestore()
  })
})
