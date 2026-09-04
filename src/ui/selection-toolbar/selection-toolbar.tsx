import type * as React from 'react'

import { cn } from '../../lib/cn'

/** Announces the selected item count and displays application-owned bulk actions. */
export function SelectionToolbar({
  count,
  className,
  children,
  ...props
}: React.ComponentProps<'div'> & { count: number }) {
  return (
    <div
      data-slot="selection-toolbar"
      className={cn(
        'flex flex-wrap items-center justify-between gap-2 rounded-lg border bg-muted/40 p-2',
        className,
      )}
      {...props}
    >
      <output aria-live="polite" className="text-sm font-medium">
        {count} seleccionados
      </output>
      <div className="flex items-center gap-2">{children}</div>
    </div>
  )
}
