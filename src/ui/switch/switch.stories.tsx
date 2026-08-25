import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bell, BellRing, Check } from "lucide-react";
import { expect, userEvent, within } from "storybook/test";
import { Switch } from "./switch";

const meta = {
  title: "Components/Forms/Switch",
  component: Switch,
  args: { children: "Activar notificaciones", size: "md" },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    isDisabled: { control: "boolean" },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const control = within(canvasElement).getByRole("switch", { name: "Activar notificaciones" });
    control.focus();
    await userEvent.keyboard("{ArrowRight}");
    await expect(control).toBeChecked();
    await userEvent.keyboard("{ArrowLeft}");
    await expect(control).not.toBeChecked();
    await userEvent.keyboard(" ");
    await expect(control).toBeChecked();
  },
};
export const Selected: Story = { args: { defaultSelected: true, selectedIcon: <Check className="size-3" /> } };
export const WithDescription: Story = { args: { description: "Recibe un aviso cuando cambie el estado de una factura.", icon: <Bell className="size-3" />, selectedIcon: <BellRing className="size-3" /> } };
export const Sizes: Story = { render: () => <div className="flex flex-col items-start gap-4"><Switch size="sm">Pequeño</Switch><Switch size="md" defaultSelected>Mediano</Switch><Switch size="lg">Grande</Switch></div> };
export const Disabled: Story = { args: { isDisabled: true } };
