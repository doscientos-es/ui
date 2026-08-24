import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Button } from "../button/button";
import { PopoverContent, PopoverTrigger } from "./popover";

const meta = { title: "Components/Overlays/Popover", component: PopoverContent } satisfies Meta<typeof PopoverContent>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <PopoverTrigger><Button variant="outline">Ver detalles</Button><PopoverContent><div className="p-2"><p className="font-medium">Cliente activo</p><p className="mt-1 text-sm text-muted-foreground">Actualizado hace 2 minutos.</p></div></PopoverContent></PopoverTrigger>,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const page = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole("button", { name: "Ver detalles" }));
    await expect(page.getByText("Cliente activo")).toBeVisible();
    await userEvent.keyboard("{Escape}");
    await expect(page.queryByText("Cliente activo")).not.toBeInTheDocument();
  },
};