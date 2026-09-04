import { Check, Copy } from 'lucide-react'
import type * as React from 'react'

import { useClipboard } from '../../hooks/use-clipboard'
import { Button, type ButtonProps } from '../button/button'

export type CopyButtonProps = Omit<ButtonProps, 'children' | 'onPress'> & {
  value: string
  children?: React.ReactNode
  copiedLabel?: string
  resetMs?: number
  onCopied?: (value: string) => void
  onCopyError?: (error: Error) => void
}

/** Copies a value with accessible success feedback and no dependency on a toast provider. */
export function CopyButton({
  value,
  children,
  copiedLabel = 'Copiado',
  resetMs,
  onCopied,
  onCopyError,
  ...props
}: CopyButtonProps) {
  const { copy, status } = useClipboard({ resetMs, onError: onCopyError })
  const copied = status === 'copied'
  const label = copied ? copiedLabel : (children ?? 'Copiar')

  return (
    <Button
      aria-label={typeof label === 'string' ? label : undefined}
      onPress={async () => {
        if (await copy(value)) onCopied?.(value)
      }}
      {...props}
    >
      {copied ? (
        <Check aria-hidden="true" className="size-3.5" />
      ) : (
        <Copy aria-hidden="true" className="size-3.5" />
      )}
      {label}
    </Button>
  )
}
