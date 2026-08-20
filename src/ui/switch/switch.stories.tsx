import type { Meta, StoryObj } from "@storybook/react-vite";
import { Switch } from "./switch";

const meta = {
  title: "Components/Forms/Switch",
  component: Switch,
  args: { children: "Activar notificaciones", size: "sm" },
  argTypes: {
    size: { control: "select", options: ["sm", "md"] },
    isDisabled: { control: "boolean" },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Selected: Story = { args: { defaultSelected: true } };
export const Disabled: Story = { args: { isDisabled: true } };
