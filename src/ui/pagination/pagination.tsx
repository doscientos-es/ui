import { ChevronLeft, ChevronRight } from 'lucide-react'
import * as React from 'react'

import { cn } from '../../lib/cn'
import { Button } from '../button/button'

export type PaginationProps = {
  /** Currently selected page, starting at one. */
  page: number
  /** Total number of pages available. */
  pageCount: number
  /** Called with the page selected by the user. */
  onPageChange: (page: number) => void
  /** Accessible name for the page navigation landmark. */
  ariaLabel?: string
  /** Optional description of the slice of results currently visible. */
  summary?: React.ReactNode
  /** Number of neighbouring pages shown around the current page. */
  siblingCount?: number
  className?: string
}

function visiblePages(page: number, pageCount: number, siblingCount: number) {
  return [
    ...new Set([
      1,
      ...Array.from({ length: siblingCount * 2 + 1 }, (_, index) => page - siblingCount + index),
      pageCount,
    ]),
  ]
    .filter((item) => item >= 1 && item <= pageCount)
    .sort((left, right) => left - right)
}

/** Navigation control for a known number of result pages. */
export function Pagination({
  page,
  pageCount,
  onPageChange,
  ariaLabel = 'Paginación',
  summary,
  siblingCount = 1,
  className,
}: PaginationProps) {
  if (pageCount <= 1) return null
  const pages = visiblePages(page, pageCount, siblingCount)

  return (
    <nav
      aria-label={ariaLabel}
      className={cn('flex flex-wrap items-center justify-between gap-4', className)}
    >
      <p className="text-muted-foreground text-sm">{summary ?? `Página ${page} de ${pageCount}`}</p>
      <div className="flex items-center gap-1">
        <Button
          aria-label="Página anterior"
          isDisabled={page <= 1}
          onPress={() => onPageChange(page - 1)}
          size="icon"
          variant="ghost"
        >
          <ChevronLeft />
        </Button>
        {pages.map((item, index) => {
          const previousPage = pages[index - 1]
          return (
            <React.Fragment key={item}>
              {previousPage !== undefined && item > previousPage + 1 ? (
                <span aria-hidden="true" className="text-muted-foreground px-1">
                  …
                </span>
              ) : null}
              <Button
                aria-current={item === page ? 'page' : undefined}
                aria-label={`Página ${item}`}
                onPress={() => onPageChange(item)}
                size="icon"
                variant={item === page ? 'secondary' : 'ghost'}
              >
                {item}
              </Button>
            </React.Fragment>
          )
        })}
        <Button
          aria-label="Página siguiente"
          isDisabled={page >= pageCount}
          onPress={() => onPageChange(page + 1)}
          size="icon"
          variant="ghost"
        >
          <ChevronRight />
        </Button>
      </div>
    </nav>
  )
}
