import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../button/button";
import { Menu, MenuContent, MenuItem, MenuTrigger } from "./menu";

const meta = { title: "Components/Navigation/Menu", component: Menu } satisfies Meta<typeof Menu>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Actions: Story = {
  render: () => <MenuTrigger><Button variant="outline">Acciones</Button><MenuContent><Menu aria-label="Acciones de cliente"><MenuItem id="edit">Editar</MenuItem><MenuItem id="archive">Archivar</MenuItem><MenuItem id="delete" className="text-destructive">Eliminar</MenuItem></Menu></MenuContent></MenuTrigger>,
};
