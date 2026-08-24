import type { Preview } from "@storybook/react-vite";
import "../src/styles.css";
import "./preview.css";
import { doscientosTheme } from "./theme";

const preview: Preview = {
  tags: ["autodocs", "test:ui"],
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
    viewport: {
      options: {
        mobile: { name: "Móvil", styles: { width: "375px", height: "812px" }, type: "mobile" },
        tablet: { name: "Tablet", styles: { width: "768px", height: "1024px" }, type: "tablet" },
        desktop: { name: "Escritorio", styles: { width: "1280px", height: "900px" }, type: "desktop" },
      },
    },
    chromatic: {
      modes: {
        "claro escritorio": { theme: "light", viewport: "desktop" },
        "oscuro escritorio": { theme: "dark", viewport: "desktop" },
        "claro móvil": { theme: "light", viewport: "mobile" },
      },
    },
    options: {
      storySort: {
        order: ["Introducción", "Foundations", "Components", "Patterns", "Application"],
      },
    },
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
