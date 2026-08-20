import type { Meta, StoryObj } from "@storybook/react-vite";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion";
const meta = { title: "Components/Disclosure/Accordion", component: Accordion } satisfies Meta<typeof Accordion>; export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = { render: () => <Accordion><AccordionItem><AccordionTrigger>¿Qué incluye?</AccordionTrigger><AccordionContent>Una respuesta accesible y animable para la sección.</AccordionContent></AccordionItem><AccordionItem><AccordionTrigger>¿Está incluido el soporte?</AccordionTrigger><AccordionContent>Consulta las condiciones del proyecto.</AccordionContent></AccordionItem></Accordion> };
