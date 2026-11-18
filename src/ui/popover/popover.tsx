'use client'

import type * as React from 'react'
import { useState } from 'react'
import {
  Dialog as AriaDialog,
  DialogTrigger as AriaDialogTrigger,
  composeRenderProps,
  Popover as AriaPopover,
  type PopoverProps as AriaPopoverProps,
  type DialogTriggerProps,
} from 'react-aria-components'

import { cn } from '../../lib/cn'
import { floatingSurfaceClassName } from '../../lib/floating-surface'
import { type OpenStateProps, resolveOpen } from '../../lib/open-state'
import { Button, type ButtonProps } from '../button/button'
import { OverlayHeader, type OverlayHeaderProps } from '../overlay-header'
import { hasOverlayHeaderContent, OverlayDescriptionContext } from '../overlay-header-shared'

export type PopoverContentProps = Omit<AriaPopoverProps, 'className' | 'trigger' | 'title'> &
  OverlayHeaderProps & {
    className?: string
  }

/** Props for {@link PopoverTrigger}. */
export type PopoverTriggerProps = Omit<
  DialogTriggerProps,
  'isOpen' | 'defaultOpen' | 'onOpenChange'
> &
  OpenStateProps

/** Wrap a trigger and Popover surface; React Aria handles focus and positioning. */
export function PopoverTrigger({ open, isOpen, ...props }: PopoverTriggerProps) {
  return <AriaDialogTrigger isOpen={resolveOpen({ open, isOpen })} {...props} />
}

/** Floating content. A title or description opts into a dialog with a built-in header. */
export function PopoverContent({
  className,
  title,
  description,
  headerClassName,
  children,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
  ...props
}: PopoverContentProps) {
  const [descriptionId, setDescriptionId] = useState<string>()
  const hasHeader = hasOverlayHeaderContent(title) || hasOverlayHeaderContent(description)
  const labelingProps = {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
  }

  return (
    <AriaPopover
      data-slot="popover"
      offset={6}
      className={cn(
        floatingSurfaceClassName,
        'border-border bg-background text-foreground min-w-48 rounded-xl border p-1.5',
        className,
      )}
      {...(!hasHeader && labelingProps)}
      {...props}
    >
      {hasHeader
        ? composeRenderProps(children, (content) => (
            <AriaDialog
              data-slot="popover-dialog"
              className="grid min-w-0 gap-3 p-2 text-sm outline-none"
              {...labelingProps}
              aria-describedby={ariaDescribedBy ?? descriptionId}
            >
              <OverlayDescriptionContext.Provider value={setDescriptionId}>
                <OverlayHeader
                  slotPrefix="popover"
                  title={title}
                  description={description}
                  headerClassName={headerClassName}
                />
                {content}
              </OverlayDescriptionContext.Provider>
            </AriaDialog>
          ))
        : children}
    </AriaPopover>
  )
}

type SimplePopoverProps = PopoverContentProps &
  OpenStateProps & {
    /** Text for a default button, or an interactive element that opens the popover. */
    trigger: string | React.ReactElement
    /** Props for the default button rendered when {@link trigger} is text. */
    triggerProps?: Omit<ButtonProps, 'children'>
  }

export type PopoverProps = PopoverContentProps | SimplePopoverProps

/**
 * A contextual surface with a simple trigger API.
 * Omit {@link trigger} and use {@link PopoverTrigger} plus {@link PopoverContent} for advanced composition.
 */
export function Popover(props: PopoverProps) {
  if (!('trigger' in props)) return <PopoverContent {...props} />

  const {
    children,
    trigger,
    triggerProps,
    defaultOpen,
    open,
    isOpen,
    onOpenChange,
    ...contentProps
  } = props
  const triggerElement =
    typeof trigger === 'string' ? <Button {...triggerProps}>{trigger}</Button> : trigger

  return (
    <PopoverTrigger
      defaultOpen={defaultOpen}
      open={resolveOpen({ open, isOpen })}
      onOpenChange={onOpenChange}
    >
      {triggerElement}
      <PopoverContent {...contentProps}>{children}</PopoverContent>
    </PopoverTrigger>
  )
}
