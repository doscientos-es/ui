import type { Meta, StoryObj } from '@storybook/react-vite'

import { Kbd, KbdGroup } from './kbd'

const meta = { title: 'Components/Data Display/Kbd', component: Kbd } satisfies Meta<typeof Kbd>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { children: '⌘K' } }
export const Shortcut: Story = {
  render: () => (
    <span className="inline-flex items-center gap-2 text-sm">
      Guardar
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <span>+</span>
        <Kbd>S</Kbd>
      </KbdGroup>
    </span>
  ),
}
