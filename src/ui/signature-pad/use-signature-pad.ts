import { useCallback, useEffect, useRef, useState, type PointerEvent } from 'react'

import {
  SIGNATURE_HEIGHT,
  SIGNATURE_WIDTH,
  type SignaturePoint,
  type SignatureValue,
} from './signature-data'

type Options = {
  value?: SignatureValue | null
  defaultValue?: SignatureValue | null
  onChange?: (value: SignatureValue | null) => void
  disabled: boolean
}

const copyStrokes = (value?: SignatureValue | null) =>
  value?.strokes.map((stroke) => stroke.map((point) => ({ ...point }))) ?? []

export function useSignaturePad({ value, defaultValue, onChange, disabled }: Options) {
  const [strokes, setStrokes] = useState(() =>
    copyStrokes(value === undefined ? defaultValue : value),
  )
  const [drawing, setDrawing] = useState(false)
  const strokesRef = useRef(copyStrokes({ version: 1, strokes }))
  const pointer = useRef<number | null>(null)
  const frame = useRef<number | null>(null)

  // A controlled value can be reset or loaded by the parent between strokes.
  useEffect(() => {
    if (value !== undefined && pointer.current === null) {
      const next = copyStrokes(value)
      strokesRef.current = copyStrokes(value)
      setStrokes(next)
    }
  }, [value])

  useEffect(
    () => () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current)
    },
    [],
  )

  const publish = useCallback(() => {
    if (frame.current !== null) cancelAnimationFrame(frame.current)
    frame.current = null
    const next = strokesRef.current.map((stroke) => stroke.map((point) => ({ ...point })))
    setStrokes(next)
    onChange?.(next.length ? { version: 1, strokes: next } : null)
  }, [onChange])

  const schedule = () => {
    if (frame.current === null) frame.current = requestAnimationFrame(publish)
  }

  const point = (event: PointerEvent<HTMLDivElement>): SignaturePoint | null => {
    const rect = event.currentTarget.getBoundingClientRect()
    if (!rect.width || !rect.height) return null
    return {
      x: Math.max(
        0,
        Math.min(SIGNATURE_WIDTH, ((event.clientX - rect.left) / rect.width) * SIGNATURE_WIDTH),
      ),
      y: Math.max(
        0,
        Math.min(SIGNATURE_HEIGHT, ((event.clientY - rect.top) / rect.height) * SIGNATURE_HEIGHT),
      ),
    }
  }

  const append = (event: PointerEvent<HTMLDivElement>) => {
    const position = point(event)
    const stroke = strokesRef.current[strokesRef.current.length - 1]
    const previous = stroke?.[stroke.length - 1]
    if (
      !position ||
      !stroke ||
      !previous ||
      Math.hypot(position.x - previous.x, position.y - previous.y) < 0.5
    )
      return
    stroke.push(position)
    schedule()
  }

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (
      disabled ||
      pointer.current !== null ||
      (event.pointerType === 'mouse' && event.button !== 0)
    )
      return
    const position = point(event)
    if (!position) return
    if (value !== undefined) strokesRef.current = copyStrokes(value)
    pointer.current = event.pointerId
    setDrawing(true)
    strokesRef.current = [...strokesRef.current, [position]]
    try {
      event.currentTarget.setPointerCapture(event.pointerId)
    } catch {
      /* Capture may be unavailable. */
    }
    schedule()
  }

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (pointer.current === event.pointerId) append(event)
  }

  const finish = (event: PointerEvent<HTMLDivElement>, includePosition: boolean) => {
    if (pointer.current !== event.pointerId) return
    if (includePosition) append(event)
    pointer.current = null
    setDrawing(false)
    publish()
  }

  const clear = () => {
    if (disabled) return
    pointer.current = null
    setDrawing(false)
    strokesRef.current = []
    publish()
  }

  // Preserve the partial stroke if the parent disables the pad during a gesture.
  useEffect(() => {
    if (disabled && pointer.current !== null) {
      pointer.current = null
      setDrawing(false)
      publish()
    }
  }, [disabled, publish])

  return {
    strokes: value !== undefined && !drawing ? (value?.strokes ?? []) : strokes,
    clear,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: (event: PointerEvent<HTMLDivElement>) => finish(event, true),
      onPointerCancel: (event: PointerEvent<HTMLDivElement>) => finish(event, false),
      onLostPointerCapture: (event: PointerEvent<HTMLDivElement>) => finish(event, false),
    },
  }
}
