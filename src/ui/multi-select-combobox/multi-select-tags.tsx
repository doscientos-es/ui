import { XIcon } from 'lucide-react'
import { useState } from 'react'
import {
  Tag,
  TagGroup,
  TagList,
  type ComboBoxValueRenderProps,
  type Key,
} from 'react-aria-components'

import { Button } from '../button/button'

export type SelectionItem<T> = { id: Key; label: string; item: T }

/** Keep the labels of selected results when a remote search replaces the collection. */
export function MultiSelectTags<T>({
  selectedItems,
  state,
  locked,
  isDisabled,
  selectedLabel,
  removeLabel,
}: ComboBoxValueRenderProps<SelectionItem<T>> & {
  locked?: boolean
  isDisabled?: boolean
  selectedLabel: string
  removeLabel: string
}) {
  const [cache, setCache] = useState(() => new Map<Key, SelectionItem<T>>())
  const keys = Array.isArray(state.value) ? state.value : []
  const current = new Map(
    selectedItems.filter((item) => item !== null).map((item) => [item.id, item]),
  )
  const next = new Map<Key, SelectionItem<T>>()
  for (const key of keys) {
    const item = current.get(key) ?? cache.get(key)
    if (item) next.set(key, item)
  }
  if (next.size !== cache.size || [...next].some(([key, item]) => cache.get(key) !== item))
    setCache(next)
  const visible = [...next.values()]
  return (
    <TagGroup
      aria-label={selectedLabel}
      onRemove={
        locked ? undefined : (removed) => state.setValue(keys.filter((key) => !removed.has(key)))
      }
    >
      <TagList items={visible} className="flex flex-wrap gap-1.5 empty:hidden">
        {(option) => (
          <Tag
            id={option.id}
            textValue={option.label}
            isDisabled={isDisabled}
            className="bg-muted text-foreground data-focus-visible:ring-ring/50 flex min-w-0 items-center gap-1 rounded-md py-1 pr-1 pl-2 text-sm outline-none data-disabled:opacity-50 data-focus-visible:ring-3"
          >
            <span className="min-w-0 wrap-break-word">{option.label}</span>
            {!locked && (
              <Button
                slot="remove"
                variant="ghost"
                size="icon-sm"
                className="[@media(pointer:coarse)]:min-h-11 [@media(pointer:coarse)]:min-w-11"
                aria-label={removeLabel}
              >
                <XIcon aria-hidden="true" />
              </Button>
            )}
          </Tag>
        )}
      </TagList>
    </TagGroup>
  )
}
