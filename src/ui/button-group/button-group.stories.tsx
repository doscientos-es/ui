import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../button/button";
import { ButtonGroup } from "./button-group";
const meta = { title: "Components/Actions/Button Group", component: ButtonGroup } satisfies Meta<typeof ButtonGroup>; export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = { render: () => <ButtonGroup aria-label="Acciones"><Button variant="outline">Anterior</Button><Button variant="outline">Siguiente</Button></ButtonGroup> };
