import { cn } from "../../lib/cn";

export function ButtonGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div role="group" data-slot="button-group" className={cn("inline-flex items-center gap-2", className)} {...props} />;
}

export function ButtonGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return <span data-slot="button-group-text" className={cn("text-sm text-muted-foreground", className)} {...props} />;
}
