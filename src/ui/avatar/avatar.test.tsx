import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Avatar, AvatarFallback, AvatarImage } from './avatar'

describe('Avatar', () => {
  it('renders fallback content without an image', () => {
    render(
      <Avatar aria-label="Ana">
        <AvatarFallback>AN</AvatarFallback>
      </Avatar>,
    )
    expect(screen.getByText('AN')).toBeTruthy()
  })

  it('marks the image as loaded while preserving the fallback layer for the transition', () => {
    render(
      <Avatar>
        <AvatarImage src="/ana.jpg" alt="Ana" />
        <AvatarFallback>AN</AvatarFallback>
      </Avatar>,
    )
    const image = screen.getByRole('img', { name: 'Ana' })
    expect(image.hasAttribute('data-loaded')).toBe(false)
    fireEvent.load(image)
    expect(image.hasAttribute('data-loaded')).toBe(true)
    expect(screen.getByText('AN')).toBeTruthy()
  })

  it('shows the fallback when the image fails', () => {
    render(
      <Avatar>
        <AvatarImage src="/missing.jpg" alt="Ana" />
        <AvatarFallback>AN</AvatarFallback>
      </Avatar>,
    )
    fireEvent.error(screen.getByRole('img', { name: 'Ana' }))
    expect(screen.queryByRole('img', { name: 'Ana' })).toBeNull()
    expect(screen.getByText('AN')).toBeTruthy()
  })

  it('loads a replacement source after the previous image failed', () => {
    const avatar = (src: string) => (
      <Avatar>
        <AvatarImage src={src} alt="Ana" />
        <AvatarFallback>AN</AvatarFallback>
      </Avatar>
    )
    const { rerender } = render(avatar('/missing.jpg'))
    fireEvent.error(screen.getByRole('img', { name: 'Ana' }))

    rerender(avatar('/ana.jpg'))
    const image = screen.getByRole('img', { name: 'Ana' })
    expect(image.hasAttribute('data-loaded')).toBe(false)
    fireEvent.load(image)
    expect(image.hasAttribute('data-loaded')).toBe(true)
  })
})
