import { useCallback, useRef, useState } from 'react'

export type AsyncActionStatus = 'idle' | 'pending' | 'success' | 'error'

/**
 * Runs one async action at a time and exposes its lifecycle to UI components.
 * `run` resolves to `null` if another call is pending or the action fails; inspect `error` for failures.
 */
export function useAsyncAction<Args extends unknown[], Result>(
  action: (...args: Args) => Promise<Result>,
) {
  const [status, setStatus] = useState<AsyncActionStatus>('idle')
  const [error, setError] = useState<Error | null>(null)
  const [data, setData] = useState<Result | null>(null)
  const pendingRef = useRef(false)

  const run = useCallback(
    async (...args: Args) => {
      if (pendingRef.current) return null
      pendingRef.current = true
      setStatus('pending')
      setError(null)
      try {
        const result = await action(...args)
        setData(result)
        setStatus('success')
        return result
      } catch (cause) {
        setError(cause instanceof Error ? cause : new Error('La acción no se pudo completar.'))
        setStatus('error')
        return null
      } finally {
        pendingRef.current = false
      }
    },
    [action],
  )

  const reset = useCallback(() => {
    setData(null)
    setError(null)
    setStatus('idle')
  }, [])

  return { data, error, isPending: status === 'pending', reset, run, status }
}
