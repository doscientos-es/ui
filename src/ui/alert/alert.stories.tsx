import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert, AlertDescription, AlertTitle } from "./alert";
const meta = { title: "Components/Feedback/Alert", component: Alert, args: { children: <><AlertTitle>Atención</AlertTitle><AlertDescription>Revisa los datos antes de continuar.</AlertDescription></> }, argTypes: { variant: { control: "select", options: ["default", "destructive", "success", "warning"] } } } satisfies Meta<typeof Alert>;
export default meta; type Story = StoryObj<typeof meta>; export const Default: Story = {}; export const Destructive: Story = { args: { variant: "destructive" } };
