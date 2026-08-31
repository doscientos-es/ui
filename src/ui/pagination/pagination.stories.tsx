import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { expect, userEvent, within } from 'storybook/test'

import { Pagination } from './pagination'
const meta = { title: 'Application/Pagination', component: Pagination } satisfies Meta<
  typeof Pagination
>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  args: { page: 2, pageCount: 8, onPageChange: () => undefined },
  render: () => {
    const [page, setPage] = useState(2)
    return <Pagination page={page} pageCount={8} onPageChange={setPage} />
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: 'Página 3' }))
    await expect(canvas.getByRole('button', { name: 'Página 3' })).toHaveAttribute(
      'aria-current',
      'page',
    )
    await userEvent.click(canvas.getByRole('button', { name: 'Página siguiente' }))
    await expect(canvas.getByText('Página 4 de 8')).toBeVisible()
  },
}
