import { buildTheme } from "@sanity/ui/theme";

export const appearanceStorageKey = "dfn-admin-appearance";
export const adminTheme = buildTheme();

// Inline in the document head so saved preferences apply before the first paint.
// Only fixed application code and a constant storage key enter this script.
export const appearanceScript = `(() => {
  let scheme = "system";
  try {
    const saved = localStorage.getItem(${JSON.stringify(appearanceStorageKey)});
    if (saved === "light" || saved === "dark") scheme = saved;
  } catch {}
  document.documentElement.dataset.adminAppearance = scheme;
})();`;

// CSS handles system appearance even before JavaScript runs. Use the actual
// Studio theme colors so the loading canvas and hydrated cards match exactly.
export const appearanceStyles = `
:root {
  color-scheme: light;
  background: ${adminTheme.v2?.color.light.default.bg};
  color: ${adminTheme.v2?.color.light.default.fg};
}
@media (prefers-color-scheme: dark) {
  :root:not([data-admin-appearance="light"]) {
    color-scheme: dark;
    background: ${adminTheme.v2?.color.dark.default.bg};
    color: ${adminTheme.v2?.color.dark.default.fg};
  }
}
:root[data-admin-appearance="dark"] {
  color-scheme: dark;
  background: ${adminTheme.v2?.color.dark.default.bg};
  color: ${adminTheme.v2?.color.dark.default.fg};
}`;
