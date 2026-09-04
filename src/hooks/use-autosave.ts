import { useCallback, useEffect, useRef, useState } from 'react'

export type AutosaveStatus = 'idle' | 'saving' | 'saved' | 'error'

export type UseAutosaveOptions<T> = {
  data: T
  onSave: (data: T) => Promise<void>
  debounceMs?: number
  enabled?: boolean
  serialize?: (data: T) => string
}

/** Debounced autosave with stale-value protection and an explicit `saveNow`. */
export function useAutosave<T>({
  data,
  onSave,
  debounceMs = 1_000,
  enabled = true,
  serialize = JSON.stringify,
}: UseAutosaveOptions<T>) {
  const [status, setStatus] = useState<AutosaveStatus>('idle')
  const [error, setError] = useState<Error | null>(null)
  const lastSaved = useRef<string | null>(null)
  const saveRef = useRef(onSave)
  const serializeRef = useRef(serialize)
  const latestSaveId = useRef(0)

  useEffect(() => {
    saveRef.current = onSave
    serializeRef.current = serialize
  }, [onSave, serialize])

  const save = useCallback(async (value: T) => {
    const saveId = ++latestSaveId.current
    setStatus('saving')
    setError(null)
    try {
      await saveRef.current(value)
      if (saveId !== latestSaveId.current) return
      lastSaved.current = serializeRef.current(value)
      setStatus('saved')
    } catch (cause) {
      if (saveId !== latestSaveId.current) return
      setError(cause instanceof Error ? cause : new Error('No se pudo guardar.'))
      setStatus('error')
    }
  }, [])

  useEffect(() => {
    if (!enabled) return
    const snapshot = serializeRef.current(data)
    if (lastSaved.current === null) {
      lastSaved.current = snapshot
      return
    }
    if (snapshot === lastSaved.current) return
    const timeout = window.setTimeout(() => void save(data), debounceMs)
    return () => window.clearTimeout(timeout)
  }, [data, debounceMs, enabled, save])

  return { status, error, saveNow: () => save(data) }
}
