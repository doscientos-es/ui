import { useCallback, useState } from 'react'

import { cn } from '../../lib/cn'

export type AvatarProps = React.ComponentProps<'div'> & {
  /** Avatar dimensions and fallback text size. */
  size?: 'xs' | 'sm' | 'default' | 'lg'
}

const sizes = {
  xs: 'size-5 text-[10px]',
  sm: 'size-6 text-xs',
  default: 'size-8 text-sm',
  lg: 'size-10 text-base',
}

/** Displays an image or fallback content for a person, organisation or entity. */
export function Avatar({ className, size = 'default', children, ...props }: AvatarProps) {
  return (
    <div
      data-slot="avatar"
      data-size={size}
      className={cn(
        'group/avatar bg-muted text-muted-foreground relative isolate flex shrink-0 overflow-hidden rounded-full',
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function AvatarImage(props: React.ComponentProps<'img'>) {
  const { src, srcSet, sizes } = props
  if (!src && !srcSet) return null
  return <AvatarImageSource key={JSON.stringify([src, srcSet, sizes])} {...props} />
}

function AvatarImageSource({
  className,
  onError,
  onLoad,
  ref,
  ...props
}: React.ComponentProps<'img'>) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading')
  const imageRef = useCallback(
    (image: HTMLImageElement | null) => {
      if (image?.complete && image.naturalWidth > 0) setStatus('loaded')
      if (typeof ref === 'function') return ref(image)
      if (ref) ref.current = image
    },
    [ref],
  )

  if (status === 'error') return null
  return (
    <img
      data-slot="avatar-image"
      data-loaded={status === 'loaded' || undefined}
      alt=""
      className={cn(
        'aspect-square size-full object-cover in-data-[slot=avatar]:invisible in-data-[slot=avatar]:absolute in-data-[slot=avatar]:inset-0 in-data-[slot=avatar]:z-1 in-data-[slot=avatar]:opacity-0 in-data-[slot=avatar]:data-loaded:visible in-data-[slot=avatar]:data-loaded:opacity-100 motion-safe:transition-opacity motion-safe:duration-150',
        className,
      )}
      ref={imageRef}
      onLoad={(event) => {
        setStatus('loaded')
        onLoad?.(event)
      }}
      onError={(event) => {
        setStatus('error')
        onError?.(event)
      }}
      {...props}
    />
  )
}

export function AvatarFallback({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="avatar-fallback"
      className={cn(
        'flex size-full items-center justify-center font-medium group-has-[[data-slot=avatar-image][data-loaded]]/avatar:invisible group-has-[[data-slot=avatar-image][data-loaded]]/avatar:opacity-0 motion-safe:transition-[opacity,visibility] motion-safe:duration-150',
        className,
      )}
      {...props}
    />
  )
}

export function AvatarBadge({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        'bg-success ring-background absolute right-0 bottom-0 z-2 size-2.5 rounded-full ring-2',
        className,
      )}
      {...props}
    />
  )
}

export function AvatarGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="avatar-group"
      className={cn(
        '[&>[data-slot=avatar]]:ring-background flex -space-x-2 [&>[data-slot=avatar]]:ring-2',
        className,
      )}
      {...props}
    />
  )
}

export function AvatarGroupCount({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="avatar-group-count"
      className={cn(
        'bg-muted text-muted-foreground ring-background flex size-8 items-center justify-center rounded-full text-xs font-medium ring-2',
        className,
      )}
      {...props}
    />
  )
}
