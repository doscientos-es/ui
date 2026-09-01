import { useCallback, useEffect, useRef, useState } from 'react'

import type { FormFeedbackState } from './form-feedback'

export function useFormFeedback(options?: { successResetMs?: number }) {
  const resetMs = options?.successResetMs ?? 2500
  const [state, setState] = useState<FormFeedbackState>({ status: 'idle' })
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const clearTimer = useCallback(() => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = null
  }, [])
  useEffect(() => () => clearTimer(), [clearTimer])
  const setPending = useCallback(() => {
    clearTimer()
    setState({ status: 'pending' })
  }, [clearTimer])
  const setSuccess = useCallback(
    (message?: string) => {
      clearTimer()
      setState({ status: 'success', message })
      if (resetMs > 0) timer.current = setTimeout(() => setState({ status: 'idle' }), resetMs)
    },
    [clearTimer, resetMs],
  )
  const setError = useCallback(
    (message: string) => {
      clearTimer()
      setState({ status: 'error', message })
    },
    [clearTimer],
  )
  const reset = useCallback(() => {
    clearTimer()
    setState({ status: 'idle' })
  }, [clearTimer])
  return { state, pending: state.status === 'pending', setPending, setSuccess, setError, reset }
}
