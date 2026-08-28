"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { useState } from "react";
import type * as React from "react";
import {
  Button as ButtonPrimitive,
  type ButtonProps as ButtonPrimitiveProps,
  Link as LinkPrimitive,
  type LinkProps as LinkPrimitiveProps,
} from "react-aria-components";

import { actionRipple } from "../../lib/action-ripple";
import { cn } from "../../lib/cn";

type RipplePosition = {
  x: string;
  y: string;
};

type Ripple = {
  id: number;
  position: RipplePosition;
};

const centeredRipplePosition: RipplePosition = { x: "50%", y: "50%" };

function useActionRipple(enabled: boolean) {
  const [ripple, setRipple] = useState<Ripple | null>(null);

  function triggerRipple(event: React.MouseEvent<HTMLElement>) {
    if (!enabled) return;

    const position = event.detail
      ? (() => {
        const bounds = event.currentTarget.getBoundingClientRect();
        return {
          x: `${event.clientX - bounds.left}px`,
          y: `${event.clientY - bounds.top}px`,
        };
      })()
      : centeredRipplePosition;

    setRipple((currentRipple) => ({
      id: (currentRipple?.id ?? 0) + 1,
      position,
    }));
  }

  const rippleElement = ripple ? (
    <span
      key={ripple.id}
      aria-hidden="true"
      data-slot="button-ripple"
      className="pointer-events-none absolute aspect-square w-full rounded-full bg-current animate-ui-ripple motion-reduce:hidden"
      style={{ left: ripple.position.x, top: ripple.position.y }}
      onAnimationEnd={() =>
        setRipple((currentRipple) => (currentRipple?.id === ripple.id ? null : currentRipple))
      }
    />
  ) : null;

  return { ripple: rippleElement, triggerRipple };
}

const buttonVariants = cva(
  cn(
    "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    actionRipple(),
  ),
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline after:hidden",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-8",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type ButtonProps = Omit<ButtonPrimitiveProps, "className"> &
  React.RefAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    className?: string;
  };

function Button({ className, variant = "default", size = "default", onClick, children, ...props }: ButtonProps) {
  const { ripple, triggerRipple } = useActionRipple(variant !== "link");

  return (
    <ButtonPrimitive
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      onClick={(event) => {
        onClick?.(event);
        triggerRipple();
      }}
      {...props}
    >
      {(renderProps) => (
        <>
          {typeof children === "function" ? children(renderProps) : children}
          {ripple}
        </>
      )}
    </ButtonPrimitive>
  );
}

export type LinkButtonProps = Omit<LinkPrimitiveProps, "className"> &
  VariantProps<typeof buttonVariants> & {
    className?: string;
  };

function LinkButton({
  className,
  variant = "default",
  size = "default",
  onClick,
  children,
  ...props
}: LinkButtonProps) {
  const { ripple, triggerRipple } = useActionRipple(variant !== "link");

  return (
    <LinkPrimitive
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      onClick={(event) => {
        onClick?.(event);
        triggerRipple();
      }}
      {...props}
    >
      {(renderProps) => (
        <>
          {typeof children === "function" ? children(renderProps) : children}
          {ripple}
        </>
      )}
    </LinkPrimitive>
  );
}

export { Button, buttonVariants, LinkButton };
