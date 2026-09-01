import { cva } from 'class-variance-authority'

export const inputGroupAddonVariants = cva(
  "flex cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium text-muted-foreground select-none [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      align: {
        'inline-start': 'order-first pl-2',
        'inline-end': 'order-last pr-2',
        'block-start': 'order-first w-full justify-start px-2.5 pt-2',
        'block-end': 'order-last w-full justify-start px-2.5 pb-2',
      },
    },
    defaultVariants: { align: 'inline-start' },
  },
)
