import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Tabs, TabsContent, TabsList, TabsPanels, TabsTrigger } from './tabs'

describe('Tabs', () => {
  it('moves selection with the arrow keys and updates the associated panel', async () => {
    const user = userEvent.setup()
    render(
      <Tabs defaultSelectedKey="summary">
        <TabsList aria-label="Proyecto">
          <TabsTrigger id="summary">Resumen</TabsTrigger>
          <TabsTrigger id="activity">Actividad</TabsTrigger>
        </TabsList>
        <TabsPanels>
          <TabsContent id="summary">Resumen del proyecto</TabsContent>
          <TabsContent id="activity">Actividad del proyecto</TabsContent>
        </TabsPanels>
      </Tabs>,
    )

    await user.tab()
    await user.keyboard('{ArrowRight}')

    expect(screen.getByRole('tab', { name: 'Actividad' }).getAttribute('aria-selected')).toBe(
      'true',
    )
    expect(screen.getByRole('tabpanel').textContent).toContain('Actividad del proyecto')
  })
})
