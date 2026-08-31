'use client'

import type * as React from 'react'
import {
  OverlayArrow,
  Tooltip as TooltipPrimitive,
  TooltipTrigger as TooltipTriggerPrimitive,
} from 'react-aria-components'

import { cn } from '../../lib/cn'

/** Couples a focusable trigger with its {@link TooltipContent} content. */
export function TooltipTrigger({
  delay = 0,
  ...props
}: React.ComponentProps<typeof TooltipTriggerPrimitive>) {
  return <TooltipTriggerPrimitive data-slot="tooltip-trigger" delay={delay} {...props} />
}

type TooltipSurfaceProps = Omit<
  React.ComponentProps<typeof TooltipPrimitive>,
  'children' | 'className'
> & { className?: string }

export type TooltipProps = TooltipSurfaceProps & {
  /** Contextual text or rich content shown when the trigger is focused or hovered. */
  label: React.ReactNode
  /** The single focusable element that reveals the tooltip. */
  children: React.ReactNode
  /** Delay before revealing the tooltip. */
  delay?: React.ComponentProps<typeof TooltipTriggerPrimitive>['delay']
}

/**
 * Brief contextual information for a focusable child.
 * Do not use it as the child's only accessible label or as essential content.
 */
export function Tooltip({ label, children, delay, ...props }: TooltipProps) {
  return (
    <TooltipTrigger delay={delay}>
      {children}
      <TooltipContent {...props}>{label}</TooltipContent>
    </TooltipTrigger>
  )
}

/**
 * Brief contextual information revealed from a {@link TooltipTrigger}.
 * Do not use it as the only label or as essential content.
 */
export function TooltipContent({
  className,
  placement = 'top',
  offset = 4,
  crossOffset = 0,
  children,
  ...props
}: TooltipSurfaceProps & {
  children?: React.ReactNode
}) {
  return (
    <TooltipPrimitive
      data-slot="tooltip-content"
      placement={placement}
      offset={offset}
      crossOffset={crossOffset}
      className={cn(
        'z-50 inline-flex w-fit max-w-xs origin-(--trigger-anchor-point) items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-xs text-background shadow-md outline-none motion-safe:data-entering:animate-ui-surface-in motion-safe:data-exiting:animate-ui-surface-out has-data-[slot=kbd]:pr-1.5 **:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-50 **:data-[slot=kbd]:rounded-sm',
        className,
      )}
      {...props}
    >
      {children}
      <OverlayArrow
        className="bg-foreground fill-foreground z-50 size-2.5 translate-y-[calc(-50%-2px)] rotate-45 rounded-xs"
        style={({ placement, defaultStyle }) => ({
          ...defaultStyle,
          rotate: '0deg',
          translate: '0 0',
          transform:
            placement === 'bottom'
              ? 'translate(-50%, calc(50% + 2px)) rotate(45deg)'
              : placement === 'top'
                ? 'translate(-50%, calc(-50% - 2px)) rotate(45deg)'
                : placement === 'left'
                  ? 'translate(calc(-50% - 2px), -50%) rotate(45deg)'
                  : 'translate(calc(50% + 2px), -50%) rotate(45deg)',
        })}
      />
    </TooltipPrimitive>
  )
}
