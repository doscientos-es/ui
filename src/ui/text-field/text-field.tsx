import { useId, type ReactNode } from 'react'

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '../input-group/input-group'
import { Input, type InputProps } from '../input/input'
import { FieldFrame, type FieldPresentation } from './field-frame'

export { TextareaField, type TextareaFieldProps } from './textarea-field'

export type TextFieldProps = Omit<InputProps, 'children' | 'className' | 'onChange' | 'prefix'> &
  FieldPresentation & {
    inputClassName?: string
    onChange?: (value: string) => void
    /** Static content before the input, such as a currency symbol or decorative icon. */
    prefix?: ReactNode
    /** Static content after the input, such as a unit or decorative icon. */
    suffix?: ReactNode
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
  prefix,
  suffix,
  'aria-describedby': describedBy,
  'aria-invalid': invalid,
  ...props
}: TextFieldProps) {
  const adornmentId = useId()
  const prefixId = prefix !== null && prefix !== undefined ? `${adornmentId}-prefix` : undefined
  const suffixId = suffix !== null && suffix !== undefined ? `${adornmentId}-suffix` : undefined
  return (
    <FieldFrame
      {...{ label, description, errorMessage, className, id, required, describedBy, invalid }}
    >
      {(controlProps) => {
        const inputProps = {
          ...props,
          ...controlProps,
          'aria-describedby':
            [controlProps['aria-describedby'], prefixId, suffixId].filter(Boolean).join(' ') ||
            undefined,
          className: inputClassName,
          onChange: onChange
            ? (event: React.ChangeEvent<HTMLInputElement>) => onChange(event.currentTarget.value)
            : undefined,
        }
        if (!prefixId && !suffixId) return <Input {...inputProps} />
        return (
          <InputGroup>
            {prefixId && (
              <InputGroupAddon>
                <InputGroupText id={prefixId}>{prefix}</InputGroupText>
              </InputGroupAddon>
            )}
            <InputGroupInput {...inputProps} />
            {suffixId && (
              <InputGroupAddon align="inline-end">
                <InputGroupText id={suffixId}>{suffix}</InputGroupText>
              </InputGroupAddon>
            )}
          </InputGroup>
        )
      }}
    </FieldFrame>
  )
}
