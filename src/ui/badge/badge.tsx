import type { VariantProps } from 'class-variance-authority'
import { AlertTriangle, Check, Clock3, Info } from 'lucide-react'
import type * as React from 'react'
import { Link, type LinkProps } from 'react-aria-components'

import { cn } from '../../lib/cn'
import { badgeVariants } from './badge-variants'

type BadgeIconProps = {
  /** Omit for the variant's default icon. Pass an element to replace it, or false/null to hide it. Icons are decorative; keep the status in the label. */
  icon?: React.ReactNode
}

const statusIcons = {
  success: Check,
  warning: Clock3,
  info: Info,
  danger: AlertTriangle,
  destructive: AlertTriangle,
}

function BadgeIcon({ icon, variant }: BadgeIconProps & VariantProps<typeof badgeVariants>) {
  const DefaultIcon =
    variant && variant in statusIcons ? statusIcons[variant as keyof typeof statusIcons] : undefined
  const content = icon === undefined ? DefaultIcon ? <DefaultIcon /> : null : icon

  if (content === null || content === undefined || typeof content === 'boolean') return null

  return (
    <span
      data-slot="badge-icon"
      aria-hidden="true"
      className="pointer-events-none inline-flex size-3.5 shrink-0 items-center justify-center [&>svg]:size-full"
    >
      {content}
    </span>
  )
}

export type BadgeProps = React.ComponentProps<'span'> &
  BadgeIconProps &
  VariantProps<typeof badgeVariants> & {
    /** Visual intent for a compact status or category label. */
    variant?: VariantProps<typeof badgeVariants>['variant']
  }

/** Compact label for statuses, categories and small counts. */
export function Badge({ className, variant, icon, children, ...props }: BadgeProps) {
  return (
    <span
      data-slot="badge"
      data-variant={variant ?? 'default'}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    >
      <BadgeIcon icon={icon} variant={variant} />
      {children}
    </span>
  )
}

export type BadgeLinkProps = Omit<LinkProps, 'className'> &
  BadgeIconProps &
  VariantProps<typeof badgeVariants> & { className?: string }

export function BadgeLink({ className, variant, icon, children, ...props }: BadgeLinkProps) {
  return (
    <Link
      data-slot="badge"
      data-variant={variant ?? 'default'}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    >
      {(state) => (
        <>
          <BadgeIcon icon={icon} variant={variant} />
          {typeof children === 'function' ? children(state) : children}
        </>
      )}
    </Link>
  )
}
