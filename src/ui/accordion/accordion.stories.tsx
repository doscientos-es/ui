import type { Meta, StoryObj } from '@storybook/react-vite'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './accordion'

const meta = {
  title: 'Components/Disclosure/Accordion',
  component: Accordion,
  tags: ['test:ui'],
} satisfies Meta<typeof Accordion>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  render: () => (
    <Accordion className="w-96">
      <AccordionItem id="scope">
        <AccordionTrigger>¿Qué incluye?</AccordionTrigger>
        <AccordionContent>Una respuesta accesible y animable para la sección.</AccordionContent>
      </AccordionItem>
      <AccordionItem id="support">
        <AccordionTrigger>¿Está incluido el soporte?</AccordionTrigger>
        <AccordionContent>Consulta las condiciones del proyecto.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}
export const Multiple: Story = {
  render: () => (
    <Accordion className="w-96" allowsMultipleExpanded defaultExpandedKeys={['billing', 'support']}>
      <AccordionItem id="billing">
        <AccordionTrigger>Facturación</AccordionTrigger>
        <AccordionContent>Consulta y descarga todas tus facturas.</AccordionContent>
      </AccordionItem>
      <AccordionItem id="support">
        <AccordionTrigger>Soporte</AccordionTrigger>
        <AccordionContent>Escríbenos para resolver cualquier incidencia.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}
