import type { Meta, StoryObj } from '@storybook/react-vite'

import { Marquee } from './marquee'

const customers = ['Acme', 'Northstar', 'Globex', 'Umbrella']

const meta = {
  title: 'Components/Content/Marquee',
  component: Marquee,
  args: { children: customers.map((customer) => <span key={customer}>{customer}</span>) },
  argTypes: {
    direction: { control: 'select', options: ['left', 'right', 'up', 'down'] },
    duration: { control: { type: 'number', min: 1, max: 60 } },
    fadeAmount: { control: { type: 'range', min: 0, max: 50 } },
  },
} satisfies Meta<typeof Marquee>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { className: 'max-w-xl', pauseOnHover: true },
  render: (args) => (
    <Marquee {...args}>
      {customers.map((customer) => (
        <span
          className="border-border mr-10 rounded-full border px-5 py-2 font-medium"
          key={customer}
        >
          {customer}
        </span>
      ))}
    </Marquee>
  ),
}

export const Vertical: Story = {
  args: { direction: 'up', className: 'h-36 max-w-48', fade: false },
  render: (args) => (
    <Marquee {...args}>
      {customers.map((customer) => (
        <span className="bg-muted mb-3 block rounded-md px-3 py-2" key={customer}>
          {customer}
        </span>
      ))}
    </Marquee>
  ),
}
