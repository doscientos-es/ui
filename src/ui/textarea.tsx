import { TextArea as AriaTextArea, type TextAreaProps } from "react-aria-components";
import { cn } from "../lib/cn";

export function Textarea({ className, ...props }: TextAreaProps) {
  return <AriaTextArea data-slot="textarea" className={cn("min-h-20 w-full rounded-lg border border-border bg-background px-2.5 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive", className)} {...props} />;
}
