import type { Meta, StoryObj } from '@storybook/react-vite'

import { Input } from '../input/input'
import { Label } from './label'

const meta = { title: 'Components/Forms/Label', component: Label } satisfies Meta<typeof Label>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { children: 'Nombre fiscal', htmlFor: 'label-example' } }
export const WithControl: Story = {
  render: () => (
    <div className="grid w-80 gap-2">
      <Label htmlFor="label-email">Email</Label>
      <Input id="label-email" type="email" placeholder="nombre@empresa.es" />
    </div>
  ),
}
