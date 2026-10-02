import { LoaderCircle } from 'lucide-react'
import type * as React from 'react'

import { cn } from '../../lib/cn'

/** Props for {@link LoadingOverlay}. */
export type LoadingOverlayProps = React.ComponentProps<'output'> & {
  /** Text announced to assistive technology and shown beside the spinner. */
  label?: string
}

/** Busy overlay that keeps the loading state available to assistive technology. */
export function LoadingOverlay({ label = 'Cargando', className, ...props }: LoadingOverlayProps) {
  return (
    <output
      data-slot="loading-overlay"
      aria-live="polite"
      className={cn(
        'absolute inset-0 z-10 flex items-center justify-center bg-background/70 backdrop-blur-[2px]',
        className,
      )}
      {...props}
    >
      <div className="border-border bg-background flex items-center gap-2 rounded-lg border px-3 py-2 text-sm shadow-sm">
        <LoaderCircle className="motion-safe:animate-spin" aria-hidden="true" />
        <span>{label}</span>
      </div>
    </output>
  )
}
