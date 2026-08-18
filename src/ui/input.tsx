import { Input as AriaInput, type InputProps } from "react-aria-components";
import { cn } from "../lib/cn";

export function Input({ className, type, ...props }: InputProps) {
  return <AriaInput type={type} data-slot="input" className={cn("h-8 w-full min-w-0 rounded-lg border border-border bg-background px-2.5 py-1 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive", className)} {...props} />;
}
