import type * as React from "react";

import { cn } from "../../lib/cn";
import { Card, CardContent } from "../card/card";

export type MetricCardProps = Omit<React.ComponentProps<typeof Card>, "children"> & {
  /** Short name of the metric. */
  label: React.ReactNode;
  /** Primary metric value. */
  value: React.ReactNode;
  /** Optional supporting information, such as freshness or comparison. */
  description?: React.ReactNode;
  /** Decorative or labelled visual accompanying the metric. */
  icon?: React.ReactNode;
  /** Semantic emphasis without coupling the card to a product status. */
  tone?: "default" | "success" | "warning" | "danger" | "info";
};

/** Compact, accessible summary of a labelled metric. */
export function MetricCard({
  className,
  label,
  value,
  description,
  icon,
  tone = "default",
  ...props
}: MetricCardProps) {
  return (
    <Card data-slot="metric-card" data-tone={tone} className={cn("min-w-0", className)} {...props}>
      <CardContent className="flex items-start gap-3">
        {icon ? <div data-slot="metric-card-icon" className="shrink-0 text-muted-foreground">{icon}</div> : null}
        <div className="min-w-0">
          <p data-slot="metric-card-label" className="text-sm text-muted-foreground">{label}</p>
          <strong data-slot="metric-card-value" className="mt-1 block text-2xl font-semibold tracking-tight">{value}</strong>
          {description ? <p data-slot="metric-card-description" className="mt-1 text-xs text-muted-foreground">{description}</p> : null}
        </div>
      </CardContent>
    </Card>
  );
}