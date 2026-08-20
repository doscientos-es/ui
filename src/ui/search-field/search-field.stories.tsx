import type { Meta, StoryObj } from "@storybook/react-vite";
import { SearchClearButton, SearchField, SearchInput } from "./search-field";

const meta = { title: "Components/Forms/Search Field", component: SearchField } satisfies Meta<typeof SearchField>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <SearchField aria-label="Buscar clientes" className="relative w-80"><SearchInput placeholder="Buscar clientes…" /><SearchClearButton aria-label="Borrar búsqueda" /></SearchField>,
};
