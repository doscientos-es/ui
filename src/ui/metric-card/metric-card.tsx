import type * as React from 'react'
import { Minus, TrendingDown, TrendingUp } from 'lucide-react'

import { cn } from '../../lib/cn'
import { Card, CardAction, CardContent, CardFooter, CardHeader } from '../card/card'

export type MetricCardProps = Omit<React.ComponentProps<typeof Card>, 'children'> & {
  /** Short name of the metric. */
  label: React.ReactNode
  /** Primary metric value. */
  value: React.ReactNode
  /** Optional supporting information, such as freshness or comparison. */
  description?: React.ReactNode
  /** Decorative or labelled visual accompanying the metric. */
  icon?: React.ReactNode
  /** Optional action rendered in the top-right corner. */
  action?: React.ReactNode
  /** Small data visual such as a sparkline or progress strip. */
  visual?: React.ReactNode
  /** Custom supporting row. Replaces the generated delta/description footer. */
  footer?: React.ReactNode
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
  action,
  visual,
  footer,
  tone = 'default',
  trend,
  delta,
  loading = false,
  loadingLabel = 'Cargando métrica',
  ...props
}: MetricCardProps) {
  const support = footer ??
    (delta || description ? (
      <>
        {delta ? (
          <span
            data-slot="metric-card-delta"
            className={cn(
              'inline-flex shrink-0 items-center gap-1 text-xs font-medium',
              trend === 'up' && 'text-success',
              trend === 'down' && 'text-destructive',
              trend === 'neutral' && 'text-muted-foreground',
            )}
          >
            {trend === 'up' ? <TrendingUp aria-hidden="true" className="size-3.5" /> : null}
            {trend === 'down' ? <TrendingDown aria-hidden="true" className="size-3.5" /> : null}
            {trend === 'neutral' ? <Minus aria-hidden="true" className="size-3.5" /> : null}
            {delta}
          </span>
        ) : null}
        {description ? (
          <span data-slot="metric-card-description" className="min-w-0 text-xs text-muted-foreground">
            {description}
          </span>
        ) : null}
      </>
    ) : null)

  return (
    <Card
      data-slot="metric-card"
      data-tone={tone}
      data-trend={trend}
      aria-busy={loading || undefined}
      className={cn('min-w-0 gap-4', className)}
      {...props}
    >
      <CardHeader className="flex flex-row items-center gap-2">
        {icon ? (
          <div
            data-slot="metric-card-icon"
            className={cn(
              'flex size-8 shrink-0 items-center justify-center rounded-lg [&>svg]:size-4',
              tone === 'default' && 'bg-secondary text-muted-foreground',
              tone === 'success' && 'bg-success/10 text-success',
              tone === 'warning' && 'bg-warning/10 text-warning',
              tone === 'danger' && 'bg-destructive/10 text-destructive',
              tone === 'info' && 'bg-info/10 text-info',
            )}
          >
            {icon}
          </div>
        ) : null}
        <p data-slot="metric-card-label" className="min-w-0 flex-1 truncate text-sm text-muted-foreground">
          {label}
        </p>
        {action ? <CardAction className="self-center">{action}</CardAction> : null}
      </CardHeader>
      <CardContent className="flex min-w-0 items-end justify-between gap-4">
        <strong
          data-slot="metric-card-value"
          className="block min-w-0 text-3xl font-semibold tracking-[-0.04em] tabular-nums"
        >
          {loading ? (
            <span
              data-slot="metric-card-loading"
              aria-label={loadingLabel}
              className="block h-8 w-28 animate-pulse rounded-lg bg-muted motion-reduce:animate-none"
            />
          ) : (
            value
          )}
        </strong>
        {visual ? (
          <div data-slot="metric-card-visual" className="min-w-0 shrink-0 text-muted-foreground">
            {visual}
          </div>
        ) : null}
      </CardContent>
      {support ? (
        <CardFooter
          data-slot="metric-card-support"
          className="min-h-11 flex-wrap gap-x-3 gap-y-1 py-2.5"
        >
          {support}
        </CardFooter>
      ) : null}
    </Card>
  )
}
