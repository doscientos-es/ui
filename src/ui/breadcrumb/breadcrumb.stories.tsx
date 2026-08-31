import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Breadcrumbs,
} from './breadcrumb'
const meta = { title: 'Components/Navigation/Breadcrumb', component: Breadcrumbs } satisfies Meta<
  typeof Breadcrumbs
>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  render: () => (
    <Breadcrumbs aria-label="Ruta">
      <Breadcrumb>
        <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
        <BreadcrumbSeparator />
      </Breadcrumb>
      <Breadcrumb>
        <BreadcrumbLink href="/clientes">Clientes</BreadcrumbLink>
        <BreadcrumbSeparator />
      </Breadcrumb>
      <Breadcrumb>
        <BreadcrumbPage>Acme S.L.</BreadcrumbPage>
      </Breadcrumb>
    </Breadcrumbs>
  ),
}
