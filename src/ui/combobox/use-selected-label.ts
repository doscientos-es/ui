import { useState } from 'react'
import type { Key } from 'react-aria-components'

/** Remember the selected label when an external result set no longer contains it. */
export function useSelectedLabel<T>(
  items: readonly T[],
  key: Key | null,
  getKey: (item: T) => Key,
  getLabel: (item: T) => string,
) {
  const item = items.find((candidate) => getKey(candidate) === key)
  const [previous, setPrevious] = useState<{ key: Key | null; label?: string }>({ key })
  const label = item ? getLabel(item) : previous.key === key ? previous.label : undefined
  if (previous.key !== key || previous.label !== label) setPrevious({ key, label })
  return label
}
