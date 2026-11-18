'use client'

import { XIcon } from 'lucide-react'
import type * as React from 'react'
import { useState } from 'react'
import {
  Dialog as DrawerPrimitive,
  type DialogProps as DrawerPrimitiveProps,
  DialogTrigger as DrawerTriggerPrimitive,
  type DialogTriggerProps as DrawerTriggerPrimitiveProps,
  ModalOverlay as ModalOverlayPrimitive,
  type ModalOverlayProps as ModalOverlayPrimitiveProps,
  Modal as ModalPrimitive,
  Pressable,
} from 'react-aria-components'

import { cn } from '../../lib/cn'
import { type OpenStateProps, resolveOpen } from '../../lib/open-state'
import { Button, type ButtonProps } from '../button/button'
import {
  OverlayDescription,
  OverlayHeader,
  type OverlayHeaderProps,
  OverlayTitle,
} from '../overlay-header'
import { OverlayDescriptionContext, overlayHeaderClassName } from '../overlay-header-shared'

/** Props for {@link DrawerTrigger}. */
export type DrawerTriggerProps = Omit<
  DrawerTriggerPrimitiveProps,
  'isOpen' | 'defaultOpen' | 'onOpenChange'
> &
  OpenStateProps

function DrawerTrigger({ open, isOpen, ...props }: DrawerTriggerProps) {
  return (
    <DrawerTriggerPrimitive
      data-slot="drawer-trigger"
      isOpen={resolveOpen({ open, isOpen })}
      {...props}
    />
  )
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
        'fixed inset-0 z-50 bg-black/10 supports-backdrop-filter:backdrop-blur-xs motion-safe:transition-opacity motion-safe:duration-150 motion-safe:data-entering:opacity-0 motion-safe:data-exiting:opacity-0 motion-reduce:transition-none',
        className,
      )}
      {...props}
    >
      {children}
    </ModalOverlayPrimitive>
  )
}

/** Props for a controlled drawer panel. */
export type DrawerContentProps = Omit<
  ModalOverlayPrimitiveProps,
  'className' | 'children' | 'isOpen' | 'defaultOpen' | 'onOpenChange' | 'title'
> &
  OpenStateProps &
  OverlayHeaderProps &
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
  description,
  dialogProps,
  headerClassName,
  side = 'right',
  showCloseButton = true,
  title,
  open,
  isOpen,
  ...props
}: DrawerContentProps) {
  const [descriptionId, setDescriptionId] = useState<string>()

  return (
    <DrawerOverlay isOpen={resolveOpen({ open, isOpen })} {...props}>
      <ModalPrimitive
        data-slot="drawer-content"
        data-side={side}
        data-close-button={showCloseButton || undefined}
        className={cn(
          'border-border bg-popover text-popover-foreground fixed z-50 box-border flex max-h-dvh flex-col gap-4 overflow-hidden bg-clip-padding text-sm shadow-[var(--ui-shadow-floating)] data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=bottom]:pb-[env(safe-area-inset-bottom)] data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:max-w-[24rem] data-[side=left]:border-r data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:max-w-[24rem] data-[side=right]:border-l data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=top]:pt-[env(safe-area-inset-top)] motion-safe:transition motion-safe:duration-200 motion-safe:ease-in-out motion-safe:data-entering:opacity-0 motion-safe:data-exiting:opacity-0 motion-safe:data-[side=bottom]:data-entering:translate-y-10 motion-safe:data-[side=bottom]:data-exiting:translate-y-10 motion-safe:data-[side=left]:data-entering:-translate-x-10 motion-safe:data-[side=left]:data-exiting:-translate-x-10 motion-safe:data-[side=right]:data-entering:translate-x-10 motion-safe:data-[side=right]:data-exiting:translate-x-10 motion-safe:data-[side=top]:data-entering:-translate-y-10 motion-safe:data-[side=top]:data-exiting:-translate-y-10 motion-reduce:transition-none',
          className,
        )}
      >
        <DrawerPrimitive
          data-slot="drawer"
          aria-describedby={descriptionId}
          className="[display:inherit] h-full max-h-[inherit] min-h-0 [flex-direction:inherit] gap-[inherit] overflow-y-auto overscroll-contain outline-none"
          {...dialogProps}
        >
          <OverlayDescriptionContext.Provider value={setDescriptionId}>
            <OverlayHeader
              slotPrefix="drawer"
              title={title}
              description={description}
              headerClassName={cn('shrink-0 p-4', showCloseButton && 'pr-14', headerClassName)}
            />
            {children}
          </OverlayDescriptionContext.Provider>
          {showCloseButton && (
            <DrawerClose variant="ghost" className="absolute top-3 right-3" size="icon">
              <XIcon aria-hidden="true" />
              <span className="sr-only">Cerrar</span>
            </DrawerClose>
          )}
        </DrawerPrimitive>
      </ModalPrimitive>
    </DrawerOverlay>
  )
}

type TriggerDrawerProps = DrawerContentProps & {
  /** Text for a default button, or an interactive element that opens the drawer. */
  trigger: string | React.ReactElement
  /** Props for the default button rendered when {@link trigger} is text. */
  triggerProps?: Omit<ButtonProps, 'children'>
}

/** Props for a controlled drawer or a drawer with a simple trigger. */
export type DrawerProps = DrawerContentProps | TriggerDrawerProps

/**
 * A dismissable modal panel. Pass `trigger` for a simple trigger API, or control it with `open`.
 * Use {@link DrawerTrigger} plus {@link DrawerContent} for advanced composition.
 */
function Drawer(props: DrawerProps) {
  if (!('trigger' in props)) return <DrawerContent {...props} />

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
    typeof trigger === 'string' ? (
      <Button {...triggerProps}>{trigger}</Button>
    ) : (
      <Pressable>{trigger as React.ComponentProps<typeof Pressable>['children']}</Pressable>
    )

  return (
    <DrawerTrigger
      defaultOpen={defaultOpen}
      open={resolveOpen({ open, isOpen })}
      onOpenChange={onOpenChange}
    >
      {triggerElement}
      <DrawerContent {...contentProps}>{children}</DrawerContent>
    </DrawerTrigger>
  )
}

function DrawerHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="drawer-header"
      className={cn(overlayHeaderClassName, 'shrink-0 p-4', className)}
      {...props}
    />
  )
}

function DrawerFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn(
        'border-border bg-surface-subtle mt-auto flex shrink-0 flex-col gap-2 border-t p-4',
        className,
      )}
      {...props}
    />
  )
}

function DrawerTitle({ className, ...props }: React.ComponentProps<typeof OverlayTitle>) {
  return (
    <OverlayTitle
      data-slot="drawer-title"
      className={cn('text-foreground', className)}
      {...props}
    />
  )
}

function DrawerDescription(props: React.ComponentProps<typeof OverlayDescription>) {
  return <OverlayDescription data-slot="drawer-description" {...props} />
}

export {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  type DrawerPrimitiveProps,
  type DrawerTriggerPrimitiveProps,
}
