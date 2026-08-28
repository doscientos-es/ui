"use client";

import * as React from "react";

type CollapsibleContextValue = {
  contentId: string;
  open: boolean;
  setOpen: (open: boolean) => void;
};
type SlottableProps = React.HTMLAttributes<HTMLElement> & {
  "data-slot"?: string;
  "data-state"?: "closed" | "open";
};
const CollapsibleContext = React.createContext<CollapsibleContextValue | null>(null);

function useCollapsibleContext() {
  const context = React.useContext(CollapsibleContext);
  if (!context) throw new Error("Collapsible components must be rendered within Collapsible.");
  return context;
}

/** Props for the collapsible state container. */
export type CollapsibleProps = React.ComponentProps<"div"> & {
  /** Initial state when the component is uncontrolled. */
  defaultOpen?: boolean;
  /** Called after the expanded state changes. */
  onOpenChange?: (open: boolean) => void;
  /** Controlled expanded state. Use with {@link onOpenChange}. */
  open?: boolean;
};

/** Groups a trigger and conditional content in a controlled or uncontrolled disclosure. */
export function Collapsible({
  children,
  defaultOpen = false,
  onOpenChange,
  open: controlledOpen,
  ...props
}: CollapsibleProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const contentId = React.useId();
  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = React.useCallback(
    (nextOpen: boolean) => {
      if (controlledOpen === undefined) setUncontrolledOpen(nextOpen);
      onOpenChange?.(nextOpen);
    },
    [controlledOpen, onOpenChange],
  );

  return (
    <CollapsibleContext.Provider value={{ contentId, open, setOpen }}>
      <div data-slot="collapsible" data-state={open ? "open" : "closed"} {...props}>
        {children}
      </div>
    </CollapsibleContext.Provider>
  );
}

/** Props for the control that toggles a {@link Collapsible}. */
export type CollapsibleTriggerProps = React.ComponentProps<"button"> & {
  /** Renders and augments the single child element instead of a native button. */
  asChild?: boolean;
};

/** Button that toggles its parent {@link Collapsible} and exposes `aria-expanded`. */
export function CollapsibleTrigger({ asChild = false, children, onClick, ...props }: CollapsibleTriggerProps) {
  const { contentId, open, setOpen } = useCollapsibleContext();
  const handleClick: React.MouseEventHandler<HTMLElement> = (event) => {
    onClick?.(event as React.MouseEvent<HTMLButtonElement>);
    if (!event.defaultPrevented) setOpen(!open);
  };

  if (asChild && React.isValidElement<SlottableProps>(children)) {
    const child = children as React.ReactElement<SlottableProps>;
    return React.cloneElement(child, {
      ...(props as React.HTMLAttributes<HTMLElement>),
      "aria-controls": contentId,
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
      aria-controls={contentId}
      aria-expanded={open}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}

export type CollapsibleContentProps = React.ComponentProps<"div">;

/** Content that is mounted only while its parent {@link Collapsible} is open. */
export function CollapsibleContent({ children, ...props }: CollapsibleContentProps) {
  const { contentId, open } = useCollapsibleContext();
  if (!open) return null;

  return <div id={contentId} data-slot="collapsible-content" data-state="open" {...props}>{children}</div>;
}
