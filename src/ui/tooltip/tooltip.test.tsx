import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Button } from '../button/button'
import { Tooltip, TooltipTrigger } from './tooltip'

describe('TooltipTrigger', () => {
  it('shows contextual information when its trigger is hovered', async () => {
    const user = userEvent.setup()
    render(
      <TooltipTrigger>
        <Button>Guardar</Button>
        <Tooltip>Guarda los cambios realizados.</Tooltip>
      </TooltipTrigger>,
    )

    await user.hover(screen.getByRole('button', { name: 'Guardar' }))
    expect(await screen.findByRole('tooltip')).toHaveTextContent('Guarda los cambios realizados.')
  })
})
