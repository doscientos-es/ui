import type { Meta, StoryObj } from "@storybook/react-vite";

const colors = [
  ["Background", "--ui-background"],
  ["Card", "--ui-card"],
  ["Primary", "--ui-primary"],
  ["Secondary", "--ui-secondary"],
  ["Muted", "--ui-muted"],
  ["Accent", "--ui-accent"],
  ["Destructive", "--ui-destructive"],
  ["Border", "--ui-border"],
] as const;

/** Live reference for the semantic tokens consumed by every component. */
function TokenGallery() {
  return <div className="grid max-w-4xl gap-6"><section><h2 className="mb-3 text-lg font-medium">Color</h2><div className="grid grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] gap-3">{colors.map(([label, token]) => <div key={token} className="overflow-hidden rounded-lg border border-border"><div className="h-20 border-b border-border" style={{ background: `var(${token})` }} /><div className="bg-background p-3"><p className="text-sm font-medium">{label}</p><code className="text-xs text-muted-foreground">{token}</code></div></div>)}</div></section><section><h2 className="mb-3 text-lg font-medium">Radios</h2><div className="flex flex-wrap gap-4"><div className="size-20 rounded-sm border border-border bg-muted" /><div className="size-20 rounded-md border border-border bg-muted" /><div className="size-20 rounded-lg border border-border bg-muted" /><div className="size-20 rounded-xl border border-border bg-muted" /></div></section></div>;
}

const meta = { title: "Foundations/Tokens", component: TokenGallery } satisfies Meta<typeof TokenGallery>;
export default meta;
type Story = StoryObj<typeof meta>;

export const SemanticTokens: Story = {};