"use client";

import type * as React from "react";

type CollapsibleContextValue = { open: boolean; setOpen: (open: boolean) => void };
const CollapsibleContext = React.createContext<CollapsibleContextValue | null>(null);

function useCollapsibleContext() {
  const context = React.useContext(CollapsibleContext);
  if (!context) throw new Error("Collapsible components must be rendered within Collapsible.");
  return context;
}

export type CollapsibleProps = React.ComponentProps<"div"> & {
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
};

export function Collapsible({
  children,
  defaultOpen = false,
  onOpenChange,
  open: controlledOpen,
  ...props
}: CollapsibleProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = React.useCallback(
    (nextOpen: boolean) => {
      if (controlledOpen === undefined) setUncontrolledOpen(nextOpen);
      onOpenChange?.(nextOpen);
    },
    [controlledOpen, onOpenChange],
  );

  return (
    <CollapsibleContext.Provider value={{ open, setOpen }}>
      <div data-slot="collapsible" data-state={open ? "open" : "closed"} {...props}>
        {children}
      </div>
    </CollapsibleContext.Provider>
  );
}

export type CollapsibleTriggerProps = React.ComponentProps<"button"> & { asChild?: boolean };

export function CollapsibleTrigger({ asChild = false, children, onClick, ...props }: CollapsibleTriggerProps) {
  const { open, setOpen } = useCollapsibleContext();
  const handleClick: React.MouseEventHandler<HTMLElement> = (event) => {
    onClick?.(event as React.MouseEvent<HTMLButtonElement>);
    if (!event.defaultPrevented) setOpen(!open);
  };

  if (asChild && React.isValidElement<React.HTMLAttributes<HTMLElement>>(children)) {
    const child = children;
    return React.cloneElement(child, {
      ...props,
      "aria-expanded": open,
      "data-slot": "collapsible-trigger",
      "data-state": open ? "open" : "closed",
      onClick: (event: React.MouseEvent<HTMLElement>) => {
        child.props.onClick?.(event);
        handleClick(event);
      },
    });
  }

  return (
    <button
      type="button"
      data-slot="collapsible-trigger"
      data-state={open ? "open" : "closed"}
      aria-expanded={open}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}

export type CollapsibleContentProps = React.ComponentProps<"div">;

export function CollapsibleContent({ children, ...props }: CollapsibleContentProps) {
  const { open } = useCollapsibleContext();
  if (!open) return null;

  return <div data-slot="collapsible-content" data-state="open" {...props}>{children}</div>;
}