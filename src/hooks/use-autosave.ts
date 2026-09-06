import { useCallback, useEffect, useRef, useState } from 'react'

export type AutosaveStatus = 'idle' | 'saving' | 'saved' | 'error'

export type UseAutosaveOptions<T> = {
  data: T
  onSave: (data: T) => Promise<void>
  debounceMs?: number
  enabled?: boolean
  serialize?: (data: T) => string
}

/** Debounced, serialized writes. saveNow flushes the debounce; errors remain in state. */
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
  const queue = useRef<Promise<void>>(Promise.resolve())
  const queuedCount = useRef(0)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const mounted = useRef(true)

  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
      clearTimeout(timeoutRef.current)
    }
  }, [])

  useEffect(() => {
    saveRef.current = onSave
    serializeRef.current = serialize
  }, [onSave, serialize])

  const save = useCallback((value: T, force = false) => {
    clearTimeout(timeoutRef.current)
    const saveId = ++latestSaveId.current
    const snapshot = serializeRef.current(value)
    const write = saveRef.current
    queuedCount.current += 1
    setStatus('saving')
    setError(null)
    const pending = queue.current.then(async () => {
      try {
        if (!mounted.current) return
        if (force || lastSaved.current !== snapshot) await write(value)
        lastSaved.current = snapshot
        if (mounted.current && saveId === latestSaveId.current) setStatus('saved')
      } catch (cause) {
        if (!mounted.current || saveId !== latestSaveId.current) return
        setError(cause instanceof Error ? cause : new Error('No se pudo guardar.'))
        setStatus('error')
      } finally {
        queuedCount.current -= 1
      }
    })
    queue.current = pending
    return pending
  }, [])

  useEffect(() => {
    if (!enabled) return
    const snapshot = serializeRef.current(data)
    if (lastSaved.current === null) {
      lastSaved.current = snapshot
      return
    }
    if (snapshot === lastSaved.current && queuedCount.current === 0) return
    timeoutRef.current = setTimeout(() => void save(data), debounceMs)
    return () => clearTimeout(timeoutRef.current)
  }, [data, debounceMs, enabled, save])

  return { status, error, saveNow: () => save(data, true) }
}
