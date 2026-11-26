import { Input, type InputProps } from '../input/input'
import { FieldFrame, type FieldPresentation } from './field-frame'

export { TextareaField, type TextareaFieldProps } from './textarea-field'

export type TextFieldProps = Omit<InputProps, 'children' | 'className' | 'onChange'> &
  FieldPresentation & {
    inputClassName?: string
    onChange?: (value: string) => void
  }

/** A labelled single-line input with accessible description and validation feedback. */
export function TextField({
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
}: TextFieldProps) {
  return (
    <FieldFrame
      {...{ label, description, errorMessage, className, id, required, describedBy, invalid }}
    >
      {(controlProps) => (
        <Input
          {...props}
          {...controlProps}
          className={inputClassName}
          onChange={onChange ? (event) => onChange(event.currentTarget.value) : undefined}
        />
      )}
    </FieldFrame>
  )
}
