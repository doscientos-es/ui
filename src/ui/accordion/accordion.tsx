import { Disclosure as AriaDisclosure, DisclosureGroup as AriaDisclosureGroup, DisclosurePanel as AriaDisclosurePanel, Button, type DisclosureProps } from "react-aria-components";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/cn";

export function Accordion({ className, ...props }: React.ComponentProps<typeof AriaDisclosureGroup>) {
  return <AriaDisclosureGroup data-slot="accordion" className={cn("flex w-full flex-col", className)} {...props} />;
}

export function AccordionItem({ className, ...props }: DisclosureProps) {
  return <AriaDisclosure data-slot="accordion-item" className={cn("border-b border-border last:border-0", className)} {...props} />;
}

export function AccordionTrigger({ className, children, ...props }: React.ComponentProps<typeof Button>) {
  return <Button data-slot="accordion-trigger" className={cn("group/accordion-trigger flex w-full items-center justify-between py-3 text-left text-sm font-medium outline-none transition-colors hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50", className)} {...props}>{(values) => <><span>{typeof children === "function" ? children(values) : children}</span><ChevronDown aria-hidden="true" className="size-4 transition-transform group-data-expanded/accordion-trigger:rotate-180 motion-reduce:transition-none" /></>}</Button>;
}

export function AccordionContent({ className, ...props }: React.ComponentProps<typeof AriaDisclosurePanel>) {
  return <AriaDisclosurePanel data-slot="accordion-content" className={cn("overflow-hidden pb-3 text-sm text-muted-foreground", className)} {...props} />;
}
