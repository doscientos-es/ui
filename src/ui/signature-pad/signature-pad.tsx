'use client'

import { Eraser, PenLine } from 'lucide-react'
import { useId } from 'react'

import { cn } from '../../lib/cn'
import { Button } from '../button/button'
import type { SignatureValue } from './signature-data'
import { SignatureInk } from './signature-ink'
import { useSignaturePad } from './use-signature-pad'

// Keep the SVG exporter available from the signature-pad package entrypoint.
// oxlint-disable-next-line react/only-export-components
export { signatureToSvg } from './signature-data'
export type { SignaturePoint, SignatureValue } from './signature-data'

export type SignaturePadProps = {
  /** Controlled drawing. Use null to clear it. */
  value?: SignatureValue | null
  /** Initial drawing when used without value. */
  defaultValue?: SignatureValue | null
  /** Called as the drawing changes and with null when cleared. */
  onChange?: (value: SignatureValue | null) => void
  disabled?: boolean
  label?: string
  description?: string
  clearLabel?: string
  emptyLabel?: string
  signedLabel?: string
  className?: string
}

/** Captures a handwritten mark. Consent, identity verification and storage belong to the application. */
export function SignaturePad({
  value,
  defaultValue,
  onChange,
  disabled = false,
  label = 'Firma',
  description = 'Firma con el dedo, un lápiz o el ratón. Si no puedes dibujar, solicita una alternativa.',
  clearLabel = 'Borrar firma',
  emptyLabel = 'Firma aquí',
  signedLabel = 'Firma dibujada',
  className,
}: SignaturePadProps) {
  const labelId = useId()
  const descriptionId = useId()
  const { strokes, clear, handlers } = useSignaturePad({ value, defaultValue, onChange, disabled })
  const hasInk = strokes.some((stroke) => stroke.length > 0)

  return (
    <div data-slot="signature-pad" className={cn('text-foreground grid w-full gap-3', className)}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-sm font-medium" id={labelId}>
          <PenLine aria-hidden="true" className="text-muted-foreground size-4" />
          {label}
        </div>
        <Button variant="outline" size="sm" onPress={clear} isDisabled={disabled || !hasInk}>
          <Eraser aria-hidden="true" />
          {clearLabel}
        </Button>
      </div>
      <fieldset
        aria-labelledby={labelId}
        aria-describedby={descriptionId}
        aria-disabled={disabled || undefined}
        data-slot="signature-pad-surface"
        className={cn(
          'border-border bg-card relative m-0 aspect-[5/2] w-full min-w-0 touch-none overflow-hidden rounded-xl border border-dashed p-0 select-none',
          disabled ? 'cursor-not-allowed opacity-60' : 'cursor-crosshair',
        )}
        {...handlers}
      >
        <div
          aria-hidden="true"
          className="border-border pointer-events-none absolute inset-x-[8%] bottom-[22%] border-b"
        />
        {!hasInk && (
          <div
            aria-hidden="true"
            className="text-muted-foreground pointer-events-none absolute inset-x-0 bottom-[8%] text-center text-xs"
          >
            {emptyLabel}
          </div>
        )}
        <SignatureInk strokes={strokes} />
      </fieldset>
      <p
        id={descriptionId}
        data-slot="signature-pad-description"
        className="text-muted-foreground text-sm"
      >
        {description}
      </p>
      <span className="sr-only" aria-live="polite">
        {hasInk ? signedLabel : ''}
      </span>
    </div>
  )
}
