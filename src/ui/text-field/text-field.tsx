import type { ReactNode } from 'react'

import { FormRow, type FormRowControlProps, type FormRowProps } from '../form-row/form-row'
import { Input, type InputProps } from '../input/input'
import { Textarea, type TextareaProps } from '../textarea/textarea'

type FieldPresentation = Pick<FormRowProps, 'label' | 'description' | 'errorMessage' | 'className'>
type ControlProps = Omit<FormRowControlProps, 'aria-invalid'> & {
  'aria-invalid'?: InputProps['aria-invalid']
}

function FieldFrame({
  label,
  description,
  errorMessage,
  className,
  id,
  required,
  describedBy,
  invalid,
  children,
}: FieldPresentation & {
  id?: string
  required?: boolean
  describedBy?: string
  invalid?: InputProps['aria-invalid']
  children: (props: ControlProps) => ReactNode
}) {
  return (
    <FormRow
      label={label}
      description={description}
      errorMessage={errorMessage}
      className={className}
      htmlFor={id}
      required={required}
    >
      {(props) =>
        children({
          ...props,
          'aria-describedby':
            [props['aria-describedby'], describedBy].filter(Boolean).join(' ') || undefined,
          'aria-invalid': props['aria-invalid'] || invalid,
        })
      }
    </FormRow>
  )
}

export type TextFieldProps = Omit<InputProps, 'children' | 'className' | 'onChange'> &
  FieldPresentation & {
    inputClassName?: InputProps['className']
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

export type TextareaFieldProps = Omit<TextareaProps, 'children' | 'className' | 'onChange'> &
  FieldPresentation & {
    inputClassName?: TextareaProps['className']
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
