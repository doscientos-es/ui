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
const DialogDescriptionContext = React.createContext<{
  setDescriptionId: React.Dispatch<React.SetStateAction<string | undefined>>
} | null>(null)

const dialogSizes = {
  sm: 'max-w-[24rem]',
  md: 'max-w-[32rem]',
  lg: 'max-w-[42rem]',
  xl: 'max-w-[56rem]',
  full: 'max-w-none',
} as const

export type DialogSize = keyof typeof dialogSizes

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
        'fixed inset-0 isolate z-50 grid box-border h-dvh min-h-0 place-items-center overflow-hidden bg-black/20 p-4 supports-backdrop-filter:backdrop-blur-xs motion-safe:data-entering:animate-ui-overlay-in motion-safe:data-exiting:animate-ui-overlay-out',
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
  /** Whether pressing outside the panel dismisses it. Escape remains available. */
  isDismissable?: boolean
  /** Prevents Escape dismissal, for example while saving. */
  isKeyboardDismissDisabled?: boolean
  onOverlayClick?: React.MouseEventHandler<HTMLDivElement>
  overlaySlot?: string
  showCloseButton?: boolean
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
  isDismissable = true,
  isKeyboardDismissDisabled = false,
  onOverlayClick,
  overlaySlot = 'dialog-overlay',
  showCloseButton = true,
  size = 'md',
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
              'relative mx-auto grid box-border max-h-[calc(100dvh-2rem)] min-h-0 w-full gap-5 overflow-x-hidden overflow-y-auto overscroll-contain rounded-xl bg-popover p-6 text-sm text-popover-foreground shadow-[var(--ui-shadow-floating)] ring-1 ring-foreground/10 outline-none',
              dialogSizes[size],
              className,
            )}
            {...props}
          >
            <DialogDescriptionContext.Provider value={{ setDescriptionId }}>
              {children}
            </DialogDescriptionContext.Provider>
            {showCloseButton ? (
              <Button
                aria-label="Cerrar diálogo"
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
    <div
      data-slot="dialog-header"
      className={cn('flex min-w-0 flex-col gap-2', className)}
      {...props}
    />
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
        '-mx-6 -mb-6 flex flex-col-reverse gap-2 rounded-b-xl border-t border-border bg-surface-subtle p-6 sm:flex-row sm:flex-wrap sm:justify-end',
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
export function DialogTitle({
  className,
  ...props
}: Omit<React.ComponentProps<typeof Heading>, 'slot'>) {
  return (
    <Heading
      slot="title"
      data-slot="dialog-title"
      className={cn(
        'font-heading text-lg leading-snug font-semibold tracking-tight break-words',
        className,
      )}
      {...props}
    />
  )
}

/** Supporting text announced alongside the parent {@link DialogTitle}. */
export function DialogDescription({
  className,
  id,
  ...props
}: Omit<React.ComponentProps<typeof Text>, 'slot'>) {
  const generatedId = React.useId()
  const descriptionId = id ?? generatedId
  const context = React.useContext(DialogDescriptionContext)
  const setDescriptionId = context?.setDescriptionId

  React.useEffect(() => {
    setDescriptionId?.(descriptionId)
    return () => setDescriptionId?.((current) => (current === descriptionId ? undefined : current))
  }, [descriptionId, setDescriptionId])

  return (
    <Text
      slot="description"
      id={descriptionId}
      data-slot="dialog-description"
      className={cn(
        'text-sm leading-relaxed break-words text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground',
        className,
      )}
      {...props}
    />
  )
}
