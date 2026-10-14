'use client'

import {
  Radio,
  RadioGroup,
  composeRenderProps,
  type RadioGroupProps,
  type RadioProps,
} from 'react-aria-components'

import { cn } from '../../lib/cn'

export type SegmentedControlProps = RadioGroupProps
export type SegmentedControlItemProps = RadioProps

/** One choice among a few options. Use Tabs instead when selecting associated panels. */
export function SegmentedControl({
  className,
  orientation = 'horizontal',
  ...props
}: SegmentedControlProps) {
  return (
    <RadioGroup
      {...props}
      orientation={orientation}
      data-slot="segmented-control"
      className={composeRenderProps(className, (value) =>
        cn(
          'inline-flex w-fit max-w-full flex-wrap gap-1 rounded-lg bg-muted p-1 text-muted-foreground data-[orientation=vertical]:flex-col',
          value,
        ),
      )}
    />
  )
}

/** Accessible radio segment with roving keyboard focus and native form values. */
export function SegmentedControlItem({ className, ...props }: SegmentedControlItemProps) {
  return (
    <Radio
      {...props}
      data-slot="segmented-control-item"
      className={composeRenderProps(className, (value) =>
        cn(
          'inline-flex min-h-9 min-w-0 cursor-pointer items-center justify-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium outline-none transition-colors data-hovered:text-foreground data-selected:bg-background data-selected:text-foreground data-selected:shadow-sm data-focus-visible:ring-3 data-focus-visible:ring-ring/50 data-disabled:cursor-not-allowed data-disabled:opacity-50 data-readonly:cursor-default [@media(pointer:coarse)]:min-h-11 [&_svg]:size-4 [&_svg]:shrink-0',
          value,
        ),
      )}
    />
  )
}