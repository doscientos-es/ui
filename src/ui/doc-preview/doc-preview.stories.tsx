import type { Meta, StoryObj } from '@storybook/react-vite'

import { DocPreview } from './doc-preview'

const meta = {
  title: 'Components/Data Display/Document Preview',
  component: DocPreview,
  args: { name: 'Documento de ejemplo', url: null, mimeType: null },
} satisfies Meta<typeof DocPreview>
export default meta
type Story = StoryObj<typeof meta>

export const Unavailable: Story = {}
export const Unsupported: Story = { args: { url: 'about:blank', mimeType: 'application/zip' } }
export const Image: Story = {
  args: {
    mimeType: 'image/svg+xml',
    url: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="320" height="180" viewBox="0 0 320 180"%3E%3Crect width="320" height="180" fill="%23ececea"/%3E%3C/svg%3E',
  },
}
export const TextDocument: Story = {
  args: { mimeType: 'text/plain', url: 'data:text/plain,Documento%20sintetico%20de%20ejemplo.' },
}
