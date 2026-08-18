import type { Preview } from "@storybook/react-vite";
import "../src/styles.css";

const preview: Preview = {
  parameters: {
    layout: "centered",
    controls: { expanded: true },
    a11y: { test: "error" },
  },
  decorators: [
    (Story) => (
      <div className="min-w-80 bg-background p-8 text-foreground">
        <Story />
      </div>
    ),
  ],
};

export default preview;