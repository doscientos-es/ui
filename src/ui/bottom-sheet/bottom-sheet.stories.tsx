import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, waitFor, within } from 'storybook/test'

import { Button } from '../button/button'
import { BottomSheet, BottomSheetTrigger } from './bottom-sheet'

const meta = {
  title: 'Components/Overlays/Bottom Sheet',
  component: BottomSheet,
  tags: ['test:ui'],
} satisfies Meta<typeof BottomSheet>

export default meta
type Story = StoryObj<typeof meta>

async function closeSheet(panel: HTMLElement, trigger: HTMLElement) {
  const close = within(panel).getByRole('button', { name: 'Cerrar' })
  // Unlike a native pointer press, userEvent calls focus(), which queues a
  // programmatic scroll in React Aria that would interrupt the exit animation.
  close.focus({ preventScroll: true })
  await userEvent.click(close)
  await waitFor(() => expect(panel).not.toBeInTheDocument())
  await waitFor(() => expect(trigger).toHaveFocus())
}

async function expectSheetAtBottom(dialog: HTMLElement) {
  const sheet = dialog.closest('[data-slot="bottom-sheet"]')
  if (!sheet) throw new Error('Expected an outer bottom sheet surface.')
  await waitFor(() =>
    expect(sheet.getBoundingClientRect().bottom).toBeCloseTo(window.innerHeight, 0),
  )
}

export const Default: Story = {
  args: {
    title: 'Filtros',
    description: 'Refina los resultados del listado.',
    children: <p>Estado del pedido</p>,
  },
  render: (args) => (
    <BottomSheetTrigger>
      <Button variant="outline">Filtrar pedidos</Button>
      <BottomSheet {...args} />
    </BottomSheetTrigger>
  ),
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole('button', { name: 'Filtrar pedidos' })
    await expect(trigger).toHaveAttribute('aria-expanded', 'false')
    await userEvent.click(trigger)
    await expect(trigger).toHaveAttribute('aria-expanded', 'true')

    const page = within(canvasElement.ownerDocument.body)
    const panel = await page.findByRole('dialog', { name: 'Filtros' })
    await expect(panel).toHaveAccessibleDescription('Refina los resultados del listado.')
    await expectSheetAtBottom(panel)
    await closeSheet(panel, trigger)
  },
}

export const SnapPoints: Story = {
  args: {
    title: 'Detalles del pedido',
    description: 'Desliza hacia arriba para ver el historial completo.',
    peekHeight: '45%',
    children: (
      <ol className="divide-border divide-y">
        {Array.from({ length: 18 }, (_, index) => (
          <li key={index} className="py-4">
            Actualización {index + 1}
          </li>
        ))}
      </ol>
    ),
  },
  render: (args) => (
    <BottomSheetTrigger>
      <Button variant="outline">Ver pedido</Button>
      <BottomSheet {...args} />
    </BottomSheetTrigger>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const page = within(canvasElement.ownerDocument.body)
    const trigger = canvas.getByRole('button', { name: 'Ver pedido' })
    await userEvent.click(trigger)

    const panel = await page.findByRole('dialog', { name: 'Detalles del pedido' })
    const handle = within(panel).getByRole('button', { name: 'Expandir panel' })
    await expect(handle).toHaveAttribute('aria-expanded', 'false')
    const overlay = panel.closest('[data-slot="bottom-sheet-overlay"]')
    await waitFor(async () => {
      const rect = panel.getBoundingClientRect()
      await expect(window.innerHeight - rect.top).toBeCloseTo(rect.height * 0.45, -1)
    })
    await waitFor(() => expect(overlay).not.toHaveAttribute('data-entering'))
    handle.focus({ preventScroll: true })
    await expect(handle).toHaveFocus()
    await userEvent.keyboard('{Enter}')
    await waitFor(() => expect(handle).toHaveAttribute('aria-expanded', 'true'))
    await expectSheetAtBottom(panel)
    await expect(handle).toHaveFocus()
    await expect(panel.scrollHeight).toBeGreaterThan(panel.clientHeight)

    await closeSheet(panel, trigger)
  },
}

export const OnScrolledPage: Story = {
  args: {
    title: 'Filtros',
    children: <p>Estado del pedido</p>,
  },
  render: (args) => (
    <div className="flex min-h-[180dvh] items-end pb-12">
      <BottomSheetTrigger>
        <Button variant="outline">Filtrar pedidos</Button>
        <BottomSheet {...args} />
      </BottomSheetTrigger>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole('button', { name: 'Filtrar pedidos' })
    trigger.scrollIntoView({ block: 'center' })
    const pageOffset = window.scrollY
    await expect(pageOffset).toBeGreaterThan(0)
    await userEvent.click(trigger)

    const page = within(canvasElement.ownerDocument.body)
    const dialog = await page.findByRole('dialog', { name: 'Filtros' })
    const overlay = dialog.closest('[data-slot="bottom-sheet-overlay"]')
    await waitFor(async () => {
      const { top, bottom } = dialog.getBoundingClientRect()
      await expect(bottom).toBeCloseTo(window.innerHeight, -1)
      await expect(top).toBeLessThan(window.innerHeight - 60)
    })
    await waitFor(() => expect(overlay).not.toHaveAttribute('data-entering'))
    await closeSheet(dialog, trigger)
    await expect(window.scrollY).toBe(pageOffset)
  },
}
