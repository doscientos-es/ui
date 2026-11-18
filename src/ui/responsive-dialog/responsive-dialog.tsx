'use client'

import { type ReactElement, useState } from 'react'

import { useMobileViewport } from '../../hooks/use-mobile-viewport'
import { BottomSheet, type BottomSheetProps } from '../bottom-sheet/bottom-sheet'
import {
  DialogContent,
  type DialogContentProps,
  DialogRoot,
  type DialogRootProps,
  DialogTrigger,
  type DialogTriggerProps,
} from '../dialog/dialog'
import { useDialogContext } from '../dialog/dialog-context'

type ResponsiveDialogSurfaceProps = Pick<
  BottomSheetProps,
  | 'title'
  | 'description'
  | 'headerClassName'
  | 'children'
  | 'className'
  | 'closeLabel'
  | 'expandLabel'
  | 'peekHeight'
  | 'preventDismissal'
  | 'showCloseButton'
> &
  Pick<DialogContentProps, 'size'>

export type ResponsiveDialogProps = ResponsiveDialogSurfaceProps &
  Omit<DialogRootProps, 'children'> & {
    /** Text for the default button, or an interactive element. Omit for programmatic opening. */
    trigger?: string | ReactElement
    triggerProps?: Omit<DialogTriggerProps, 'asChild' | 'children'>
  }

/** Centered dialog on desktop, draggable bottom sheet below `md`. Chosen on each opening. */
export function ResponsiveDialog({
  open,
  defaultOpen,
  onOpenChange,
  trigger,
  triggerProps,
  ...surfaceProps
}: ResponsiveDialogProps) {
  return (
    <DialogRoot open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {trigger !== undefined && (
        <DialogTrigger {...triggerProps} asChild={typeof trigger !== 'string'}>
          {trigger}
        </DialogTrigger>
      )}
      <ResponsiveDialogSurface {...surfaceProps} />
    </DialogRoot>
  )
}

function ResponsiveDialogSurface({
  title,
  description,
  headerClassName,
  children,
  className,
  closeLabel = 'Cerrar',
  expandLabel,
  peekHeight,
  preventDismissal = false,
  showCloseButton,
  size,
}: ResponsiveDialogSurfaceProps) {
  const { open, setOpen } = useDialogContext()
  const viewport = useMobileViewport()
  const [presentation, setPresentation] = useState<{ mobile: boolean; open: boolean } | null>(null)

  // Keep the last surface on close so resizing cannot interrupt the sheet's exit animation.
  if (open && !presentation?.open && viewport !== null) {
    setPresentation({ mobile: viewport, open: true })
  } else if (!open && presentation?.open) {
    setPresentation({ ...presentation, open: false })
  }

  if (presentation === null) return null

  if (presentation.mobile) {
    return (
      <BottomSheet
        open={open}
        onOpenChange={setOpen}
        title={title}
        description={description}
        headerClassName={headerClassName}
        className={className}
        closeLabel={closeLabel}
        expandLabel={expandLabel}
        peekHeight={peekHeight}
        preventDismissal={preventDismissal}
        showCloseButton={showCloseButton}
      >
        {children}
      </BottomSheet>
    )
  }

  return (
    <DialogContent
      title={title}
      description={description}
      headerClassName={headerClassName}
      className={className}
      closeLabel={closeLabel}
      isDismissable={!preventDismissal}
      isKeyboardDismissDisabled={preventDismissal}
      showCloseButton={showCloseButton}
      size={size}
    >
      {children}
    </DialogContent>
  )
}
