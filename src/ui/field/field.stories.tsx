import type { Meta, StoryObj } from "@storybook/react-vite";
import { Field, FieldDescription, FieldError, FieldLabel } from "./field";
import { Input } from "../input/input";

const meta = { title: "Components/Forms/Field", component: Field } satisfies Meta<typeof Field>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { render: () => <Field className="w-80"><FieldLabel htmlFor="field-name">Nombre</FieldLabel><Input id="field-name" placeholder="Escribe tu nombre" /><FieldDescription>Se mostrará a los miembros del equipo.</FieldDescription></Field> };
export const Invalid: Story = { render: () => <Field className="w-80"><FieldLabel htmlFor="field-email">Email</FieldLabel><Input id="field-email" aria-invalid="true" defaultValue="no-es-un-email" /><FieldError>Introduce un email válido.</FieldError></Field> };
