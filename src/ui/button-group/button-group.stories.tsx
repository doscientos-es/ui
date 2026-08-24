import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../button/button";
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from "./button-group";

const meta = {
  title: "Components/Actions/Button Group",
  component: ButtonGroup,
  tags: ["test:ui"],
} satisfies Meta<typeof ButtonGroup>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: () => (
    <ButtonGroup aria-label="Acciones">
      <Button variant="outline">Anterior</Button>
      <Button variant="outline">Siguiente</Button>
    </ButtonGroup>
  ),
};
export const WithText: Story = {
  render: () => (
    <ButtonGroup aria-label="Paginación">
      <Button variant="outline">Anterior</Button>
      <ButtonGroupSeparator />
      <ButtonGroupText>Página 2 de 8</ButtonGroupText>
      <ButtonGroupSeparator />
      <Button variant="outline">Siguiente</Button>
    </ButtonGroup>
  ),
};
export const Vertical: Story = {
  render: () => (
    <ButtonGroup aria-label="Alineación" orientation="vertical">
      <Button variant="outline">Izquierda</Button>
      <Button variant="outline">Centro</Button>
      <Button variant="outline">Derecha</Button>
    </ButtonGroup>
  ),
};
