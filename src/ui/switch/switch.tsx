import {
  SwitchButton as AriaSwitchButton,
  SwitchField as AriaSwitchField,
  type SwitchButtonRenderProps,
  type SwitchFieldProps as AriaSwitchProps,
} from "react-aria-components";
import { cn } from "../../lib/cn";

export type SwitchProps = Omit<AriaSwitchProps, "className"> & {
  className?: string | ((values: SwitchButtonRenderProps) => string);
  size?: "sm" | "md";
};

const sizeStyles = {
  sm: { track: "h-5 w-9 p-0.5", thumb: "size-4", travel: "group-data-selected/switch:translate-x-4" },
  md: { track: "h-6 w-11 p-0.5", thumb: "size-5", travel: "group-data-selected/switch:translate-x-5" },
} as const;

export function Switch({ className, children, size = "sm", ...props }: SwitchProps) {
  const styles = sizeStyles[size];

  return (
    <AriaSwitchField {...props}>
      <AriaSwitchButton
        data-slot="switch"
        data-size={size}
        className={(state) =>
          cn(
            "group/switch inline-flex w-max items-center gap-2 text-sm text-foreground outline-none",
            "data-disabled:cursor-not-allowed data-disabled:opacity-50",
            typeof className === "function" ? className(state) : className,
          )
        }
      >
        {(state) => (
          <>
            <span
              aria-hidden="true"
              className={cn(
                "relative inline-flex shrink-0 items-center rounded-full border border-transparent bg-secondary",
                "shadow-[inset_0_1px_2px_rgb(0_0_0/0.08)]",
                "transition-[background-color,box-shadow] duration-200 ease-out",
                "group-data-selected/switch:bg-primary group-data-hovered/switch:bg-secondary/80",
                "group-data-selected/switch:group-data-hovered/switch:bg-primary/90",
                "group-data-focus-visible/switch:ring-3 group-data-focus-visible/switch:ring-ring/40",
                "group-data-pressed/switch:ring-4 group-data-pressed/switch:ring-primary/10",
                "motion-reduce:transition-none",
                styles.track,
              )}
            >
              <span
                className={cn(
                  "pointer-events-none block rounded-full bg-background shadow-[0_1px_2px_rgb(0_0_0/0.18)]",
                  "transition-[transform,background-color,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  "group-data-selected/switch:bg-primary-foreground group-data-selected/switch:shadow-[0_1px_3px_rgb(0_0_0/0.22)]",
                  "group-data-pressed/switch:scale-[0.94] motion-reduce:transition-none",
                  styles.travel,
                  styles.thumb,
                )}
              />
            </span>
            {children != null && (
              <span className="select-none font-medium leading-5 text-foreground">
                {typeof children === "function" ? children(state) : children}
              </span>
            )}
          </>
        )}
      </AriaSwitchButton>
    </AriaSwitchField>
  );
}
