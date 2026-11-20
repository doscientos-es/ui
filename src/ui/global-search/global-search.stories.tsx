import type { Meta, StoryObj } from '@storybook/react-vite'
import { Search } from 'lucide-react'
import { useState } from 'react'

import { Dialog } from '../dialog/dialog'
import { GlobalSearch } from './global-search'

const entries = [
  { id: 'clients', title: 'Clientes', category: 'Directorio' },
  { id: 'invoices', title: 'Facturas', category: 'Contabilidad' },
  { id: 'calendar', title: 'Calendario de cobros', category: 'Contabilidad' },
]

function SearchExample({ loading = false, focusOnMount = true }) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(true)
  const items = entries.filter(({ title }) =>
    title.toLowerCase().includes(query.toLowerCase().trim()),
  )

  return (
    <Dialog
      trigger="Buscar"
      title="Búsqueda global"
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen)
        if (!nextOpen) setQuery('')
      }}
    >
      <GlobalSearch
        label="Buscar en el espacio"
        placeholder="Busca clientes, facturas o secciones…"
        items={items}
        query={query}
        onQueryChange={setQuery}
        onAction={() => {
          setOpen(false)
          setQuery('')
        }}
        status={query ? `${items.length} resultados` : 'Ir a una sección'}
        leading={<Search aria-hidden="true" className="size-5" />}
        renderItem={(item) => (
          <span className="min-w-0">
            <span className="block truncate font-medium">{item.title}</span>
            <span className="text-muted-foreground block text-xs">{item.category}</span>
          </span>
        )}
        loading={loading}
        focusOnMount={focusOnMount}
      />
    </Dialog>
  )
}

const meta = {
  title: 'Components/Navigation/GlobalSearch',
  component: SearchExample,
  tags: ['test:ui'],
} satisfies Meta<typeof SearchExample>
export default meta
type Story = StoryObj<typeof meta>

export const DialogSearch: Story = {}
export const Loading: Story = { args: { loading: true } }
export const WithoutAutoFocus: Story = { args: { focusOnMount: false } }
