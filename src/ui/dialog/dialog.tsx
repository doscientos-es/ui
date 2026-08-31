'use client'

import { XIcon } from 'lucide-react'
import * as React from 'react'
import {
  Dialog as AriaDialog,
  Heading,
  Modal,
  ModalOverlay,
  type ModalOverlayProps,
  Text,
} from 'react-aria-components'

import { cn } from '../../lib/cn'
import { Button } from '../button/button'

type DialogContextValue = { open: boolean; setOpen: (open: boolean) => void }
type SlottableProps = React.HTMLAttributes<HTMLElement> & { 'data-slot'?: string }
const DialogContext = React.createContext<DialogContextValue | null>(null)

function useDialogContext() {
  const context = React.useContext(DialogContext)
  if (!context) throw new Error('Dialog components must be rendered within Dialog.')
  return context
}

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
  const { setOpen } = useDialogContext()
  const handleClick: React.MouseEventHandler<HTMLElement> = (event) => {
    onClick?.(event as React.MouseEvent<HTMLButtonElement>)
    if (!event.defaultPrevented) setOpen(true)
  }

  if (asChild && React.isValidElement<SlottableProps>(children)) {
    const child = children as React.ReactElement<SlottableProps>
    return React.cloneElement(child, {
      ...(props as React.HTMLAttributes<HTMLElement>),
      'data-slot': 'dialog-trigger',
      onClick: (event: React.MouseEvent<HTMLElement>) => {
        child.props.onClick?.(event)
        handleClick(event)
      },
    })
  }

  return (
    <Button data-slot="dialog-trigger" onPress={() => setOpen(true)} {...props}>
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
        'fixed inset-0 isolate z-50 grid place-items-center bg-black/10 p-4 supports-backdrop-filter:backdrop-blur-xs motion-safe:data-entering:animate-ui-overlay-in motion-safe:data-exiting:animate-ui-overlay-out',
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
  'children' | 'className'
> & {
  children?: React.ReactNode
  className?: string
  contentSlot?: string
  onOverlayClick?: React.MouseEventHandler<HTMLDivElement>
  overlaySlot?: string
  showCloseButton?: boolean
}

type SimpleDialogProps = DialogRootProps &
  Omit<DialogContentProps, 'children'> & {
    /** Text for a default button, or an interactive element that opens the dialog. */
    trigger: string | React.ReactElement
    /** Props for the default button rendered when {@link trigger} is text. */
    triggerProps?: Omit<DialogTriggerProps, 'asChild' | 'children'>
  }

export type DialogProps = DialogRootProps | SimpleDialogProps

/**
 * A modal dialog with a simple trigger API.
 * Omit {@link trigger} and compose {@link DialogRoot}, {@link DialogTrigger} and {@link DialogContent} directly.
 */
export function Dialog(props: DialogProps) {
  if (!('trigger' in props)) return <DialogRoot {...props} />

  const { children, trigger, triggerProps, defaultOpen, onOpenChange, open, ...contentProps } =
    props

  return (
    <DialogRoot defaultOpen={defaultOpen} onOpenChange={onOpenChange} open={open}>
      {typeof trigger === 'string' ? (
        <DialogTrigger {...triggerProps}>{trigger}</DialogTrigger>
      ) : (
        <DialogTrigger asChild {...triggerProps}>
          {trigger}
        </DialogTrigger>
      )}
      <DialogContent {...contentProps}>{children}</DialogContent>
    </DialogRoot>
  )
}

/** Focus-managed modal content. Include a {@link DialogTitle} to give it an accessible name. */
export function DialogContent({
  children,
  className,
  contentSlot = 'dialog-content',
  onOverlayClick,
  overlaySlot = 'dialog-overlay',
  showCloseButton = true,
  ...props
}: DialogContentProps) {
  const { setOpen } = useDialogContext()

  return (
    <DialogPortal>
      <DialogOverlay
        data-slot={overlaySlot}
        onClick={(event) => {
          if (event.target === event.currentTarget) onOverlayClick?.(event)
        }}
      >
        <Modal
          className="motion-safe:data-entering:animate-ui-surface-in motion-safe:data-exiting:animate-ui-surface-out max-h-full min-h-0 w-full"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setOpen(false)
              onOverlayClick?.(event)
            }
          }}
        >
          <AriaDialog
            data-slot={contentSlot}
            className={cn(
              'relative mx-auto grid box-border max-h-full min-h-0 w-full max-w-[calc(100%-2rem)] gap-4 overflow-x-hidden overflow-y-auto rounded-xl bg-background p-4 text-sm text-foreground ring-1 ring-foreground/10 outline-none sm:max-w-sm',
              className,
            )}
            {...props}
          >
            {children}
            {showCloseButton ? (
              <Button
                aria-label="Cerrar diálogo"
                data-slot="dialog-close"
                variant="ghost"
                className="absolute top-2 right-2"
                size="icon-sm"
                onPress={() => setOpen(false)}
              >
                <XIcon />
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
    <Button data-slot="dialog-close" onPress={() => setOpen(false)} {...props}>
      {children}
    </Button>
  )
}

/** Groups the title and description at the top of a dialog. */
export function DialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="dialog-header" className={cn('flex flex-col gap-2', className)} {...props} />
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
        '-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t border-border bg-muted/50 p-4 sm:flex-row sm:flex-wrap sm:justify-end',
        className,
      )}
      {...props}
    >
      {children}
      {showCloseButton ? <DialogClose variant="outline">Cerrar</DialogClose> : null}
    </div>
  )
}

/** Title used to give the parent {@link DialogContent} an accessible name. */
export function DialogTitle({
  className,
  ...props
}: Omit<React.ComponentProps<typeof Heading>, 'slot'>) {
  return (
    <Heading
      slot="title"
      data-slot="dialog-title"
      className={cn('font-heading text-base leading-none font-medium', className)}
      {...props}
    />
  )
}

/** Supporting text announced alongside the parent {@link DialogTitle}. */
export function DialogDescription({
  className,
  ...props
}: Omit<React.ComponentProps<typeof Text>, 'slot'>) {
  return (
    <Text
      slot="description"
      data-slot="dialog-description"
      className={cn(
        'text-sm text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground',
        className,
      )}
      {...props}
    />
  )
}
