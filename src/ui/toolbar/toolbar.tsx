import type * as React from 'react'

import { cn } from '../../lib/cn'

export type ToolbarProps = React.ComponentProps<'div'> & {
  /** Visual treatment for standalone or surface-integrated controls. */
  variant?: 'plain' | 'surface' | 'attached'
}

/** Groups related actions with the toolbar semantic role. */
export function Toolbar({ className, variant = 'plain', ...props }: ToolbarProps) {
  return (
    <div
      role="toolbar"
      data-slot="toolbar"
      data-variant={variant}
      className={cn(
        'flex flex-wrap items-center gap-2',
        variant === 'surface' &&
          'rounded-xl border border-border/80 bg-card p-2 shadow-[var(--ui-shadow-hairline)]',
        variant === 'attached' && 'border-y border-border/70 bg-surface-subtle px-4 py-2.5',
        className,
      )}
      {...props}
    />
  )
}
export function ToolbarGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="toolbar-group"
      className={cn('flex items-center gap-2', className)}
      {...props}
    />
  )
}
export function ToolbarSpacer({ className, ...props }: React.ComponentProps<'div'>) {
  return <div aria-hidden="true" className={cn('hidden flex-1 sm:block', className)} {...props} />
}
