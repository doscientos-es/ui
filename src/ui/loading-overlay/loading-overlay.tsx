import { LoaderCircle } from 'lucide-react'
import type * as React from 'react'

import { cn } from '../../lib/cn'

/** Busy overlay that keeps the loading state available to assistive technology. */
export function LoadingOverlay({
  label = 'Cargando',
  className,
  ...props
}: React.ComponentProps<'output'> & { label?: string }) {
  return (
    <output
      aria-live="polite"
      className={cn(
        'absolute inset-0 z-10 flex items-center justify-center bg-background/70 backdrop-blur-[2px]',
        className,
      )}
      {...props}
    >
      <div className="border-border bg-background flex items-center gap-2 rounded-lg border px-3 py-2 text-sm shadow-sm">
        <LoaderCircle className="animate-spin" aria-hidden="true" />
        <span>{label}</span>
      </div>
    </output>
  )
}
