import { Textarea, type TextareaProps } from '../textarea/textarea'
import { FieldFrame, type FieldPresentation } from './field-frame'

export type TextareaFieldProps = Omit<TextareaProps, 'children' | 'className' | 'onChange'> &
  FieldPresentation & {
    inputClassName?: string
    onChange?: (value: string) => void
  }

/** A labelled multi-line input with accessible description and validation feedback. */
export function TextareaField({
  label,
  description,
  errorMessage,
  className,
  inputClassName,
  id,
  required,
  onChange,
  'aria-describedby': describedBy,
  'aria-invalid': invalid,
  ...props
}: TextareaFieldProps) {
  return (
    <FieldFrame
      {...{ label, description, errorMessage, className, id, required, describedBy, invalid }}
    >
      {(controlProps) => (
        <Textarea
          {...props}
          {...controlProps}
          className={inputClassName}
          onChange={onChange ? (event) => onChange(event.currentTarget.value) : undefined}
        />
      )}
    </FieldFrame>
  )
}
