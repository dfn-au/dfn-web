"use client";

import { Card, ThemeProvider, usePrefersDark } from "@sanity/ui";
import { buildTheme } from "@sanity/ui/theme";
import {
	createContext,
	type ReactNode,
	useContext,
	useSyncExternalStore,
} from "react";

type Scheme = "system" | "light" | "dark";
const storageKey = "dfn-admin-appearance";
const changeEvent = "dfn-admin-appearance-change";
let fallbackScheme: Scheme = "system";
const theme = buildTheme();
const AppearanceContext = createContext<{
	scheme: Scheme;
	setScheme: (scheme: Scheme) => void;
} | null>(null);

function getScheme(): Scheme {
	try {
		const value = localStorage.getItem(storageKey);
		return value === "light" || value === "dark" ? value : "system";
	} catch {
		return fallbackScheme;
	}
}

function subscribe(onChange: () => void) {
	window.addEventListener("storage", onChange);
	window.addEventListener(changeEvent, onChange);
	return () => {
		window.removeEventListener("storage", onChange);
		window.removeEventListener(changeEvent, onChange);
	};
}

function setScheme(scheme: Scheme) {
	fallbackScheme = scheme;
	try {
		localStorage.setItem(storageKey, scheme);
	} catch {
		// Keep the selection for this page when browser storage is unavailable.
	}
	window.dispatchEvent(new Event(changeEvent));
}

export function AdminTheme({ children }: { children: ReactNode }) {
	const scheme = useSyncExternalStore<Scheme>(
		subscribe,
		getScheme,
		() => "system",
	);
	const prefersDark = usePrefersDark();
	return (
		<AppearanceContext.Provider value={{ scheme, setScheme }}>
			<ThemeProvider
				theme={theme}
				scheme={scheme === "system" ? (prefersDark ? "dark" : "light") : scheme}
			>
				<Card style={{ minHeight: "100dvh" }}>{children}</Card>
			</ThemeProvider>
		</AppearanceContext.Provider>
	);
}

export function useAdminAppearance() {
	const appearance = useContext(AppearanceContext);
	if (!appearance) throw new Error("AdminTheme is required");
	return appearance;
}
