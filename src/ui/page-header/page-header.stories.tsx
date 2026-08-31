import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../button/button'
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderDescription,
  PageHeaderHeading,
  PageHeaderTitle,
} from './page-header'
const meta = { title: 'Application/PageHeader', component: PageHeader } satisfies Meta<
  typeof PageHeader
>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  render: () => (
    <PageHeader>
      <PageHeaderHeading>
        <PageHeaderTitle>Clientes</PageHeaderTitle>
        <PageHeaderDescription>
          Gestiona las cuentas y contactos de tu workspace.
        </PageHeaderDescription>
      </PageHeaderHeading>
      <PageHeaderActions>
        <Button>Nuevo cliente</Button>
      </PageHeaderActions>
    </PageHeader>
  ),
}
