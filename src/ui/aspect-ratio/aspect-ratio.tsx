import type * as React from "react";

export type AspectRatioProps = React.ComponentProps<"div"> & {
  ratio?: number;
};

export function AspectRatio({ ratio = 1, style, ...props }: AspectRatioProps) {
  return <div data-slot="aspect-ratio" style={{ aspectRatio: ratio, ...style }} {...props} />;
}