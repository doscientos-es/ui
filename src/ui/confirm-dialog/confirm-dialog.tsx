import type * as React from 'react'

import { AlertDialog, AlertDialogFooter } from '../alert-dialog/alert-dialog'
import { Button } from '../button/button'

/* oxlint-disable jsx-a11y/no-autofocus -- Focus the safe action inside a focus-managed confirmation modal, not on page load. */

export type ConfirmDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: React.ReactNode
  confirmLabel?: string
  cancelLabel?: string
  destructive?: boolean
  pending?: boolean
  onConfirm: () => void
}

/** Controlled confirmation dialog for irreversible actions. */
export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  destructive = false,
  pending = false,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <AlertDialog
      open={open}
      title={title}
      description={description}
      onOpenChange={(nextOpen) => {
        if (!pending || nextOpen) onOpenChange(nextOpen)
      }}
    >
      <AlertDialogFooter>
        <Button
          variant="outline"
          autoFocus
          isDisabled={pending}
          onPress={() => onOpenChange(false)}
        >
          {cancelLabel}
        </Button>
        <Button
          variant={destructive ? 'destructive' : 'default'}
          isPending={pending}
          onPress={onConfirm}
        >
          {confirmLabel}
        </Button>
      </AlertDialogFooter>
    </AlertDialog>
  )
}
