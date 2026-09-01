import { useEffect, type ReactNode } from 'react'
import { sileo, Toaster as SileoToaster } from 'sileo'

import { toast } from './toast-store'

export type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info'
export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'
export type ToastAction = { label: string; onPress: () => void }
export type ToastOptions = {
  title: string
  description?: string
  variant?: ToastVariant
  duration?: number
  position?: ToastPosition
  action?: ToastAction
}
export type ToastData = ToastOptions & { id: string; state: 'open' | 'closing' }
export function ToastProvider({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Toaster />
    </>
  )
}

/** Viewport that renders notifications created with {@link toast}. */
export function Toaster({ position }: { position?: ToastPosition }) {
  return <SileoToaster position={position} options={{ fill: 'var(--ui-secondary)' }} />
}

export function ToastViewport({
  position,
  visiblePosition,
  className,
}: {
  position: ToastPosition
  visiblePosition?: ToastPosition
  className?: string
}) {
  void className
  if (visiblePosition && visiblePosition !== position) return null
  return <Toaster position={position} />
}

export function Toast({
  id,
  title,
  description,
  variant = 'default',
  action,
  state,
  duration = 0,
  position,
  onDismiss,
}: ToastData & { onDismiss?: () => void }) {
  useEffect(() => {
    if (state !== 'open') return
    const toastId = toast({ title, description, variant, action, duration, position })
    return () => {
      sileo.dismiss(toastId)
      onDismiss?.()
    }
  }, [action, description, duration, id, onDismiss, position, state, title, variant])
  return null
}
