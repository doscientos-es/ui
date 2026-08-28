import { create } from "storybook/theming";

/** Keep Storybook's native light theme and override brand elements only. */
export const doscientosTheme = create({
  base: "light",
  brandTitle: "doscientos UI",
  brandUrl: "https://doscientos.es",
  brandImage: "/doscientos-mark.svg",
  brandTarget: "_self",
  colorPrimary: "#2a4227",
  colorSecondary: "#355f31",
});
