import type { VariantProps } from 'class-variance-authority'
import type * as React from 'react'
import { Link, type LinkProps } from 'react-aria-components'

import { cn } from '../../lib/cn'
import { badgeVariants } from './badge-variants'

export type BadgeProps = React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & {
    /** Visual intent for a compact status or category label. */
    variant?: VariantProps<typeof badgeVariants>['variant']
  }

/** Compact label for statuses, categories and small counts. */
export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span
      data-slot="badge"
      data-variant={variant ?? 'default'}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export type BadgeLinkProps = Omit<LinkProps, 'className'> &
  VariantProps<typeof badgeVariants> & { className?: string }

export function BadgeLink({ className, variant, ...props }: BadgeLinkProps) {
  return (
    <Link
      data-slot="badge"
      data-variant={variant ?? 'default'}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}
