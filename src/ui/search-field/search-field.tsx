import {
  SearchField as AriaSearchField,
  Button,
  Input,
  type SearchFieldProps as AriaSearchFieldProps,
  type ButtonProps,
  type InputProps,
} from "react-aria-components";
import { X } from "lucide-react";
import { cn } from "../../lib/cn";

export const SearchField = AriaSearchField;
export type { AriaSearchFieldProps as SearchFieldProps };

export function SearchInput({ className, ...props }: InputProps) {
  return <Input data-slot="search-input" className={cn("h-8 w-full min-w-0 rounded-lg border border-border bg-background px-2.5 py-1 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:ring-3 focus-visible:ring-ring/50", className)} {...props} />;
}

export function SearchClearButton({ className, children = <XIcon aria-hidden="true" className="size-4" />, ...props }: Omit<ButtonProps, "className"> & { className?: string }) {
  return <Button slot="clear" data-slot="search-clear" className={cn("absolute top-1/2 right-1 rounded p-1 text-muted-foreground outline-none hover:bg-muted data-focus-visible:ring-2 data-focus-visible:ring-ring", className)} {...props}>{children}</Button>;
}
