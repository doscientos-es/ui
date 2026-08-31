import type { Meta, StoryObj } from '@storybook/react-vite'

import { Skeleton } from './skeleton'

const meta = { title: 'Components/Feedback/Skeleton', component: Skeleton } satisfies Meta<
  typeof Skeleton
>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { className: 'h-4 w-64' } }
export const Card: Story = {
  render: () => (
    <div className="border-border w-80 space-y-3 rounded-xl border p-4">
      <Skeleton className="size-10 rounded-full" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-4/5" />
    </div>
  ),
}
