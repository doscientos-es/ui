import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './accordion'

describe('Accordion', () => {
  it('uses semantic appearance tokens', () => {
    const { container } = render(
      <Accordion>
        <AccordionItem id="first">
          <AccordionTrigger>Primero</AccordionTrigger>
          <AccordionContent>Contenido</AccordionContent>
        </AccordionItem>
        <AccordionItem id="second">
          <AccordionTrigger>Segundo</AccordionTrigger>
          <AccordionContent>Contenido</AccordionContent>
        </AccordionItem>
      </Accordion>,
    )

    expect(container.querySelector('[data-slot="accordion"]')?.classList).toContain(
      'text-foreground',
    )
    expect(container.querySelector('[data-slot="accordion-item"]')?.classList).toContain(
      'border-border',
    )
    expect(screen.getByRole('button', { name: 'Primero' }).classList).toContain('hover:bg-muted/50')
    expect(container.querySelector('[data-slot="accordion-content"]')?.classList).toContain(
      'text-muted-foreground',
    )
  })

  it('opens content with keyboard interaction', async () => {
    const user = userEvent.setup()
    render(
      <Accordion>
        <AccordionItem>
          <AccordionTrigger>Detalles</AccordionTrigger>
          <AccordionContent>Contenido</AccordionContent>
        </AccordionItem>
      </Accordion>,
    )
    const trigger = screen.getByRole('button', { name: 'Detalles' })
    await user.tab()
    expect(document.activeElement).toBe(trigger)
    await user.keyboard('{Enter}')
    expect(trigger.getAttribute('aria-expanded')).toBe('true')
    expect(screen.getByText('Contenido')).toBeTruthy()
  })
})
