import { X } from 'lucide-react'
import type * as React from 'react'
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

const sizeClasses = {
  sm: 'w-[min(calc(100dvw-2rem),24rem)]',
  md: 'w-[min(calc(100dvw-2rem),28rem)]',
  lg: 'w-[min(calc(100dvw-2rem),36rem)]',
} as const

export type ModalDialogProps = Omit<
  ModalOverlayProps,
  'children' | 'className' | 'isOpen' | 'onOpenChange'
> & {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: React.ReactNode
  description?: React.ReactNode
  children?: React.ReactNode
  footer?: React.ReactNode
  size?: keyof typeof sizeClasses
  showCloseButton?: boolean
  className?: string
  footerClassName?: string
}

/**
 * Accessible modal with a consistent title, optional description, body and footer.
 * Its width is self-contained so consumer CSS cannot override it with max-width utilities.
 */
export function ModalDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  size = 'sm',
  showCloseButton = true,
  className,
  footerClassName,
  ...props
}: ModalDialogProps) {
  const layoutClass = children
    ? footer
      ? 'grid-rows-[auto_minmax(0,1fr)_auto]'
      : 'grid-rows-[auto_minmax(0,1fr)]'
    : 'grid-rows-[auto_auto]'

  return (
    <ModalOverlay
      data-slot="modal-dialog-overlay"
      isDismissable
      isOpen={open}
      onOpenChange={onOpenChange}
      className="motion-safe:data-entering:animate-ui-overlay-in motion-safe:data-exiting:animate-ui-overlay-out fixed inset-0 z-50 grid place-items-center bg-black/20 p-4 backdrop-blur-[1px]"
      {...props}
    >
      <Modal
        className={cn(
          'max-h-[calc(100dvh-2rem)] outline-none motion-safe:data-entering:animate-ui-surface-in motion-safe:data-exiting:animate-ui-surface-out',
          sizeClasses[size],
          className,
        )}
      >
        <AriaDialog
          className={cn(
            'grid max-h-[calc(100dvh-2rem)] overflow-hidden rounded-xl bg-background text-foreground shadow-xl outline-none',
            layoutClass,
          )}
        >
          {({ close }) => (
            <>
              <header
                data-slot="modal-dialog-header"
                className="border-border flex items-start gap-3 border-b px-5 py-4"
              >
                <div className="min-w-0 flex-1">
                  <Heading slot="title" className="font-heading text-base leading-none font-medium">
                    {title}
                  </Heading>
                  {description ? (
                    <Text slot="description" className="text-muted-foreground mt-2 text-sm">
                      {description}
                    </Text>
                  ) : null}
                </div>
                {showCloseButton ? (
                  <Button
                    aria-label="Cerrar diálogo"
                    variant="ghost"
                    size="icon"
                    className="-mt-1 -mr-2"
                    onPress={close}
                  >
                    <X aria-hidden="true" className="size-4" />
                  </Button>
                ) : null}
              </header>
              {children ? (
                <div data-slot="modal-dialog-body" className="min-h-0 overflow-y-auto px-5 py-4">
                  {children}
                </div>
              ) : null}
              {footer ? (
                <footer
                  data-slot="modal-dialog-footer"
                  className={cn(
                    'flex flex-col-reverse gap-2 border-t border-border bg-muted/50 px-5 py-4 sm:flex-row sm:flex-wrap sm:justify-end',
                    footerClassName,
                  )}
                >
                  {footer}
                </footer>
              ) : null}
            </>
          )}
        </AriaDialog>
      </Modal>
    </ModalOverlay>
  )
}
