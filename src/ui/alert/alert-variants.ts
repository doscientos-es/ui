import { cva } from 'class-variance-authority'

export const alertVariants = cva(
  "group/alert relative grid w-full gap-0.5 rounded-lg border border-border px-2.5 py-2 text-left text-sm has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: 'bg-card text-card-foreground',
        info: 'border-info/30 bg-info/5 text-info',
        success: 'border-success/30 bg-success/5 text-success',
        warning: 'border-warning/30 bg-warning/5 text-warning',
        destructive:
          'border-destructive/30 bg-destructive/5 text-destructive *:data-[slot=alert-description]:text-destructive/90 *:[svg]:text-current',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)
