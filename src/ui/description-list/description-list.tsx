import type * as React from 'react'

import { cn } from '../../lib/cn'

/** Responsive semantic list for read-only record details. */
export function DescriptionList({ className, ...props }: React.ComponentProps<'dl'>) {
  return (
    <dl
      data-slot="description-list"
      className={cn('grid gap-x-6 gap-y-4 sm:grid-cols-2', className)}
      {...props}
    />
  )
}
export function DescriptionItem({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="description-item" className={cn('min-w-0', className)} {...props} />
}
export function DescriptionTerm({ className, ...props }: React.ComponentProps<'dt'>) {
  return (
    <dt
      data-slot="description-term"
      className={cn('text-xs font-medium text-muted-foreground', className)}
      {...props}
    />
  )
}
export function DescriptionDetails({ className, ...props }: React.ComponentProps<'dd'>) {
  return (
    <dd
      data-slot="description-details"
      className={cn('mt-1 wrap-break-word text-sm', className)}
      {...props}
    />
  )
}
