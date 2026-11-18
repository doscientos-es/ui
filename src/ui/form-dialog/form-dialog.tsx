'use client'

import {
  type ComponentProps,
  type FormEventHandler,
  type ReactNode,
  useEffect,
  useState,
} from 'react'

import { cn } from '../../lib/cn'
import { Button } from '../button/button'
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog'
import { DialogContent, DialogFooter, DialogRoot, type DialogSize } from '../dialog/dialog'
import { OverlayHeader } from '../overlay-header'
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
  /** Ask before dismissing edits that the application has not saved. */
  isDirty?: boolean
  /** Override the copy used when confirming the dismissal of unsaved edits. */
  discardConfirmation?: {
    title?: string
    description?: ReactNode
    confirmLabel?: string
    cancelLabel?: string
  }
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
  isDirty = false,
  discardConfirmation,
  size = 'md',
  className,
  bodyClassName,
  isDismissable = false,
  formProps,
}: FormDialogProps) {
  const [discardOpen, setDiscardOpen] = useState(false)

  useEffect(() => {
    if (!open || !isDirty || loading) setDiscardOpen(false)
  }, [open, isDirty, loading])

  function requestOpenChange(nextOpen: boolean) {
    if (loading && !nextOpen) return
    if (!nextOpen && isDirty) setDiscardOpen(true)
    else onOpenChange(nextOpen)
  }

  return (
    <>
      <DialogRoot open={open} onOpenChange={requestOpenChange}>
        <DialogContent
          size={size}
          className={cn('grid-rows-[minmax(0,1fr)] gap-0 overflow-hidden p-0', className)}
          isDismissable={isDismissable && !loading}
          isKeyboardDismissDisabled={loading}
          showCloseButton={!loading}
        >
          <form
            {...formProps}
            data-slot="form-dialog"
            aria-busy={loading || undefined}
            className={cn('flex min-h-0 flex-col', formProps?.className)}
            onSubmit={(event) => {
              event.preventDefault()
              if (!loading && !submitDisabled) onSubmit(event)
            }}
          >
            <OverlayHeader
              slotPrefix="dialog"
              title={title}
              description={description}
              headerClassName="shrink-0 px-6 pt-6"
            />
            <div
              data-slot="form-dialog-body"
              className={cn(
                'grid min-h-0 flex-1 gap-4 overflow-y-auto overscroll-contain px-6 py-5',
                bodyClassName,
              )}
            >
              {children}
            </div>
            <DialogFooter className="m-0 shrink-0">
              <Button
                variant="outline"
                isDisabled={loading}
                onPress={() => requestOpenChange(false)}
              >
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
      <ConfirmDialog
        open={open && isDirty && !loading && discardOpen}
        onOpenChange={setDiscardOpen}
        title={discardConfirmation?.title ?? '¿Descartar los cambios?'}
        description={
          discardConfirmation?.description ??
          'Los cambios de este formulario todavía no se han guardado.'
        }
        confirmLabel={discardConfirmation?.confirmLabel ?? 'Descartar cambios'}
        cancelLabel={discardConfirmation?.cancelLabel ?? 'Seguir editando'}
        destructive
        onConfirm={() => {
          if (loading) return
          setDiscardOpen(false)
          onOpenChange(false)
        }}
      />
    </>
  )
}
