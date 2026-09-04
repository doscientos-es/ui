'use client'

import { XIcon } from 'lucide-react'
import type * as React from 'react'
import {
  Dialog as DrawerPrimitive,
  type DialogProps as DrawerPrimitiveProps,
  DialogTrigger as DrawerTriggerPrimitive,
  type DialogTriggerProps as DrawerTriggerPrimitiveProps,
  Heading,
  ModalOverlay as ModalOverlayPrimitive,
  type ModalOverlayProps as ModalOverlayPrimitiveProps,
  Modal as ModalPrimitive,
  Text,
} from 'react-aria-components'

import { cn } from '../../lib/cn'
import { Button, type ButtonProps } from '../button/button'

function DrawerTrigger({ ...props }: DrawerTriggerPrimitiveProps) {
  return <DrawerTriggerPrimitive data-slot="drawer-trigger" {...props} />
}

function DrawerClose({ className, variant = 'outline', size = 'default', ...props }: ButtonProps) {
  return (
    <Button
      slot="close"
      data-slot="drawer-close"
      variant={variant}
      size={size}
      className={cn(className)}
      {...props}
    />
  )
}

function DrawerOverlay({
  className,
  children,
  ...props
}: Omit<ModalOverlayPrimitiveProps, 'className' | 'children'> & {
  className?: string
  children: React.ReactNode
}) {
  return (
    <ModalOverlayPrimitive
      data-slot="drawer-overlay"
      isDismissable
      className={cn(
        'fixed inset-0 z-50 bg-black/10 motion-safe:transition-opacity motion-safe:duration-150 motion-safe:data-entering:opacity-0 motion-safe:data-exiting:opacity-0 motion-reduce:transition-none supports-backdrop-filter:backdrop-blur-xs',
        className,
      )}
      {...props}
    >
      {children}
    </ModalOverlayPrimitive>
  )
}

/** Props for a controlled drawer panel. */
export type DrawerContentProps = Omit<ModalOverlayPrimitiveProps, 'className' | 'children'> &
  Pick<React.ComponentProps<typeof ModalPrimitive>, 'isDismissable'> & {
    className?: string
    /** Props applied to the accessible dialog inside the drawer panel. */
    dialogProps?: Omit<DrawerPrimitiveProps, 'children' | 'className'>
    children: React.ReactNode
    side?: 'top' | 'right' | 'bottom' | 'left'
    showCloseButton?: boolean
  }

/** Dismissable, controlled modal panel that slides in from a screen edge. */
function DrawerContent({
  className,
  children,
  dialogProps,
  side = 'right',
  showCloseButton = true,
  ...props
}: DrawerContentProps) {
  return (
    <DrawerOverlay {...props}>
      <ModalPrimitive
        data-slot="drawer-content"
        data-side={side}
        className={cn(
          'fixed z-50 flex max-h-svh flex-col gap-4 border-border bg-popover bg-clip-padding text-sm text-popover-foreground shadow-lg motion-safe:transition motion-safe:duration-200 motion-safe:ease-in-out motion-safe:data-entering:opacity-0 motion-safe:data-exiting:opacity-0 motion-reduce:transition-none data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=bottom]:pb-[env(safe-area-inset-bottom)] motion-safe:data-[side=bottom]:data-entering:translate-y-10 motion-safe:data-[side=bottom]:data-exiting:translate-y-10 data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r motion-safe:data-[side=left]:data-entering:-translate-x-10 motion-safe:data-[side=left]:data-exiting:-translate-x-10 data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l motion-safe:data-[side=right]:data-entering:translate-x-10 motion-safe:data-[side=right]:data-exiting:translate-x-10 data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=top]:pt-[env(safe-area-inset-top)] motion-safe:data-[side=top]:data-entering:-translate-y-10 motion-safe:data-[side=top]:data-exiting:-translate-y-10 data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm',
          className,
        )}
      >
        <DrawerPrimitive
          data-slot="drawer"
          className="[display:inherit] h-full max-h-[inherit] [flex-direction:inherit] gap-[inherit] outline-none"
          {...dialogProps}
        >
          {children}
          {showCloseButton && (
            <DrawerClose variant="ghost" className="absolute top-3 right-3" size="icon-sm">
              <XIcon />
              <span className="sr-only">Cerrar</span>
            </DrawerClose>
          )}
        </DrawerPrimitive>
      </ModalPrimitive>
    </DrawerOverlay>
  )
}

type TriggerDrawerProps = DrawerContentProps &
  Pick<DrawerTriggerPrimitiveProps, 'defaultOpen' | 'isOpen' | 'onOpenChange'> & {
    /** Text for a default button, or an interactive element that opens the drawer. */
    trigger: string | React.ReactElement
    /** Props for the default button rendered when {@link trigger} is text. */
    triggerProps?: Omit<ButtonProps, 'children'>
  }

/** Props for a controlled drawer or a drawer with a simple trigger. */
export type DrawerProps = DrawerContentProps | TriggerDrawerProps

/**
 * A dismissable modal panel. Pass `trigger` for a simple trigger API, or control it with `isOpen`.
 * Use {@link DrawerTrigger} plus {@link DrawerContent} for advanced composition.
 */
function Drawer(props: DrawerProps) {
  if (!('trigger' in props)) return <DrawerContent {...props} />

  const { children, trigger, triggerProps, defaultOpen, isOpen, onOpenChange, ...contentProps } =
    props
  const triggerElement =
    typeof trigger === 'string' ? <Button {...triggerProps}>{trigger}</Button> : trigger

  return (
    <DrawerTrigger defaultOpen={defaultOpen} isOpen={isOpen} onOpenChange={onOpenChange}>
      {triggerElement}
      <DrawerContent {...contentProps}>{children}</DrawerContent>
    </DrawerTrigger>
  )
}

function DrawerHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="drawer-header"
      className={cn('flex flex-col gap-0.5 p-4', className)}
      {...props}
    />
  )
}

function DrawerFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn('mt-auto flex flex-col gap-2 p-4', className)}
      {...props}
    />
  )
}

function DrawerTitle({ className, ...props }: Omit<React.ComponentProps<typeof Heading>, 'slot'>) {
  return (
    <Heading
      slot="title"
      data-slot="drawer-title"
      className={cn('text-base font-medium text-foreground', className)}
      {...props}
    />
  )
}

function DrawerDescription({
  className,
  ...props
}: Omit<React.ComponentProps<typeof Text>, 'slot'>) {
  return (
    <Text
      slot="description"
      data-slot="drawer-description"
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}

/** @deprecated Use {@link DrawerContent}. */
const Sheet = DrawerContent
/** @deprecated Use {@link DrawerPrimitiveProps}. */
type SheetPrimitiveProps = DrawerPrimitiveProps
/** @deprecated Use {@link DrawerClose}. */
const SheetClose = DrawerClose
/** @deprecated Use {@link DrawerContent}. */
const SheetContent = DrawerContent
/** @deprecated Use {@link DrawerDescription}. */
const SheetDescription = DrawerDescription
/** @deprecated Use {@link DrawerFooter}. */
const SheetFooter = DrawerFooter
/** @deprecated Use {@link DrawerHeader}. */
const SheetHeader = DrawerHeader
/** @deprecated Use {@link DrawerTitle}. */
const SheetTitle = DrawerTitle
/** @deprecated Use {@link DrawerTrigger}. */
const SheetTrigger = DrawerTrigger
/** @deprecated Use {@link DrawerTriggerPrimitiveProps}. */
type SheetTriggerPrimitiveProps = DrawerTriggerPrimitiveProps

export {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  type DrawerPrimitiveProps,
  type DrawerTriggerPrimitiveProps,
  type SheetPrimitiveProps,
  type SheetTriggerPrimitiveProps,
}
