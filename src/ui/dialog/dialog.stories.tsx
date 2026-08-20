import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Button } from "../button/button";
import { ConfirmDialog } from "../confirm-dialog/confirm-dialog";

const meta = { title: "Components/Overlays/ConfirmDialog" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const DestructiveAction: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    return <><Button variant="destructive" onClick={() => setOpen(true)}>Eliminar proyecto</Button><ConfirmDialog open={open} onOpenChange={setOpen} title="¿Eliminar este proyecto?" description="Esta acción no se puede deshacer." destructive onConfirm={() => setOpen(false)} /></>;
  },
};
