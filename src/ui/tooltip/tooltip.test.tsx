import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Button } from '../button/button'
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip'

describe('Tooltip', () => {
  it('shows a string label when its trigger receives keyboard focus', async () => {
    const user = userEvent.setup()
    render(
      <Tooltip label="Guarda los cambios realizados.">
        <Button>Guardar</Button>
      </Tooltip>,
    )

    const trigger = screen.getByRole('button', { name: 'Guardar' })
    await user.tab()
    expect(trigger.ownerDocument.activeElement).toBe(trigger)
    expect((await screen.findByRole('tooltip')).textContent).toBe('Guarda los cambios realizados.')
  })

  it('supports advanced composition with rich tooltip content', async () => {
    const user = userEvent.setup()
    render(
      <TooltipTrigger>
        <Button>Guardar</Button>
        <TooltipContent>
          Guardar cambios <kbd>Ctrl S</kbd>
        </TooltipContent>
      </TooltipTrigger>,
    )

    await user.tab()
    expect((await screen.findByRole('tooltip')).textContent).toBe('Guardar cambios Ctrl S')
  })
})
