import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Button } from "./button";
import { Checkbox } from "./checkbox";
import { Menu, MenuContent, MenuItem, MenuTrigger } from "./menu";
import { SearchClearButton, SearchField, SearchInput } from "./search-field";
import { Select, SelectContent, SelectItem, SelectList, SelectTrigger, SelectValue } from "./select";
import { Switch } from "./switch";

const priorities = [
  { id: "low", name: "Baja" },
  { id: "medium", name: "Media" },
  { id: "high", name: "Alta" },
];

const meta = { title: "Forms/Controls" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Selection: Story = {
  render: () => <div className="flex flex-col gap-4"><Checkbox defaultSelected>Enviar un recordatorio</Checkbox><Switch defaultSelected>Activar notificaciones</Switch></div>,
};

export const SelectField: Story = {
  render: function Render() {
    const [selectedKey, setSelectedKey] = useState("medium");
    return <Select aria-label="Prioridad" selectedKey={selectedKey} onSelectionChange={(key) => setSelectedKey(String(key ?? "medium"))} className="w-72">
      <SelectTrigger><SelectValue /></SelectTrigger>
      <SelectContent><SelectList items={priorities}>{(priority) => <SelectItem id={priority.id} textValue={priority.name}>{priority.name}</SelectItem>}</SelectList></SelectContent>
    </Select>;
  },
};

export const Search: Story = {
  render: () => <SearchField aria-label="Buscar clientes" className="relative w-72"><SearchInput placeholder="Buscar clientes…" /><SearchClearButton aria-label="Borrar búsqueda" /></SearchField>,
};

export const ActionsMenu: Story = {
  render: () => <MenuTrigger><Button variant="outline">Acciones</Button><MenuContent><Menu aria-label="Acciones de cliente"><MenuItem id="edit">Editar</MenuItem><MenuItem id="archive">Archivar</MenuItem><MenuItem id="delete" className="text-destructive">Eliminar</MenuItem></Menu></MenuContent></MenuTrigger>,
};
