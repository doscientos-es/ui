import { Search, X } from 'lucide-react'
import type { ReactNode, Ref } from 'react'
import {
  FieldError,
  Label,
  SearchField as AriaSearchField,
  Text,
  type SearchFieldProps as AriaSearchFieldProps,
} from 'react-aria-components'

import { cn } from '../../lib/cn'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '../input-group/input-group'

export type SearchFieldProps = Omit<AriaSearchFieldProps, 'children' | 'className'> & {
  label?: ReactNode
  description?: ReactNode
  errorMessage?: ReactNode
  placeholder?: string
  clearLabel?: string
  className?: string
  inputClassName?: string
  inputRef?: Ref<HTMLInputElement>
}

/** Search input with an accessible clear action. Filtering remains the caller's responsibility. */
export function SearchField({
  label,
  description,
  errorMessage,
  placeholder,
  clearLabel = 'Borrar búsqueda',
  className,
  inputClassName,
  inputRef,
  ...props
}: SearchFieldProps) {
  return (
    <AriaSearchField
      {...props}
      aria-label={
        label
          ? undefined
          : (props['aria-label'] ?? (props['aria-labelledby'] ? undefined : 'Buscar'))
      }
      className={cn('flex w-full min-w-0 flex-col gap-1.5', className)}
    >
      {({ isEmpty, isDisabled, isReadOnly }) => (
        <>
          {label && <Label className="text-foreground text-sm font-medium">{label}</Label>}
          <InputGroup>
            <InputGroupAddon aria-hidden="true">
              <Search className="size-4" />
            </InputGroupAddon>
            <InputGroupInput
              ref={inputRef}
              placeholder={placeholder}
              className={cn('[&::-webkit-search-cancel-button]:appearance-none', inputClassName)}
            />
            {!isEmpty && !isDisabled && !isReadOnly && (
              <InputGroupAddon align="inline-end">
                <InputGroupButton size="icon-sm" aria-label={clearLabel}>
                  <X aria-hidden="true" />
                </InputGroupButton>
              </InputGroupAddon>
            )}
          </InputGroup>
          {description && (
            <Text slot="description" className="text-muted-foreground text-xs">
              {description}
            </Text>
          )}
          {errorMessage && (
            <FieldError className="text-destructive text-xs">{errorMessage}</FieldError>
          )}
        </>
      )}
    </AriaSearchField>
  )
}
