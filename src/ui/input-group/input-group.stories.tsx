import type { Meta, StoryObj } from "@storybook/react-vite";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "./input-group";
const meta = { title: "Components/Forms/Input Group", component: InputGroup } satisfies Meta<typeof InputGroup>; export default meta; type Story = StoryObj<typeof meta>;
export const Currency: Story = { render: () => <InputGroup className="max-w-xs"><InputGroupAddon><InputGroupText>€</InputGroupText></InputGroupAddon><InputGroupInput aria-label="Precio" placeholder="0,00" /></InputGroup> };
