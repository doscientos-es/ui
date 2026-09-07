import type * as React from 'react'
import { Link as AriaLink, composeRenderProps } from 'react-aria-components'

import { cn } from '../../lib/cn'

export type MobileNavigationProps = React.ComponentProps<'nav'> & {
  /** Keeps the navigation visible at the bottom of its nearest scrolling container. */
  sticky?: boolean
}

/** Bottom navigation landmark optimized for compact application layouts. */
export function MobileNavigation({
  'aria-label': ariaLabel = 'Navegación principal',
  className,
  sticky = true,
  children,
  ...props
}: MobileNavigationProps) {
  return (
    <nav
      data-slot="mobile-navigation"
      data-sticky={sticky || undefined}
      aria-label={ariaLabel}
      className={cn(
        'z-40 w-full border-t border-border/80 bg-background/95 pb-[env(safe-area-inset-bottom)] text-foreground shadow-[0_-8px_24px_rgb(0_0_0/0.08)] backdrop-blur-xl supports-backdrop-filter:bg-background/80',
        sticky && 'sticky bottom-0',
        className,
      )}
      {...props}
    >
      <div data-slot="mobile-navigation-list" className="flex min-h-16 w-full items-stretch px-1">
        {children}
      </div>
    </nav>
  )
}

export type MobileNavigationItemProps = Omit<React.ComponentProps<typeof AriaLink>, 'children'> & {
  /** Icon displayed above the item label. Decorative SVG icons are hidden automatically. */
  icon: React.ReactNode
  /** Short visible label that also contributes to the link's accessible name. */
  label: React.ReactNode
  /** Marks this destination as the current page. */
  active?: boolean
}

/** An equally sized destination within a {@link MobileNavigation}. */
export function MobileNavigationItem({
  active = false,
  className,
  icon,
  label,
  ...props
}: MobileNavigationItemProps) {
  return (
    <AriaLink
      data-slot="mobile-navigation-item"
      data-active={active || undefined}
      aria-current={active ? 'page' : undefined}
      className={composeRenderProps(className, (value) =>
        cn(
          'group relative flex min-w-0 flex-1 select-none flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-2 text-muted-foreground outline-none transition-[color,background-color,transform] duration-200 data-hovered:bg-muted/70 data-hovered:text-foreground data-pressed:scale-[0.98] data-focus-visible:ring-2 data-focus-visible:ring-ring/60 data-disabled:pointer-events-none data-disabled:opacity-45 data-[active=true]:text-primary',
          value,
        ),
      )}
      {...props}
    >
      <span
        data-slot="mobile-navigation-icon"
        aria-hidden="true"
        className="group-data-[active=true]:bg-primary/10 group-data-[active=true]:text-primary flex h-7 min-w-10 items-center justify-center rounded-full px-2 transition-[color,background-color,transform] duration-200 group-data-hovered:scale-105 [&_svg]:size-5 [&_svg]:shrink-0"
      >
        {icon}
      </span>
      <span
        data-slot="mobile-navigation-label"
        className="max-w-full truncate text-[0.6875rem] leading-4 font-medium tracking-[0.01em] group-data-[active=true]:font-semibold"
      >
        {label}
      </span>
    </AriaLink>
  )
}
