import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { Button } from '../button/button'
import { Checkbox } from '../checkbox/checkbox'
import { Input } from '../input/input'
import { Menu, MenuContent, MenuItem, MenuTrigger } from '../menu/menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectList,
  SelectTrigger,
  SelectValue,
} from '../select/select'
import { Switch } from '../switch/switch'

const priorities = [
  { id: 'low', name: 'Baja' },
  { id: 'medium', name: 'Media' },
  { id: 'high', name: 'Alta' },
]

const meta = { title: 'Patterns/Controls' } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Selection: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox defaultSelected>Enviar un recordatorio</Checkbox>
      <Switch defaultSelected>Activar notificaciones</Switch>
    </div>
  ),
}

export const SelectField: Story = {
  render: function Render() {
    const [selectedKey, setSelectedKey] = useState('medium')
    return (
      <Select
        aria-label="Prioridad"
        selectedKey={selectedKey}
        onSelectionChange={(key) => setSelectedKey(String(key ?? 'medium'))}
        className="w-72"
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectList items={priorities}>
            {(priority) => (
              <SelectItem id={priority.id} textValue={priority.name}>
                {priority.name}
              </SelectItem>
            )}
          </SelectList>
        </SelectContent>
      </Select>
    )
  },
}

export const Search: Story = {
  render: () => (
    <Input
      aria-label="Buscar clientes"
      className="w-72"
      placeholder="Buscar clientes…"
      type="search"
    />
  ),
}

export const ActionsMenu: Story = {
  render: () => (
    <MenuTrigger>
      <Button variant="outline">Acciones</Button>
      <MenuContent>
        <Menu aria-label="Acciones de cliente">
          <MenuItem id="edit">Editar</MenuItem>
          <MenuItem id="archive">Archivar</MenuItem>
          <MenuItem id="delete" className="text-destructive">
            Eliminar
          </MenuItem>
        </Menu>
      </MenuContent>
    </MenuTrigger>
  ),
}
