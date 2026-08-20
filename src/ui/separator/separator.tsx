import { Separator as AriaSeparator, type SeparatorProps as AriaSeparatorProps } from "react-aria-components";
import { cn } from "../../lib/cn";

export type SeparatorProps = Omit<AriaSeparatorProps, "className"> & { className?: string };

export function Separator({ className, orientation = "horizontal", ...props }: SeparatorProps) {
  return <AriaSeparator data-slot="separator" orientation={orientation} className={cn("shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch", className)} {...props} />;
}
