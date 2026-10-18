"use client";

import { createContext } from "react";

export const LinkContext = createContext<{
	controlsVisible: boolean;
	documentUrl?: string;
}>({ controlsVisible: true });
