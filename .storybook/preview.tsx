import type { Preview } from "@storybook/react-vite";
import "../src/styles.css";
import "./preview.css";
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
    (Story, context) => {
      const canvasClassName = [
        "storybook-canvas",
        context.globals.theme === "dark" && "dark",
        context.parameters.layout === "fullscreen" && "storybook-canvas--fullscreen",
      ]
        .filter(Boolean)
        .join(" ");

      return (
        <div className={canvasClassName}>
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
