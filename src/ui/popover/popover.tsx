import type * as React from 'react'
import {
  DialogTrigger as AriaDialogTrigger,
  Popover as AriaPopover,
  type DialogTriggerProps,
  type PopoverProps as AriaPopoverProps,
} from 'react-aria-components'

import { cn } from '../../lib/cn'
import { Button, type ButtonProps } from '../button/button'

export type PopoverContentProps = Omit<AriaPopoverProps, 'className' | 'trigger'> & {
  className?: string
}
export type { DialogTriggerProps as PopoverTriggerProps }

/** Wrap a trigger and Popover surface; React Aria handles focus and positioning. */
export const PopoverTrigger = AriaDialogTrigger

/** Floating content positioned and focus-managed by {@link PopoverTrigger}. */
export function PopoverContent({ className, ...props }: PopoverContentProps) {
  return (
    <AriaPopover
      data-slot="popover"
      offset={6}
      className={cn(
        'z-50 min-w-48 rounded-xl border border-border bg-background p-1.5 text-foreground shadow-lg outline-none motion-safe:data-entering:animate-ui-surface-in motion-safe:data-exiting:animate-ui-surface-out',
        className,
      )}
      {...props}
    />
  )
}

type PopoverTriggerStateProps = Pick<DialogTriggerProps, 'defaultOpen' | 'isOpen' | 'onOpenChange'>

type SimplePopoverProps = PopoverContentProps &
  PopoverTriggerStateProps & {
    /** Text for a default button, or an interactive element that opens the popover. */
    trigger: string | React.ReactElement
    /** Props for the default button rendered when {@link trigger} is text. */
    triggerProps?: Omit<ButtonProps, 'children'>
    children: React.ReactNode
  }

export type PopoverProps = PopoverContentProps | SimplePopoverProps

/**
 * A contextual surface with a simple trigger API.
 * Omit {@link trigger} and use {@link PopoverTrigger} plus {@link PopoverContent} for advanced composition.
 */
export function Popover(props: PopoverProps) {
  if (!('trigger' in props)) return <PopoverContent {...props} />

  const { children, trigger, triggerProps, defaultOpen, isOpen, onOpenChange, ...contentProps } =
    props
  const triggerElement =
    typeof trigger === 'string' ? <Button {...triggerProps}>{trigger}</Button> : trigger

  return (
    <PopoverTrigger defaultOpen={defaultOpen} isOpen={isOpen} onOpenChange={onOpenChange}>
      {triggerElement}
      <PopoverContent {...contentProps}>{children}</PopoverContent>
    </PopoverTrigger>
  )
}
