import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Button } from "../button/button";
import { Drawer, DrawerDescription, DrawerHeader, DrawerTitle } from "./drawer";
const meta = { title: "Components/Overlays/Drawer", component: Drawer, args: { children: null } } satisfies Meta<typeof Drawer>; export default meta; type Story = StoryObj<typeof meta>;
export const Right: Story = { render: function Render() { const [open, setOpen] = useState(false); return <><Button onPress={() => setOpen(true)}>Abrir panel</Button><Drawer isOpen={open} onOpenChange={setOpen}><DrawerHeader><DrawerTitle>Filtros</DrawerTitle><DrawerDescription>Refina los resultados de la lista.</DrawerDescription></DrawerHeader></Drawer></>; } };
