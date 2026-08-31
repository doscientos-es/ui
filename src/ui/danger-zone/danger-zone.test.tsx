import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { DangerZone } from './danger-zone'

describe('DangerZone', () => {
  it('keeps destructive actions collapsed until the user expands it', async () => {
    const user = userEvent.setup()
    render(
      <DangerZone>
        <button type="button">Eliminar proyecto</button>
      </DangerZone>,
    )

    const trigger = screen.getByRole('button', { name: /zona de peligro/i })
    expect(trigger.getAttribute('aria-expanded')).toBe('false')

    await user.click(trigger)
    expect(screen.getByRole('button', { name: 'Eliminar proyecto' })).toBeTruthy()
  })
})
