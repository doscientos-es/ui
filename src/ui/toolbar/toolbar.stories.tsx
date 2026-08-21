import type { Meta, StoryObj } from "@storybook/react-vite";
import { Funnel, Plus } from "lucide-react";
import { Button } from "../button/button";
import { Input } from "../input/input";
import { Toolbar, ToolbarGroup, ToolbarSpacer } from "./toolbar";
const meta = { title: "Application/Toolbar", component: Toolbar } satisfies Meta<typeof Toolbar>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: () => <Toolbar aria-label="Acciones de clientes"><ToolbarGroup><Input aria-label="Buscar clientes" placeholder="Buscar..." /></ToolbarGroup><ToolbarSpacer /><ToolbarGroup><Button variant="outline"><Funnel /> Filtrar</Button><Button><Plus /> Nuevo</Button></ToolbarGroup></Toolbar> };
