"use client";

import { createContext } from "react";
import type { Palette } from "./palettes";

export const PaletteContext = createContext<{
	palette: Palette;
	controlsVisible: boolean;
	documentUrl?: string;
}>({ palette: "charcoal", controlsVisible: true });
