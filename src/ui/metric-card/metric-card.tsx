import type * as React from 'react'

import { cn } from '../../lib/cn'
import { Card, CardContent } from '../card/card'

export type MetricCardProps = Omit<React.ComponentProps<typeof Card>, 'children'> & {
  /** Short name of the metric. */
  label: React.ReactNode
  /** Primary metric value. */
  value: React.ReactNode
  /** Optional supporting information, such as freshness or comparison. */
  description?: React.ReactNode
  /** Decorative or labelled visual accompanying the metric. */
  icon?: React.ReactNode
  /** Semantic emphasis without coupling the card to a product status. */
  tone?: 'default' | 'success' | 'warning' | 'danger' | 'info'
  /** Direction of an optional comparison value. */
  trend?: 'up' | 'down' | 'neutral'
  /** Optional comparison with a previous period. */
  delta?: React.ReactNode
  /** Replaces the value with an accessible loading placeholder. */
  loading?: boolean
  /** Accessible loading label when the metric label is not plain text. */
  loadingLabel?: string
}

/** Compact, accessible summary of a labelled metric. */
export function MetricCard({
  className,
  label,
  value,
  description,
  icon,
  tone = 'default',
  trend,
  delta,
  loading = false,
  loadingLabel = 'Cargando métrica',
  ...props
}: MetricCardProps) {
  return (
    <Card
      data-slot="metric-card"
      data-tone={tone}
      data-trend={trend}
      aria-busy={loading || undefined}
      className={cn('min-w-0', className)}
      {...props}
    >
      <CardContent className="flex items-start gap-3">
        {icon ? (
          <div data-slot="metric-card-icon" className="text-muted-foreground shrink-0">
            {icon}
          </div>
        ) : null}
        <div className="min-w-0">
          <p data-slot="metric-card-label" className="text-muted-foreground text-sm">
            {label}
          </p>
          <strong
            data-slot="metric-card-value"
            className="mt-1 block text-2xl font-semibold tracking-tight"
          >
            {loading ? (
              <span
                data-slot="metric-card-loading"
                aria-label={loadingLabel}
                className="bg-muted block h-7 w-24 animate-pulse rounded motion-reduce:animate-none"
              />
            ) : (
              value
            )}
          </strong>
          {delta ? (
            <span
              data-slot="metric-card-delta"
              className={cn(
                'mt-1 block text-xs',
                trend === 'up' && 'text-emerald-600',
                trend === 'down' && 'text-destructive',
                trend === 'neutral' && 'text-muted-foreground',
              )}
            >
              {delta}
            </span>
          ) : null}
          {description ? (
            <p data-slot="metric-card-description" className="text-muted-foreground mt-1 text-xs">
              {description}
            </p>
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
}
