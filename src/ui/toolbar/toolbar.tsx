import type * as React from 'react'

import { cn } from '../../lib/cn'
/** Groups related actions with the toolbar semantic role. */
export function Toolbar({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      role="toolbar"
      data-slot="toolbar"
      className={cn('flex flex-wrap items-center gap-2', className)}
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
