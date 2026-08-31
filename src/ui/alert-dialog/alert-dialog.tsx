import * as React from 'react'
import {
  Dialog as AriaDialog,
  Heading,
  Modal,
  ModalOverlay,
  Text,
  type ModalOverlayProps,
} from 'react-aria-components'

import { cn } from '../../lib/cn'
import { Button } from '../button/button'

type AlertDialogContextValue = { open: boolean; setOpen: (open: boolean) => void }
const AlertDialogContext = React.createContext<AlertDialogContextValue | null>(null)

function useAlertDialogContext() {
  const context = React.useContext(AlertDialogContext)
  if (!context) throw new Error('AlertDialog components must be rendered within AlertDialog.')
  return context
}

export type AlertDialogProps = {
  children: React.ReactNode
  open: boolean
  onOpenChange: (open: boolean) => void
}

/** Controlled, composable confirmation dialog for domain-specific destructive actions. */
export function AlertDialog({ children, open, onOpenChange }: AlertDialogProps) {
  return (
    <AlertDialogContext.Provider value={{ open, setOpen: onOpenChange }}>
      {children}
    </AlertDialogContext.Provider>
  )
}

export function AlertDialogPortal({ children }: { children?: React.ReactNode }) {
  return <>{children}</>
}

export function AlertDialogTrigger({
  children,
  ...props
}: Omit<React.ComponentProps<typeof Button>, 'onPress'>) {
  const { setOpen } = useAlertDialogContext()
  return (
    <Button data-slot="alert-dialog-trigger" onPress={() => setOpen(true)} {...props}>
      {children}
    </Button>
  )
}

export function AlertDialogOverlay({
  className,
  ...props
}: Omit<ModalOverlayProps, 'children' | 'className' | 'isOpen' | 'onOpenChange'> & {
  className?: string
}) {
  const { open, setOpen } = useAlertDialogContext()
  if (!open) return null
  return (
    <ModalOverlay
      data-slot="alert-dialog-overlay"
      isDismissable
      isOpen={open}
      onOpenChange={setOpen}
      className={cn(
        'fixed inset-0 isolate z-50 grid place-items-center bg-black/10 p-4 backdrop-blur-[1px]',
        className,
      )}
      {...props}
    />
  )
}

export function AlertDialogContent({
  className,
  size = 'default',
  children,
}: {
  children?: React.ReactNode
  className?: string
  size?: 'default' | 'sm'
}) {
  const { open, setOpen } = useAlertDialogContext()
  if (!open) return null
  return (
    <AlertDialogPortal>
      <ModalOverlay
        isDismissable
        isOpen={open}
        onOpenChange={setOpen}
        className="fixed inset-0 isolate z-50 grid place-items-center bg-black/10 p-4 backdrop-blur-[1px]"
      >
        <Modal
          className={cn(
            'w-full max-w-[calc(100%-2rem)] outline-none',
            size === 'sm' ? 'sm:max-w-xs' : 'sm:max-w-sm',
            className,
          )}
        >
          <AriaDialog
            role="alertdialog"
            data-slot="alert-dialog-content"
            className="bg-background text-foreground ring-foreground/10 grid gap-4 rounded-xl p-4 text-sm ring-1 outline-none"
          >
            {children}
          </AriaDialog>
        </Modal>
      </ModalOverlay>
    </AlertDialogPortal>
  )
}

export function AlertDialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn('flex flex-col gap-2 text-center sm:text-left', className)}
      {...props}
    />
  )
}

export function AlertDialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        '-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 sm:flex-row sm:justify-end',
        className,
      )}
      {...props}
    />
  )
}

export function AlertDialogTitle({
  className,
  ...props
}: Omit<React.ComponentProps<typeof Heading>, 'slot'>) {
  return (
    <Heading
      slot="title"
      data-slot="alert-dialog-title"
      className={cn('font-heading text-base font-medium', className)}
      {...props}
    />
  )
}

export function AlertDialogDescription({
  className,
  ...props
}: Omit<React.ComponentProps<typeof Text>, 'slot'>) {
  return (
    <Text
      slot="description"
      data-slot="alert-dialog-description"
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}

export function AlertDialogAction({ className, ...props }: React.ComponentProps<typeof Button>) {
  return <Button data-slot="alert-dialog-action" className={cn(className)} {...props} />
}

export function AlertDialogCancel({
  children = 'Cancelar',
  onClick,
  ...props
}: Omit<React.ComponentProps<typeof Button>, 'onPress'>) {
  const { setOpen } = useAlertDialogContext()
  return (
    <Button
      data-slot="alert-dialog-cancel"
      variant="outline"
      onClick={onClick}
      onPress={() => setOpen(false)}
      {...props}
    >
      {children}
    </Button>
  )
}
