import type { ReactNode } from 'react'

import { Button, LinkButton, type ButtonProps, type LinkButtonProps } from '../button/button'
import { Tooltip } from '../tooltip/tooltip'

type IconButtonBaseProps = {
  /** Accessible name and text shown in the tooltip. */
  label: string
  children?: ReactNode
}

/** Props for an icon-only action. Pass `href` to render it as a link instead of a button. */
export type IconButtonProps =
  | (Omit<ButtonProps, 'children'> & IconButtonBaseProps & { href?: undefined })
  | (Omit<LinkButtonProps, 'children'> & IconButtonBaseProps & { href: string })

/** A consistently sized icon-only action with an accessible tooltip. */
export function IconButton(props: IconButtonProps) {
  if (props.href !== undefined) {
    const { label, children, size = 'icon', ...linkProps } = props
    return (
      <Tooltip label={label}>
        <LinkButton data-slot="icon-button" aria-label={label} size={size} {...linkProps}>
          {children}
        </LinkButton>
      </Tooltip>
    )
  }

  const { label, children, size = 'icon', href: _href, ...buttonProps } = props
  return (
    <Tooltip label={label}>
      <Button data-slot="icon-button" aria-label={label} size={size} {...buttonProps}>
        {children}
      </Button>
    </Tooltip>
  )
}
