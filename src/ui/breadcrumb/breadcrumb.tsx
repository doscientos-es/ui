import { Breadcrumb as AriaBreadcrumb, Breadcrumbs as AriaBreadcrumbs, Link as AriaLink } from "react-aria-components";
import { cn } from "../../lib/cn";

export function Breadcrumbs({ className, ...props }: React.ComponentProps<typeof AriaBreadcrumbs>) {
  return <AriaBreadcrumbs data-slot="breadcrumbs" className={cn("flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground", className)} {...props} />;
}

export function Breadcrumb({ className, ...props }: React.ComponentProps<typeof AriaBreadcrumb>) {
  return <AriaBreadcrumb data-slot="breadcrumb" className={cn("inline-flex items-center gap-1.5", className)} {...props} />;
}

export function BreadcrumbLink({ className, ...props }: React.ComponentProps<typeof AriaLink>) {
  return <AriaLink data-slot="breadcrumb-link" className={cn("transition-colors hover:text-foreground", className)} {...props} />;
}

export function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return <span data-slot="breadcrumb-page" aria-current="page" className={cn("font-medium text-foreground", className)} {...props} />;
}

export function BreadcrumbSeparator({ children = "/", className, ...props }: React.ComponentProps<"span">) {
  return <span data-slot="breadcrumb-separator" aria-hidden="true" className={cn("text-muted-foreground/60", className)} {...props}>{children}</span>;
}
