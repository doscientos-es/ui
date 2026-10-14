'use client'

import type { ComponentProps, FormEventHandler, ReactNode } from 'react'

import { cn } from '../../lib/cn'
import { Button } from '../button/button'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  type DialogSize,
} from '../dialog/dialog'
import { SubmitButton } from '../submit-button/submit-button'

export type FormDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: ReactNode
  children: ReactNode
  /** Receives the native form event after preventDefault; the app owns saving and closing. */
  onSubmit: FormEventHandler<HTMLFormElement>
  submitLabel?: string
  cancelLabel?: string
  loadingLabel?: string
  /** Blocks submission and every dismissal path while the app is saving. */
  loading?: boolean
  submitDisabled?: boolean
  size?: DialogSize
  className?: string
  /** Layout belongs to the fields, not the dialog; defaults to a single column. */
  bodyClassName?: string
  /** Outside dismissal is opt-in to avoid losing edits accidentally. */
  isDismissable?: boolean
  /** Native attributes and ref for validation, FormData and dirty tracking. */
  formProps?: Omit<ComponentProps<'form'>, 'children' | 'onSubmit' | 'action'>
}

/** Controlled create/edit surface composed from Dialog and SubmitButton. */
export function FormDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  onSubmit,
  submitLabel = 'Guardar',
  cancelLabel = 'Cancelar',
  loadingLabel,
  loading = false,
  submitDisabled = false,
  size = 'md',
  className,
  bodyClassName,
  isDismissable = false,
  formProps,
}: FormDialogProps) {
  return (
    <DialogRoot
      open={open}
      onOpenChange={(nextOpen) => {
        if (!loading || nextOpen) onOpenChange(nextOpen)
      }}
    >
      <DialogContent
        size={size}
        className={className}
        isDismissable={isDismissable && !loading}
        isKeyboardDismissDisabled={loading}
        showCloseButton={!loading}
      >
        <form
          {...formProps}
          data-slot="form-dialog"
          aria-busy={loading || undefined}
          className={cn('grid gap-5', formProps?.className)}
          onSubmit={(event) => {
            event.preventDefault()
            if (!loading && !submitDisabled) onSubmit(event)
          }}
        >
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
          <div data-slot="form-dialog-body" className={cn('grid gap-4', bodyClassName)}>
            {children}
          </div>
          <DialogFooter>
            <Button variant="outline" isDisabled={loading} onPress={() => onOpenChange(false)}>
              {cancelLabel}
            </Button>
            <SubmitButton
              size="default"
              loading={loading}
              loadingLabel={loadingLabel}
              isDisabled={submitDisabled}
            >
              {submitLabel}
            </SubmitButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </DialogRoot>
  )
}
