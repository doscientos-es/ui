import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { CopyButton } from './copy-button'

describe('CopyButton', () => {
  it('copies its value and reports success', async () => {
    const user = userEvent.setup()
    const writeText = vi.fn().mockResolvedValue(undefined)
    const onCopied = vi.fn()
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } })
    render(<CopyButton value="ABC-123" onCopied={onCopied} />)

    await user.click(screen.getByRole('button', { name: 'Copiar' }))

    expect(writeText).toHaveBeenCalledWith('ABC-123')
    expect(onCopied).toHaveBeenCalledWith('ABC-123')
    expect(screen.getByRole('button', { name: 'Copiado' })).toBeTruthy()
  })

  it('reports clipboard failures to the consumer', async () => {
    const user = userEvent.setup()
    const failure = new Error('Permiso denegado')
    const onCopyError = vi.fn()
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: vi.fn().mockRejectedValue(failure) },
    })
    render(<CopyButton value="ABC-123" onCopyError={onCopyError} />)

    await user.click(screen.getByRole('button', { name: 'Copiar' }))

    expect(onCopyError).toHaveBeenCalledWith(failure)
  })
})
