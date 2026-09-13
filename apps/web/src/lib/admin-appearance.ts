import { buildTheme } from "@sanity/ui/theme";

export const adminTheme = buildTheme();
if (!adminTheme.v2) throw new Error("Sanity UI v2 theme is required");

// Paint the Studio background immediately, before client scripts or styles load.
export const appearanceStyles = `
:root {
  color-scheme: dark;
  background: ${adminTheme.v2.color.dark.default.bg};
  color: ${adminTheme.v2.color.dark.default.fg};
}`;
