import {
  forwardRef,
  type PointerEvent as ReactPointerEvent,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { Input as AriaInput, type InputProps as AriaInputProps } from 'react-aria-components'

import { cn } from '../../lib/cn'

type CompatibleRef<T> = ((instance: T | null) => unknown) | { readonly current: T | null } | null

export type OtpInputProps = Omit<
  AriaInputProps,
  'children' | 'className' | 'defaultValue' | 'maxLength' | 'onChange' | 'type' | 'value'
> & {
  /** Number of numeric characters in the code. */
  length?: number
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  onComplete?: (value: string) => void
  className?: string
  inputClassName?: string
  ref?: CompatibleRef<HTMLInputElement>
}

function normalizeOtp(value: string, length: number) {
  return value.replace(/[^0-9]/g, '').slice(0, length)
}

const OtpInputImpl = forwardRef<HTMLInputElement, OtpInputProps>(function OtpInput(
  {
    length = 6,
    value,
    defaultValue = '',
    onChange,
    onComplete,
    className,
    inputClassName,
    disabled,
    onBlur,
    onFocus,
    onKeyUp,
    onSelect,
    ...props
  },
  forwardedRef,
) {
  const slotCount = Math.max(1, Math.floor(length))
  const controlled = value !== undefined
  const [internalValue, setInternalValue] = useState(() => normalizeOtp(defaultValue, slotCount))
  const code = normalizeOtp(controlled ? value : internalValue, slotCount)
  const slots = Array.from({ length: slotCount }, (_, index) => `otp-slot-${index + 1}`)
  const inputRef = useRef<HTMLInputElement>(null)
  const [focused, setFocused] = useState(false)
  const [selectionStart, setSelectionStart] = useState(0)
  const invalid = props['aria-invalid'] === true || props['aria-invalid'] === 'true'
  const activeIndex =
    code.length === slotCount ? slotCount - 1 : Math.min(selectionStart, code.length, slotCount - 1)

  useImperativeHandle(forwardedRef, () => inputRef.current as HTMLInputElement)

  function updateSelection(input: HTMLInputElement) {
    setSelectionStart(input.selectionStart ?? code.length)
  }

  function commitValue(rawValue: string) {
    const nextValue = normalizeOtp(rawValue, slotCount)
    if (!controlled) setInternalValue(nextValue)
    if (nextValue === code) return
    onChange?.(nextValue)
    if (nextValue.length === slotCount) onComplete?.(nextValue)
  }

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (disabled) return
    event.preventDefault()
    const input = inputRef.current
    if (!input) return
    const bounds = event.currentTarget.getBoundingClientRect()
    const offset = bounds.width > 0 ? (event.clientX - bounds.left) / bounds.width : 1
    const position = Math.min(Math.max(Math.floor(offset * slotCount), 0), code.length)
    input.focus()
    input.setSelectionRange(position, position)
    setSelectionStart(position)
  }

  return (
    <div
      data-slot="otp-input"
      data-disabled={disabled || undefined}
      data-invalid={invalid || undefined}
      className={cn('relative inline-grid max-w-full gap-2', className)}
      style={{ gridTemplateColumns: `repeat(${slotCount}, minmax(0, 2.5rem))` }}
      onPointerDown={handlePointerDown}
    >
      <AriaInput
        {...props}
        ref={inputRef}
        type="text"
        inputMode={props.inputMode ?? 'numeric'}
        autoComplete={props.autoComplete ?? 'one-time-code'}
        pattern={props.pattern ?? '[0-9]*'}
        maxLength={slotCount}
        value={code}
        disabled={disabled}
        data-slot="otp-input-control"
        className={cn(
          'absolute inset-0 z-10 size-full cursor-text appearance-none rounded-lg border-0 bg-transparent text-base text-transparent caret-transparent outline-none selection:bg-transparent disabled:cursor-not-allowed',
          inputClassName,
        )}
        onChange={(event) => {
          commitValue(event.currentTarget.value)
          updateSelection(event.currentTarget)
        }}
        onFocus={(event) => {
          setFocused(true)
          updateSelection(event.currentTarget)
          onFocus?.(event)
        }}
        onBlur={(event) => {
          setFocused(false)
          onBlur?.(event)
        }}
        onSelect={(event) => {
          updateSelection(event.currentTarget)
          onSelect?.(event)
        }}
        onKeyUp={(event) => {
          updateSelection(event.currentTarget)
          onKeyUp?.(event)
        }}
      />
      {slots.map((slot, index) => (
        <span
          key={slot}
          aria-hidden="true"
          data-slot="otp-input-slot"
          data-active={(focused && index === activeIndex) || undefined}
          className={cn(
            'pointer-events-none grid size-10 place-items-center rounded-lg border border-border bg-background text-base font-medium tabular-nums text-foreground transition-[border-color,box-shadow]',
            focused && index === activeIndex && 'border-ring ring-3 ring-ring/50',
            invalid && 'border-destructive',
            disabled && 'opacity-50',
          )}
        >
          {code[index] ?? ''}
        </span>
      ))}
    </div>
  )
})

/** A single accessible input visually split into slots for numeric one-time codes. */
export const OtpInput = OtpInputImpl as unknown as (
  props: OtpInputProps,
) => ReturnType<typeof OtpInputImpl>
