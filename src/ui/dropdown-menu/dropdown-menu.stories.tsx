import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../button/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./dropdown-menu";
const meta = { title: "Components/Navigation/Dropdown Menu", component: DropdownMenu } satisfies Meta<typeof DropdownMenu>; export default meta; type Story = StoryObj<typeof meta>;
export const Actions: Story = { render: () => <DropdownMenuTrigger><Button variant="outline">Acciones</Button><DropdownMenuContent><DropdownMenu><DropdownMenuItem id="edit">Editar</DropdownMenuItem><DropdownMenuItem id="duplicate">Duplicar</DropdownMenuItem><DropdownMenuSeparator /><DropdownMenuItem id="delete" className="text-destructive">Eliminar</DropdownMenuItem></DropdownMenu></DropdownMenuContent></DropdownMenuTrigger> };
