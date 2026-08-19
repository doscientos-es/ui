import { create } from "storybook/theming";

const fontBase = "Onest, ui-sans-serif, system-ui, sans-serif";

/** Shared manager and Docs theme using the approved Doscientos brand tokens. */
export const doscientosTheme = create({
  base: "light",
  fontBase,
  fontCode: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  brandTitle: "doscientos UI",
  brandUrl: "https://doscientos.es",
  brandImage: "/doscientos-mark.svg",
  brandTarget: "_self",
  colorPrimary: "#2a4227",
  colorSecondary: "#2a4227",
  appBg: "#f5f5f5",
  appContentBg: "#ffffff",
  appPreviewBg: "#fafafa",
  appBorderColor: "#d4d4d4",
  appBorderRadius: 10,
  textColor: "#171717",
  textInverseColor: "#ffffff",
  textMutedColor: "#737373",
  barTextColor: "#525252",
  barHoverColor: "#2a4227",
  barSelectedColor: "#2a4227",
  barBg: "#ffffff",
  buttonBg: "#ffffff",
  buttonBorder: "#d4d4d4",
  booleanBg: "#f5f5f5",
  booleanSelectedBg: "#bdff7b",
  inputBg: "#ffffff",
  inputBorder: "#d4d4d4",
  inputTextColor: "#171717",
  inputBorderRadius: 8,
});