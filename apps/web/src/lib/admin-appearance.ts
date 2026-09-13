import { buildTheme } from "@sanity/ui/theme";

export const adminTheme = buildTheme();

// Paint the Studio background immediately, before client scripts or styles load.
export const appearanceStyles = `
:root {
  color-scheme: dark;
  background: ${adminTheme.v2?.color.dark.default.bg};
  color: ${adminTheme.v2?.color.dark.default.fg};
}`;
