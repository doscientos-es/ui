import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from "./avatar";
const meta = { title: "Components/Data Display/Avatar", component: Avatar } satisfies Meta<typeof Avatar>; export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = { render: () => <Avatar><AvatarImage src="https://i.pravatar.cc/80?img=12" alt="Ana" /><AvatarFallback>AN</AvatarFallback><AvatarBadge /></Avatar> }; export const Group: Story = { render: () => <AvatarGroup><Avatar><AvatarFallback>AN</AvatarFallback></Avatar><Avatar><AvatarFallback>BC</AvatarFallback></Avatar><AvatarGroupCount>+4</AvatarGroupCount></AvatarGroup> };
