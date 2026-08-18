import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Combobox, ComboboxContent, ComboboxInput, ComboboxItem, ComboboxList, HighlightMatch } from "./combobox";

const fruits = ["Manzana", "Mandarina", "Melocotón", "Pera", "Plátano"].map((name) => ({ id: name.toLowerCase(), name }));
const meta = { title: "Forms/Combobox" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Suggestions: Story = {
  render: function Render() {
    const [query, setQuery] = useState("");
    return <Combobox items={fruits} inputValue={query} onInputChange={setQuery} autoFocus>
      <ComboboxInput aria-label="Buscar fruta" placeholder="Busca una fruta…" className="w-80" />
      <ComboboxContent>
        <ComboboxList<{ id: string; name: string }> emptyState={<p className="px-3 py-7 text-center text-sm text-muted-foreground">No hay sugerencias.</p>}>{(fruit) => <ComboboxItem id={fruit.id} textValue={fruit.name}><HighlightMatch text={fruit.name} query={query} /></ComboboxItem>}</ComboboxList>
      </ComboboxContent>
    </Combobox>;
  },
};
