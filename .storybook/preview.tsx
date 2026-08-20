import type { Preview } from "@storybook/react-vite";
import "../src/styles.css";
import { doscientosTheme } from "./theme";

const preview: Preview = {
  initialGlobals: {
    theme: "light",
  },
  globalTypes: {
    theme: {
      description: "Tema de los componentes en el lienzo",
      toolbar: {
        icon: "mirror",
        items: [
          { value: "light", title: "Claro" },
          { value: "dark", title: "Oscuro" },
        ],
      },
    },
  },
  parameters: {
    layout: "padded",
    controls: { expanded: true },
    a11y: { test: "error" },
    docs: { theme: doscientosTheme },
  },
  decorators: [
    (Story, context) => (
      <div
        className={`${context.globals.theme === "dark" ? "dark " : ""}min-h-80 min-w-80 bg-background p-8 text-foreground`}
        style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}
      >
        <Story />
      </div>
    ),
  ],
};

export default preview;
