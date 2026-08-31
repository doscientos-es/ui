import * as React from 'react'
import { type ModalOverlayProps } from 'react-aria-components'

import { cn } from '../../lib/cn'
import { Button } from '../button/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '../dialog/dialog'

export type AlertDialogProps = {
  children: React.ReactNode
  open: boolean
  onOpenChange: (open: boolean) => void
}

/** Controlled, composable confirmation dialog for domain-specific destructive actions. */
export function AlertDialog({ children, open, onOpenChange }: AlertDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children}
    </Dialog>
  )
}

export function AlertDialogPortal({ children }: { children?: React.ReactNode }) {
  return <DialogPortal>{children}</DialogPortal>
}

export function AlertDialogTrigger({
  children,
  ...props
}: Omit<React.ComponentProps<typeof Button>, 'onPress'>) {
  return (
    <DialogTrigger data-slot="alert-dialog-trigger" {...props}>
      {children}
    </DialogTrigger>
  )
}

export function AlertDialogOverlay({
  className,
  ...props
}: Omit<ModalOverlayProps, 'children' | 'className' | 'isOpen' | 'onOpenChange'> & {
  className?: string
}) {
  return <DialogOverlay data-slot="alert-dialog-overlay" className={className} {...props} />
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
  return (
    <DialogContent
      contentSlot="alert-dialog-content"
      overlaySlot="alert-dialog-overlay"
      role="alertdialog"
      showCloseButton={false}
      className={cn(size === 'sm' ? 'sm:max-w-xs' : 'sm:max-w-sm', className)}
    >
      {children}
    </DialogContent>
  )
}

export function AlertDialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <DialogHeader
      data-slot="alert-dialog-header"
      className={cn('flex flex-col gap-2 text-center sm:text-left', className)}
      {...props}
    />
  )
}

export function AlertDialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return <DialogFooter data-slot="alert-dialog-footer" className={cn(className)} {...props} />
}

export function AlertDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogTitle>) {
  return <DialogTitle data-slot="alert-dialog-title" className={cn(className)} {...props} />
}

export function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogDescription>) {
  return (
    <DialogDescription data-slot="alert-dialog-description" className={cn(className)} {...props} />
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
  return (
    <DialogClose asChild>
      <Button data-slot="alert-dialog-cancel" variant="outline" onClick={onClick} {...props}>
        {children}
      </Button>
    </DialogClose>
  )
}
