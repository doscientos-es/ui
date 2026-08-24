"use client";

import { Separator as SeparatorPrimitive } from "react-aria-components";
import { cn } from "../../lib/cn";

export type SeparatorProps = React.ComponentProps<typeof SeparatorPrimitive>;

function Separator({ className, orientation = "horizontal", ...props }: SeparatorProps) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      className={cn(
        "block shrink-0 border-0 bg-border aria-[orientation=horizontal]:h-px aria-[orientation=horizontal]:w-full aria-[orientation=vertical]:w-px aria-[orientation=vertical]:self-stretch [:is(hr)]:h-px [:is(hr)]:w-full",
        className,
      )}
      {...props}
    />
  );
}

export { Separator };
