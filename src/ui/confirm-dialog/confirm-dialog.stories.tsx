import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, fn, userEvent, within } from "storybook/test";
import { Button } from "../button/button";
import { ConfirmDialog } from "./confirm-dialog";

const meta = {
  title: "Components/Overlays/Confirm Dialog",
  component: ConfirmDialog,
  args: { open: true, onOpenChange: fn(), title: "Eliminar cliente", description: "Esta acción no se puede deshacer.", destructive: true, confirmLabel: "Eliminar", onConfirm: fn() },
} satisfies Meta<typeof ConfirmDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {};
export const Pending: Story = { args: { pending: true, confirmLabel: "Eliminando…" } };
export const ConfirmationFlow: Story = {
  args: { open: false },
  render: function Render(args) {
    const [open, setOpen] = useState(false);
    return <><Button variant="destructive" onPress={() => setOpen(true)}>Eliminar cliente</Button><ConfirmDialog {...args} open={open} onOpenChange={setOpen} /></>;
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const page = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole("button", { name: "Eliminar cliente" }));
    await expect(page.getByRole("dialog", { name: "Eliminar cliente" })).toBeVisible();
    await userEvent.click(page.getByRole("button", { name: "Eliminar" }));
    await expect(args.onConfirm).toHaveBeenCalledOnce();
  },
};