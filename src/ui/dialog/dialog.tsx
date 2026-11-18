'use client'

import { XIcon } from 'lucide-react'
import * as React from 'react'
import {
  Dialog as AriaDialog,
  Modal,
  ModalOverlay,
  type ModalOverlayProps,
} from 'react-aria-components'

import { cn } from '../../lib/cn'
import { Button } from '../button/button'
import {
  OverlayDescription,
  OverlayHeader,
  type OverlayHeaderProps,
  OverlayTitle,
} from '../overlay-header'
import { OverlayDescriptionContext, overlayHeaderClassName } from '../overlay-header-shared'
import { DialogContext, useDialogContext } from './dialog-context'

type SlottableProps = React.HTMLAttributes<HTMLElement> & { 'data-slot'?: string }

const dialogSizes = {
  sm: 'max-w-[24rem]',
  md: 'max-w-[32rem]',
  lg: 'max-w-[42rem]',
  xl: 'max-w-[56rem]',
  full: 'max-w-none',
} as const

export type DialogSize = keyof typeof dialogSizes

/** Props for a controlled or uncontrolled dialog state container. */
export type DialogRootProps = {
  children: React.ReactNode
  /** Initial state when the dialog is uncontrolled. */
  defaultOpen?: boolean
  /** Called after the open state changes. */
  onOpenChange?: (open: boolean) => void
  /** Controlled open state. Use with {@link onOpenChange}. */
  open?: boolean
}

/** Coordinates the trigger, overlay and content of a modal dialog. */
export function DialogRoot({
  children,
  defaultOpen = false,
  onOpenChange,
  open: controlledOpen,
}: DialogRootProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const open = controlledOpen ?? uncontrolledOpen
  const setOpen = React.useCallback(
    (nextOpen: boolean) => {
      if (controlledOpen === undefined) setUncontrolledOpen(nextOpen)
      onOpenChange?.(nextOpen)
    },
    [controlledOpen, onOpenChange],
  )

  return <DialogContext.Provider value={{ open, setOpen }}>{children}</DialogContext.Provider>
}

export type DialogTriggerProps = Omit<React.ComponentProps<typeof Button>, 'onPress'> & {
  /** Renders and augments the single child instead of rendering a {@link Button}. */
  asChild?: boolean
}

/** Opens the parent {@link Dialog} or {@link DialogRoot}. */
export function DialogTrigger({
  asChild = false,
  children,
  onClick,
  ...props
}: DialogTriggerProps) {
  const { open, setOpen } = useDialogContext()
  const handleClick: React.MouseEventHandler<HTMLElement> = (event) => {
    onClick?.(event as React.MouseEvent<HTMLButtonElement>)
    if (!event.defaultPrevented) setOpen(true)
  }

  if (asChild && React.isValidElement<SlottableProps>(children)) {
    const child = children as React.ReactElement<SlottableProps>
    return React.cloneElement(child, {
      ...(props as React.HTMLAttributes<HTMLElement>),
      'data-slot': 'dialog-trigger',
      'aria-haspopup': 'dialog',
      'aria-expanded': open,
      onClick: (event: React.MouseEvent<HTMLElement>) => {
        child.props.onClick?.(event)
        handleClick(event)
      },
    })
  }

  return (
    <Button
      data-slot="dialog-trigger"
      aria-haspopup="dialog"
      aria-expanded={open}
      onClick={onClick}
      onPress={() => setOpen(true)}
      {...props}
    >
      {children}
    </Button>
  )
}

/** Groups dialog content rendered in the overlay layer. */
export function DialogPortal({ children }: { children?: React.ReactNode }) {
  return <>{children}</>
}

type DialogOverlayProps = Omit<
  ModalOverlayProps,
  'children' | 'className' | 'isOpen' | 'onOpenChange'
> & {
  children?: React.ReactNode
  className?: string
}

/** Dismissable backdrop displayed while the parent {@link Dialog} is open. */
export function DialogOverlay({ children, className, ...props }: DialogOverlayProps) {
  const { open, setOpen } = useDialogContext()
  if (!open) return null

  return (
    <ModalOverlay
      data-slot="dialog-overlay"
      isDismissable
      isOpen={open}
      onOpenChange={setOpen}
      className={cn(
        'motion-safe:data-entering:animate-ui-overlay-in motion-safe:data-exiting:animate-ui-overlay-out fixed inset-0 isolate z-50 box-border grid h-dvh min-h-0 place-items-center overflow-hidden bg-black/20 p-4 supports-backdrop-filter:backdrop-blur-xs',
        className,
      )}
      {...props}
    >
      {children}
    </ModalOverlay>
  )
}

export type DialogContentProps = Omit<
  React.ComponentProps<typeof AriaDialog>,
  'children' | 'className' | 'title'
> &
  OverlayHeaderProps & {
    children?: React.ReactNode
    className?: string
    contentSlot?: string
    /** Whether pressing outside the panel dismisses it. Escape remains available. */
    isDismissable?: boolean
    /** Prevents Escape dismissal, for example while saving. */
    isKeyboardDismissDisabled?: boolean
    onOverlayClick?: React.MouseEventHandler<HTMLDivElement>
    overlaySlot?: string
    showCloseButton?: boolean
    /** Accessible label for the close button. */
    closeLabel?: string
    /** Comfortable form width by default; larger surfaces are opt-in. */
    size?: DialogSize
  }

type SimpleDialogProps = DialogRootProps &
  Omit<DialogContentProps, 'children'> & {
    /** Text for a default button, or an interactive element that opens the dialog. */
    trigger: string | React.ReactElement
    /** Props for the default button rendered when {@link trigger} is text. */
    triggerProps?: Omit<DialogTriggerProps, 'asChild' | 'children'>
  }

type StandaloneDialogProps = DialogRootProps &
  Omit<DialogContentProps, 'children'> &
  ({ title: React.ReactNode } | { description: React.ReactNode }) & {
    trigger?: never
    triggerProps?: never
  }

export type DialogProps = DialogRootProps | SimpleDialogProps | StandaloneDialogProps

/**
 * A modal dialog with a trigger, or a standalone dialog when given a title/description.
 * For advanced composition, use {@link DialogRoot}, {@link DialogTrigger} and {@link DialogContent}.
 */
export function Dialog(props: DialogProps) {
  if (!('trigger' in props) && !('title' in props) && !('description' in props)) {
    return <DialogRoot {...props} />
  }

  const { children, trigger, triggerProps, defaultOpen, onOpenChange, open, ...contentProps } =
    props

  return (
    <DialogRoot defaultOpen={defaultOpen} onOpenChange={onOpenChange} open={open}>
      {trigger !== undefined && (
        <DialogTrigger {...triggerProps} asChild={typeof trigger !== 'string'}>
          {trigger}
        </DialogTrigger>
      )}
      <DialogContent {...contentProps}>{children}</DialogContent>
    </DialogRoot>
  )
}

/** Focus-managed modal content. Give it a title prop or compose a {@link DialogTitle}. */
export function DialogContent({
  children,
  className,
  closeLabel = 'Cerrar diálogo',
  contentSlot = 'dialog-content',
  description,
  headerClassName,
  isDismissable = true,
  isKeyboardDismissDisabled = false,
  onOverlayClick,
  overlaySlot = 'dialog-overlay',
  showCloseButton = true,
  size = 'md',
  title,
  ...props
}: DialogContentProps) {
  const { setOpen } = useDialogContext()
  const [descriptionId, setDescriptionId] = React.useState<string>()

  return (
    <DialogPortal>
      <DialogOverlay
        data-slot={overlaySlot}
        isDismissable={isDismissable}
        isKeyboardDismissDisabled={isKeyboardDismissDisabled}
        onClick={(event) => {
          if (event.target === event.currentTarget) onOverlayClick?.(event)
        }}
      >
        <Modal
          className="motion-safe:data-entering:animate-ui-surface-in motion-safe:data-exiting:animate-ui-surface-out max-h-full min-h-0 w-full"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              if (isDismissable) setOpen(false)
              onOverlayClick?.(event)
            }
          }}
        >
          <AriaDialog
            data-slot={contentSlot}
            data-size={size}
            data-close-button={showCloseButton || undefined}
            aria-describedby={descriptionId}
            className={cn(
              'bg-popover text-popover-foreground ring-foreground/10 relative mx-auto box-border grid max-h-[calc(100dvh-2rem)] min-h-0 w-full min-w-0 gap-5 overflow-x-hidden overflow-y-auto overscroll-contain rounded-xl p-6 text-sm shadow-[var(--ui-shadow-floating)] ring-1 outline-none [&[data-close-button]_[data-slot=dialog-title]]:pr-10',
              dialogSizes[size],
              className,
            )}
            {...props}
          >
            <OverlayDescriptionContext.Provider value={setDescriptionId}>
              <OverlayHeader
                slotPrefix="dialog"
                title={title}
                description={description}
                headerClassName={cn(
                  showCloseButton && '[&>[data-slot=dialog-description]]:pr-10',
                  headerClassName,
                )}
              />
              {children}
            </OverlayDescriptionContext.Provider>
            {showCloseButton ? (
              <Button
                aria-label={closeLabel}
                data-slot="dialog-close"
                variant="ghost"
                className="absolute top-3 right-3"
                size="icon"
                onPress={() => setOpen(false)}
              >
                <XIcon aria-hidden="true" />
              </Button>
            ) : null}
          </AriaDialog>
        </Modal>
      </DialogOverlay>
    </DialogPortal>
  )
}

type DialogCloseProps = Omit<React.ComponentProps<typeof Button>, 'onPress'> & {
  /** Renders and augments the single child instead of rendering a {@link Button}. */
  asChild?: boolean
}

/** Closes the parent {@link Dialog}. */
export function DialogClose({ asChild = false, children, onClick, ...props }: DialogCloseProps) {
  const { setOpen } = useDialogContext()
  if (asChild && React.isValidElement<SlottableProps>(children)) {
    const child = children as React.ReactElement<SlottableProps>
    return React.cloneElement(child, {
      ...(props as React.HTMLAttributes<HTMLElement>),
      'data-slot': 'dialog-close',
      onClick: (event: React.MouseEvent<HTMLElement>) => {
        child.props.onClick?.(event)
        onClick?.(event)
        if (!event.defaultPrevented) setOpen(false)
      },
    })
  }

  return (
    <Button data-slot="dialog-close" onClick={onClick} onPress={() => setOpen(false)} {...props}>
      {children}
    </Button>
  )
}

/** Groups the title and description at the top of a dialog. */
export function DialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="dialog-header" className={cn(overlayHeaderClassName, className)} {...props} />
  )
}

/** Groups dialog actions and can add a secondary close action. */
export function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<'div'> & { showCloseButton?: boolean }) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        'border-border bg-surface-subtle -mx-6 -mb-6 flex flex-col-reverse gap-2 rounded-b-xl border-t p-6 sm:flex-row sm:flex-wrap sm:justify-end',
        className,
      )}
      {...props}
    >
      {showCloseButton ? <DialogClose variant="outline">Cerrar</DialogClose> : null}
      {children}
    </div>
  )
}

/** Title used to give the parent {@link DialogContent} an accessible name. */
export function DialogTitle(props: React.ComponentProps<typeof OverlayTitle>) {
  return <OverlayTitle data-slot="dialog-title" {...props} />
}

/** Supporting text announced alongside the parent {@link DialogTitle}. */
export function DialogDescription(props: React.ComponentProps<typeof OverlayDescription>) {
  return <OverlayDescription data-slot="dialog-description" {...props} />
}
