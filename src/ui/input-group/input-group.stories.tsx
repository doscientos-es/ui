import type { Meta, StoryObj } from '@storybook/react-vite'
import { Copy, Search } from 'lucide-react'

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from './input-group'

const meta = {
  title: 'Components/Forms/Input Group',
  component: InputGroup,
  tags: ['test:ui'],
} satisfies Meta<typeof InputGroup>
export default meta
type Story = StoryObj<typeof meta>
export const Currency: Story = {
  render: () => (
    <InputGroup className="max-w-xs">
      <InputGroupAddon>
        <InputGroupText>€</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput aria-label="Precio" placeholder="0,00" />
    </InputGroup>
  ),
}
export const SearchField: Story = {
  render: () => (
    <InputGroup className="max-w-sm">
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      <InputGroupInput aria-label="Buscar clientes" placeholder="Buscar clientes..." />
      <InputGroupAddon align="inline-end">
        <InputGroupText>⌘ K</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  ),
}
export const WithButton: Story = {
  render: () => (
    <InputGroup className="max-w-sm">
      <InputGroupInput aria-label="API key" defaultValue="sk_example" readOnly />
      <InputGroupAddon align="inline-end">
        <InputGroupButton size="icon-xs" aria-label="Copiar">
          <Copy />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
}
export const Textarea: Story = {
  render: () => (
    <InputGroup className="max-w-sm">
      <InputGroupTextarea aria-label="Comentario" placeholder="Escribe un comentario..." />
      <InputGroupAddon align="block-end">
        <InputGroupText>Máximo 500 caracteres</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  ),
}
