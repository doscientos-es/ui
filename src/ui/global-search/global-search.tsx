import { useEffect, useRef, type ReactNode } from 'react'
import { Autocomplete, TextField, type ListBoxItemRenderProps } from 'react-aria-components'

import { cn } from '../../lib/cn'
import { CommandInput, CommandItem, CommandList } from '../command/command'

export type GlobalSearchItem = { id: string; title: string }

export type GlobalSearchProps<T extends GlobalSearchItem> = {
  /** Results in display order. The caller owns filtering, ranking and data fetching. */
  items: readonly T[]
  query: string
  onQueryChange: (query: string) => void
  onAction: (item: T) => void
  label: string
  resultsLabel?: string
  placeholder?: string
  focusOnMount?: boolean
  maxLength?: number
  loading?: boolean
  loadingMessage?: string
  emptyMessage?: ReactNode
  /** Announced on changes, e.g. result count or search suggestions. */
  status?: string
  /** Optional message and actions for errors, including partial results. */
  feedback?: ReactNode
  leading?: ReactNode
  renderItem?: (item: T, state: ListBoxItemRenderProps) => ReactNode
  fieldClassName?: string
  resultsClassName?: string
}

/** Inline command search. Compose with a dialog or page; no router or search provider required. */
export function GlobalSearch<T extends GlobalSearchItem>({
  items,
  query,
  onQueryChange,
  onAction,
  label,
  resultsLabel = 'Resultados de búsqueda',
  placeholder,
  focusOnMount,
  maxLength,
  loading = false,
  loadingMessage = 'Buscando…',
  emptyMessage = 'No hay coincidencias.',
  status,
  feedback,
  leading,
  renderItem,
  fieldClassName,
  resultsClassName,
}: GlobalSearchProps<T>) {
  const message = loading ? loadingMessage : status
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!focusOnMount) return
    // Let the enclosing dialog set its initial focus first.
    const frame = requestAnimationFrame(() => inputRef.current?.focus({ preventScroll: true }))
    return () => cancelAnimationFrame(frame)
  }, [focusOnMount])

  return (
    <Autocomplete inputValue={query} onInputChange={onQueryChange}>
      <TextField
        aria-label={label}
        data-slot="global-search-field"
        className={cn('flex shrink-0 items-center gap-3 border-b px-5 py-3', fieldClassName)}
      >
        {leading}
        <CommandInput
          ref={inputRef}
          maxLength={maxLength}
          placeholder={placeholder}
          className="focus-visible:ring-ring h-10 min-w-0 px-0 focus-visible:ring-2 focus-visible:ring-inset"
        />
      </TextField>
      <div
        data-slot="global-search-results"
        className={cn('max-h-[min(60svh,28rem)] min-h-0 overflow-y-auto p-2', resultsClassName)}
      >
        <output
          className={cn(message ? 'text-muted-foreground block px-3 py-2 text-xs' : 'sr-only')}
        >
          {message}
        </output>
        <CommandList
          aria-label={resultsLabel}
          className="max-h-none overflow-visible"
          items={items}
          renderEmptyState={() =>
            loading ? null : (
              <div className="text-muted-foreground px-4 py-10 text-center text-sm">
                {emptyMessage}
              </div>
            )
          }
        >
          {(item) => (
            <CommandItem id={item.id} textValue={item.title} onAction={() => onAction(item)}>
              {(state) => (renderItem ? renderItem(item, state) : item.title)}
            </CommandItem>
          )}
        </CommandList>
        {feedback}
      </div>
    </Autocomplete>
  )
}
