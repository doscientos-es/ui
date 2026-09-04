import type * as React from 'react'
import { Component, Suspense } from 'react'

import { Button } from '../button/button'
import {
  ErrorState,
  ErrorStateActions,
  ErrorStateDescription,
  ErrorStateIcon,
  ErrorStateTitle,
} from '../error-state/error-state'

export type ErrorFallbackProps = { error: Error; reset: () => void }
export type ErrorBoundaryProps = {
  children: React.ReactNode
  fallback?: React.ReactNode | ((props: ErrorFallbackProps) => React.ReactNode)
  onError?: (error: Error, info: React.ErrorInfo) => void
  resetKeys?: readonly unknown[]
}
type ErrorBoundaryState = { error: Error | null }

function changedResetKeys(previous: readonly unknown[] = [], next: readonly unknown[] = []) {
  return (
    previous.length !== next.length ||
    previous.some((value, index) => !Object.is(value, next[index]))
  )
}

class Boundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null }
  static getDerivedStateFromError(error: Error) {
    return { error }
  }
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.props.onError?.(error, info)
  }
  componentDidUpdate(previousProps: ErrorBoundaryProps) {
    if (this.state.error && changedResetKeys(previousProps.resetKeys, this.props.resetKeys))
      this.reset()
  }
  reset = () => this.setState({ error: null })
  render() {
    const { children, fallback } = this.props
    if (!this.state.error) return children
    if (typeof fallback === 'function')
      return fallback({ error: this.state.error, reset: this.reset })
    if (fallback) return fallback
    return (
      <ErrorState>
        <ErrorStateIcon />
        <ErrorStateTitle>No se pudo cargar este contenido</ErrorStateTitle>
        <ErrorStateDescription>Prueba a cargarlo de nuevo.</ErrorStateDescription>
        <ErrorStateActions>
          <Button onPress={this.reset}>Reintentar</Button>
        </ErrorStateActions>
      </ErrorState>
    )
  }
}

/** Catches rendering errors and renders a supplied or recoverable default fallback. */
export function ErrorBoundary(props: ErrorBoundaryProps) {
  return <Boundary {...props} />
}

/** Adds a Suspense fallback to ErrorBoundary without coupling loading to a data client. */
export function AsyncBoundary({
  pending = null,
  ...props
}: ErrorBoundaryProps & { pending?: React.ReactNode }) {
  return (
    <ErrorBoundary {...props}>
      <Suspense fallback={pending}>{props.children}</Suspense>
    </ErrorBoundary>
  )
}
