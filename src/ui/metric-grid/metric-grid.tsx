import type * as React from 'react'

import { cn } from '../../lib/cn'

export type MetricGridProps = React.ComponentProps<'div'> & {
  /** Maximum column count reached on wide screens. */
  columns?: 2 | 3 | 4
}

const columnClasses = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 xl:grid-cols-3',
  4: 'sm:grid-cols-2 xl:grid-cols-4',
} as const

/** Responsive layout container for MetricCard items. */
export function MetricGrid({ className, columns = 4, ...props }: MetricGridProps) {
  return (
    <div
      data-slot="metric-grid"
      data-columns={columns}
      className={cn('grid gap-(--ui-content-gap,1rem)', columnClasses[columns], className)}
      {...props}
    />
  )
}
