import {
  Tab as AriaTab,
  TabList as AriaTabList,
  TabPanel as AriaTabPanel,
  TabPanels as AriaTabPanels,
  Tabs as AriaTabs,
  composeRenderProps,
  type TabListProps as AriaTabListProps,
  type TabPanelProps as AriaTabPanelProps,
  type TabPanelsProps as AriaTabPanelsProps,
  type TabProps as AriaTabProps,
  type TabsProps as AriaTabsProps,
} from "react-aria-components";
import { cn } from "../lib/cn";

export type TabsProps = AriaTabsProps;
export type TabProps = AriaTabProps;
export type TabPanelProps = AriaTabPanelProps;

export function Tabs({ className, ...props }: AriaTabsProps) {
  return <AriaTabs data-slot="tabs" className={composeRenderProps(className, (value) => cn("flex flex-col gap-2", value))} {...props} />;
}

export function TabsList<T extends object>({ className, ...props }: AriaTabListProps<T>) {
  return <AriaTabList data-slot="tabs-list" className={composeRenderProps(className, (value) => cn("inline-flex w-fit items-center gap-1 rounded-lg bg-muted p-1 text-muted-foreground", value))} {...props} />;
}

export function TabsTrigger({ className, ...props }: AriaTabProps) {
  return <AriaTab data-slot="tabs-trigger" className={composeRenderProps(className, (value) => cn("inline-flex h-7 items-center justify-center gap-1.5 rounded-md px-2.5 text-sm font-medium outline-none transition-colors data-hovered:text-foreground data-selected:bg-background data-selected:text-foreground data-selected:shadow-sm data-focus-visible:ring-3 data-focus-visible:ring-ring/50 data-disabled:cursor-not-allowed data-disabled:opacity-50", value))} {...props} />;
}

export function TabsPanels<T extends object>({ className, ...props }: AriaTabPanelsProps<T>) {
  return <AriaTabPanels data-slot="tabs-panels" className={cn("min-w-0", className)} {...props} />;
}

export function TabsContent({ className, ...props }: AriaTabPanelProps) {
  return <AriaTabPanel data-slot="tabs-content" className={composeRenderProps(className, (value) => cn("text-sm outline-none data-focus-visible:ring-3 data-focus-visible:ring-ring/50", value))} {...props} />;
}