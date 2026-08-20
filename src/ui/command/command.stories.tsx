import type { Meta, StoryObj } from "@storybook/react-vite";
import { Command, CommandContent, CommandInput, CommandItem, CommandList } from "./command";
const meta = { title: "Components/Navigation/Command", component: Command } satisfies Meta<typeof Command>; export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = { render: () => <Command aria-label="Buscar acción"><CommandInput aria-label="Buscar acción" placeholder="Busca una acción…" /><CommandContent><CommandList items={[{ id: "new", label: "Crear proyecto" }, { id: "settings", label: "Abrir ajustes" }]}>{(item) => <CommandItem id={item.id} textValue={item.label}>{item.label}</CommandItem>}</CommandList></CommandContent></Command> };
