import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Pagination } from './pagination'

describe('Pagination', () => {
  it('labels pages, uses custom summaries and abbreviates long ranges', () => {
    render(
      <Pagination
        ariaLabel="Paginación de clientes"
        page={4}
        pageCount={8}
        onPageChange={vi.fn()}
        summary="Mostrando 31–40 de 80"
      />,
    )

    expect(screen.getByRole('navigation', { name: 'Paginación de clientes' })).toBeTruthy()
    expect(screen.getByText('Mostrando 31–40 de 80')).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Página 4' }).getAttribute('aria-current')).toBe(
      'page',
    )
    expect(screen.getAllByText('…')).toHaveLength(2)
  })

  it('clamps invalid external pages before rendering or changing pages', async () => {
    const user = userEvent.setup()
    const onPageChange = vi.fn()
    render(<Pagination page={0} pageCount={3} onPageChange={onPageChange} />)

    expect(screen.getByRole('button', { name: 'Página 1' }).getAttribute('aria-current')).toBe(
      'page',
    )
    await user.click(screen.getByRole('button', { name: 'Página siguiente' }))

    expect(onPageChange).toHaveBeenCalledWith(2)
  })
})
