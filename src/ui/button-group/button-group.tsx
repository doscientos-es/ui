import type { VariantProps } from 'class-variance-authority'
import type * as React from 'react'

import { cn } from '../../lib/cn'
import { Separator } from '../separator/separator'
import { buttonGroupVariants } from './button-group-variants'

/** Groups adjacent actions into a single connected control. */
function ButtonGroup({
  className,
  orientation,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof buttonGroupVariants>) {
  return (
    // biome-ignore lint/a11y/useSemanticElements: fieldset would impose form semantics on a generic action group.
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(buttonGroupVariants({ orientation }), className)}
      {...props}
    />
  )
}

function ButtonGroupText({
  className,
  render,
  ...props
}: React.ComponentProps<'div'> & {
  render?: (props: React.HTMLAttributes<HTMLElement>) => React.ReactNode
}) {
  if (render) {
    const renderProps = {
      'data-slot': 'button-group-text',
      className: cn(
        "flex items-center gap-2 rounded-lg border border-border bg-muted px-2.5 text-sm font-medium [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className,
      ),
      ...props,
    }

    return render(renderProps)
  }

  return (
    <div
      data-slot="button-group-text"
      className={cn(
        "flex items-center gap-2 rounded-lg border border-border bg-muted px-2.5 text-sm font-medium [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  )
}

function ButtonGroupSeparator({
  className,
  orientation = 'vertical',
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      className={cn(
        'relative self-stretch bg-input data-horizontal:mx-px data-horizontal:w-auto data-vertical:my-px data-vertical:h-auto',
        className,
      )}
      {...props}
    />
  )
}

export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText }
