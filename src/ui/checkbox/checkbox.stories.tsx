import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "./checkbox";

const meta = { title: "Components/Forms/Checkbox", component: Checkbox } satisfies Meta<typeof Checkbox>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { children: "Enviar un recordatorio" } };
export const Selected: Story = { args: { children: "Enviar un recordatorio", defaultSelected: true } };
export const Disabled: Story = { args: { children: "Enviar un recordatorio", isDisabled: true } };
