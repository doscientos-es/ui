import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { expect, userEvent, waitFor, within } from 'storybook/test'

import { Button } from '../button/button'
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from './avatar'
const meta = { title: 'Components/Data Display/Avatar', component: Avatar } satisfies Meta<
  typeof Avatar
>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://i.pravatar.cc/80?img=12" alt="Ana" />
      <AvatarFallback>AN</AvatarFallback>
      <AvatarBadge />
    </Avatar>
  ),
}
export const Group: Story = {
  render: () => (
    <AvatarGroup>
      <Avatar>
        <AvatarFallback>AN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>BC</AvatarFallback>
      </Avatar>
      <AvatarGroupCount>+4</AvatarGroupCount>
    </AvatarGroup>
  ),
}
export const BrokenImage: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="/missing-avatar.jpg" alt="Ana" />
      <AvatarFallback>AN</AvatarFallback>
    </Avatar>
  ),
}

const localPhoto = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><rect width="32" height="32" fill="teal"/></svg>',
)}`

export const ImageTransition: Story = {
  tags: ['test:ui'],
  render: function ImageTransitionExample() {
    const [src, setSrc] = useState<string>()
    return (
      <div className="flex items-center gap-3">
        <Avatar data-testid="avatar">
          <AvatarImage src={src} alt="Ana" />
          <AvatarFallback>AN</AvatarFallback>
          <AvatarBadge />
        </Avatar>
        <Button variant="outline" onPress={() => setSrc(localPhoto)}>
          Cargar foto
        </Button>
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const avatar = canvas.getByTestId('avatar')
    const initial = avatar.getBoundingClientRect()
    const initials = canvas.getByText('AN')
    await expect(initials).toBeVisible()
    await userEvent.click(canvas.getByRole('button', { name: 'Cargar foto' }))
    await waitFor(() => expect(canvas.getByRole('img', { name: 'Ana' })).toBeVisible())
    await waitFor(() => expect(initials).not.toBeVisible())
    const final = avatar.getBoundingClientRect()
    await expect([final.width, final.height]).toEqual([initial.width, initial.height])
  },
}
