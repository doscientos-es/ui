import { cva, type VariantProps } from 'class-variance-authority'
import type * as React from 'react'
import { Link, type LinkProps } from 'react-aria-components'

import { cn } from '../../lib/cn'

export const badgeVariants = cva(
  'inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 [&>svg]:pointer-events-none [&>svg]:size-3',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        neutral: 'bg-muted text-muted-foreground',
        success: 'bg-success/10 text-success',
        warning: 'bg-warning/10 text-warning',
        info: 'bg-info/10 text-info',
        danger: 'bg-destructive/10 text-destructive',
        destructive: 'bg-destructive text-destructive-foreground',
        outline: 'border border-border text-foreground',
        ghost: 'text-foreground hover:bg-muted',
        link: 'text-primary underline-offset-4 hover:underline',
      },
    },
    defaultVariants: { variant: 'default' },
  },
)

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
