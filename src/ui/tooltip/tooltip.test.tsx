import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Button } from '../button/button'
import { Tooltip, TooltipTrigger } from './tooltip'

describe('TooltipTrigger', () => {
  it('shows contextual information when its trigger receives keyboard focus', async () => {
    const user = userEvent.setup()
    render(
      <TooltipTrigger>
        <Button>Guardar</Button>
        <Tooltip>Guarda los cambios realizados.</Tooltip>
      </TooltipTrigger>,
    )

    const trigger = screen.getByRole('button', { name: 'Guardar' })
    await user.tab()
    expect(trigger.ownerDocument.activeElement).toBe(trigger)
    expect((await screen.findByRole('tooltip')).textContent).toBe('Guarda los cambios realizados.')
  })
})
