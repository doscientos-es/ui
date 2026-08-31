import type { ReactNode } from 'react'
import { Link } from 'react-aria-components'

import { cn } from '../../lib/cn'
import { Button, type ButtonProps, buttonVariants } from '../button/button'
import { Tooltip, TooltipTrigger } from '../tooltip/tooltip'

export type IconButtonProps = Omit<ButtonProps, 'children'> & {
  /** Accessible name and text shown in the tooltip. */
  label: string
  /** Optional href for rendering the action as an accessible link. */
  href?: string
  children?: ReactNode
}

/** A consistently sized icon-only action with an accessible tooltip. */
export function IconButton({
  label,
  children,
  href,
  className,
  variant,
  ...props
}: IconButtonProps) {
  const linkClassName = cn(buttonVariants({ variant, size: 'icon' }), className)

  return (
    <TooltipTrigger>
      {href ? (
        <Link data-slot="icon-button" aria-label={label} href={href} className={linkClassName}>
          {children}
        </Link>
      ) : (
        <Button
          data-slot="icon-button"
          aria-label={label}
          variant={variant}
          size="icon"
          className={className}
          {...props}
        >
          {children}
        </Button>
      )}
      <Tooltip>{label}</Tooltip>
    </TooltipTrigger>
  )
}
