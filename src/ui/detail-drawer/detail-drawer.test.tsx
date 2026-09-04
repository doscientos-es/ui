import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Button } from '../button/button'
import { DrawerTitle, DrawerTrigger } from '../drawer/drawer'
import { DetailDrawer, DetailDrawerBody, DetailDrawerHeader } from './detail-drawer'

describe('DetailDrawer', () => {
  it('composes the record layout within a DrawerTrigger', async () => {
    const user = userEvent.setup()
    render(
      <DrawerTrigger>
        <Button>Abrir ficha</Button>
        <DetailDrawer>
          <DetailDrawerHeader>
            <DrawerTitle>Ficha de cliente</DrawerTitle>
          </DetailDrawerHeader>
          <DetailDrawerBody>Contenido</DetailDrawerBody>
        </DetailDrawer>
      </DrawerTrigger>,
    )

    await user.click(screen.getByRole('button', { name: 'Abrir ficha' }))
    expect(screen.getByRole('dialog', { name: 'Ficha de cliente' })).toBeTruthy()
    expect(screen.getByText('Contenido').dataset.slot).toBe('detail-drawer-body')
  })
})
