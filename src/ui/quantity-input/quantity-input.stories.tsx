import type { Meta, StoryObj } from "@storybook/react-vite";
import { QuantityInput } from "./quantity-input";

const meta = {
  title: "Components/Forms/Quantity Input",
  component: QuantityInput,
  args: { "aria-label": "Número de instancias", defaultValue: 3, minValue: 0, step: 1 },
  argTypes: {
    defaultValue: { control: "number" },
    minValue: { control: "number" },
    maxValue: { control: "number" },
    step: { control: "number" },
    isDisabled: { control: "boolean" },
  },
} satisfies Meta<typeof QuantityInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithLimits: Story = { args: { defaultValue: 1, minValue: 1, maxValue: 5 } };
export const Disabled: Story = { args: { isDisabled: true } };