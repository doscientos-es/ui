import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";
import { Button, type ButtonProps } from "../button/button";
import { Input } from "../input/input";
import { Textarea } from "../textarea/textarea";

export function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div role="group" data-slot="input-group" className={cn("group/input-group flex min-h-8 w-full min-w-0 items-center rounded-lg border border-border transition-colors has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-3 has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 has-[[data-slot][aria-invalid=true]]:border-destructive", className)} {...props} />;
}

const addonVariants = cva("flex items-center justify-center gap-2 px-2 text-sm text-muted-foreground", { variants: { align: { "inline-start": "order-first", "inline-end": "order-last", "block-start": "w-full justify-start border-b py-2", "block-end": "w-full justify-start border-t py-2" } }, defaultVariants: { align: "inline-start" } });
export function InputGroupAddon({ className, align, ...props }: React.ComponentProps<"div"> & VariantProps<typeof addonVariants>) {
  return <div data-slot="input-group-addon" data-align={align} className={cn(addonVariants({ align }), className)} {...props} />;
}

export function InputGroupButton({ className, ...props }: ButtonProps) {
  return <Button data-slot="input-group-button" size="icon" variant="ghost" className={cn("size-7 shrink-0", className)} {...props} />;
}

export function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return <span data-slot="input-group-text" className={cn("px-2 text-sm text-muted-foreground", className)} {...props} />;
}

export function InputGroupInput({ className, ...props }: React.ComponentProps<typeof Input>) {
  return <Input data-slot="input-group-control" className={cn("flex-1 rounded-none border-0 bg-transparent shadow-none ring-0 focus-visible:ring-0", className)} {...props} />;
}

export function InputGroupTextarea({ className, ...props }: React.ComponentProps<typeof Textarea>) {
  return <Textarea data-slot="input-group-control" className={cn("flex-1 resize-none rounded-none border-0 bg-transparent shadow-none ring-0 focus-visible:ring-0", className)} {...props} />;
}
