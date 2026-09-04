import { useCallback, useEffect, useRef, useState } from 'react'

export type ClipboardStatus = 'idle' | 'copied' | 'error'

export function useClipboard({
  resetMs = 1500,
  onError,
}: { resetMs?: number; onError?: (error: Error) => void } = {}) {
  const [status, setStatus] = useState<ClipboardStatus>('idle')
  const [error, setError] = useState<Error | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    },
    [],
  )

  const copy = useCallback(
    async (value: string) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      try {
        if (!navigator.clipboard?.writeText) throw new Error('El portapapeles no está disponible.')
        await navigator.clipboard.writeText(value)
        setError(null)
        setStatus('copied')
        timeoutRef.current = setTimeout(() => setStatus('idle'), resetMs)
        return true
      } catch (cause) {
        const nextError = cause instanceof Error ? cause : new Error('No se pudo copiar.')
        setError(nextError)
        setStatus('error')
        onError?.(nextError)
        return false
      }
    },
    [onError, resetMs],
  )

  return { copy, error, status }
}
