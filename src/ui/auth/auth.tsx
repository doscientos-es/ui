import { Check, CircleAlert, CircleCheck } from 'lucide-react'
import type { ReactNode } from 'react'

import { cn } from '../../lib/cn'
import { Button, type ButtonProps } from '../button/button'
import { Card, type CardProps } from '../card/card'

export type AuthShellProps = {
  children: ReactNode
  logo?: ReactNode
  title?: ReactNode
  description?: ReactNode
  footer?: ReactNode
  background?: ReactNode
  className?: string
  contentClassName?: string
}

/**
 * Provider-neutral page frame for login, password recovery and invitation flows.
 * It owns layout and accessibility, not routing, auth state or branding decisions.
 */
export function AuthShell({
  children,
  logo,
  title,
  description,
  footer,
  background,
  className,
  contentClassName,
}: AuthShellProps) {
  return (
    <main
      className={cn(
        'relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10',
        className,
      )}
    >
      {background ? (
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          {background}
        </div>
      ) : null}
      <div className={cn('relative z-10 w-full max-w-sm', contentClassName)}>
        {logo ? <div className="mb-8 flex justify-center">{logo}</div> : null}
        {title || description ? (
          <header className="mb-6 text-center">
            {title ? (
              <h1 className="text-xl font-semibold tracking-tight text-foreground">{title}</h1>
            ) : null}
            {description ? (
              <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>
            ) : null}
          </header>
        ) : null}
        {children}
        {footer ? (
          <footer className="mt-6 text-center text-xs text-muted-foreground">{footer}</footer>
        ) : null}
      </div>
    </main>
  )
}

/** Standard surface for an auth form. The application owns its contents and actions. */
export function AuthCard({ className, ...props }: CardProps) {
  return <Card className={cn('w-full', className)} {...props} />
}

export type AuthProviderButtonProps = Omit<ButtonProps, 'children'> & {
  children: ReactNode
  provider?: ReactNode
}

/** Consistent OAuth/provider action without knowing which provider is being used. */
export function AuthProviderButton({
  children,
  provider,
  variant = 'outline',
  className,
  ...props
}: AuthProviderButtonProps) {
  return (
    <Button variant={variant} className={cn('w-full', className)} {...props}>
      {provider ? (
        <span className="flex size-4 shrink-0 items-center justify-center" aria-hidden="true">
          {provider}
        </span>
      ) : null}
      {children}
    </Button>
  )
}

/** Accessible visual separator between provider and password/email actions. */
export function AuthDivider({
  children = 'o',
  className,
}: {
  children?: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn('flex items-center gap-3 text-xs text-muted-foreground', className)}
      role="separator"
    >
      <span className="h-px flex-1 bg-border" />
      <span>{children}</span>
      <span className="h-px flex-1 bg-border" />
    </div>
  )
}

export type AuthMessageProps = {
  tone?: 'error' | 'success' | 'info'
  children: ReactNode
  className?: string
}

/** Inline status for auth failures and completed email/password actions. */
export function AuthMessage({ tone = 'error', children, className }: AuthMessageProps) {
  const Icon = tone === 'error' ? CircleAlert : tone === 'success' ? CircleCheck : CircleAlert
  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      data-slot="auth-message"
      data-tone={tone}
      className={cn(
        'flex items-start gap-2 rounded-lg border px-3 py-2.5 text-sm',
        tone === 'error' && 'border-destructive/30 bg-destructive/5 text-destructive',
        tone === 'success' && 'border-success/30 bg-success/5 text-success',
        tone === 'info' && 'border-info/30 bg-info/5 text-info',
        className,
      )}
    >
      <Icon className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      <span>{children}</span>
    </div>
  )
}

export type AuthPasswordRequirement = {
  id: string
  label: ReactNode
  met: boolean
}

export type AuthPasswordRequirementsProps = {
  items: readonly AuthPasswordRequirement[]
  label?: string
  className?: string
}

/** Compact, accessible password policy feedback shared by login and invitation flows. */
export function AuthPasswordRequirements({
  items,
  label = 'Requisitos de contraseña',
  className,
}: AuthPasswordRequirementsProps) {
  return (
    <ul aria-label={label} className={cn('grid gap-1 text-xs text-muted-foreground', className)}>
      {items.map((item) => (
        <li key={item.id} className={cn('flex items-center gap-1.5', item.met && 'text-success')}>
          {item.met ? (
            <Check className="size-3.5" aria-hidden="true" />
          ) : (
            <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
          )}
          <span>{item.label}</span>
        </li>
      ))}
    </ul>
  )
}
