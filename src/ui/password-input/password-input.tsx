import { Eye, EyeOff } from 'lucide-react'
import { useState, type ReactNode } from 'react'

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '../input-group/input-group'
import { type InputProps } from '../input/input'

export type PasswordInputProps = Omit<InputProps, 'type'> & {
  /** Optional consumer-owned password feedback, such as a requirements indicator. */
  indicator?: ReactNode
}

/** Password input with an explicit visibility toggle and optional feedback indicator. */
export function PasswordInput({ indicator, ref, ...props }: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <InputGroup>
      <InputGroupInput {...props} ref={ref} type={isVisible ? 'text' : 'password'} />
      {indicator ? <InputGroupAddon align="inline-end">{indicator}</InputGroupAddon> : null}
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          aria-label={isVisible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          aria-pressed={isVisible}
          onPress={() => setIsVisible((visible) => !visible)}
          size="icon-sm"
          type="button"
          variant="ghost"
        >
          {isVisible ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}
