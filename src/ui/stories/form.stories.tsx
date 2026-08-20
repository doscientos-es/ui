import type { Meta, StoryObj } from "@storybook/react-vite";
import { Field, FieldDescription, FieldError, FieldLabel } from "../field/field";
import { Input } from "../input/input";
import { Textarea } from "../textarea/textarea";

const meta = { title: "Patterns/Form States" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const TextInput: Story = {
  render: () => <Field className="w-80"><FieldLabel htmlFor="name">Nombre</FieldLabel><Input id="name" placeholder="Escribe tu nombre" /><FieldDescription>Se mostrará a los miembros del equipo.</FieldDescription></Field>,
};

export const Invalid: Story = {
  render: () => <Field className="w-80"><FieldLabel htmlFor="email">Email</FieldLabel><Input id="email" aria-invalid="true" defaultValue="no-es-un-email" /><FieldError>Introduce un email válido.</FieldError></Field>,
};

export const Multiline: Story = {
  render: () => <Field className="w-80"><FieldLabel htmlFor="description">Descripción</FieldLabel><Textarea id="description" placeholder="Añade contexto útil" /></Field>,
};
