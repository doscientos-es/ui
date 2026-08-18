import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList, HighlightMatch } from "./combobox";

const fruits = ["Manzana", "Mandarina", "Melocotón", "Pera", "Plátano"];
const meta = { title: "Forms/Combobox" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Suggestions: Story = {
  render: function Render() {
    const [query, setQuery] = useState("");
    return <Combobox items={fruits} value={null} inputValue={query} onInputValueChange={setQuery} autoHighlight>
      <ComboboxInput aria-label="Buscar fruta" placeholder="Busca una fruta…" className="w-80" />
      <ComboboxContent>
        <ComboboxEmpty>No hay sugerencias.</ComboboxEmpty>
        <ComboboxList>{(fruit: string) => <ComboboxItem key={fruit} value={fruit}><HighlightMatch text={fruit} query={query} /></ComboboxItem>}</ComboboxList>
      </ComboboxContent>
    </Combobox>;
  },
};