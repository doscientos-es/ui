import type { ReactNode } from 'react'

import { FormRow, type FormRowControlProps, type FormRowProps } from '../form-row/form-row'
import type { InputProps } from '../input/input'

export type FieldPresentation = Pick<FormRowProps, 'label' | 'description' | 'errorMessage' | 'className'>
type ControlProps = Omit<FormRowControlProps, 'aria-invalid'> & {
  'aria-invalid'?: InputProps['aria-invalid']
}

export function FieldFrame({
  label, description, errorMessage, className, id, required, describedBy, invalid, children,
}: FieldPresentation & {
  id?: string
  required?: boolean
  describedBy?: string
  invalid?: InputProps['aria-invalid']
  children: (props: ControlProps) => ReactNode
}) {
  return (
    <FormRow label={label} description={description} errorMessage={errorMessage} className={className} htmlFor={id} required={required}>
      {(props) => children({
        ...props,
        'aria-describedby': [props['aria-describedby'], describedBy].filter(Boolean).join(' ') || undefined,
        'aria-invalid': props['aria-invalid'] || invalid,
      })}
    </FormRow>
  )
}