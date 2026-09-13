"use client";

import { Card, ThemeProvider, usePrefersDark } from "@sanity/ui";
import {
	createContext,
	type ReactNode,
	useContext,
	useSyncExternalStore,
} from "react";
import { adminTheme, appearanceStorageKey } from "@/lib/admin-appearance";

type Scheme = "system" | "light" | "dark";
const changeEvent = "dfn-admin-appearance-change";
let fallbackScheme: Scheme = "system";
const AppearanceContext = createContext<{
	scheme: Scheme;
	setScheme: (scheme: Scheme) => void;
} | null>(null);

function getScheme(): Scheme {
	try {
		const value = localStorage.getItem(appearanceStorageKey);
		return value === "light" || value === "dark" ? value : "system";
	} catch {
		return fallbackScheme;
	}
}

function subscribe(onChange: () => void) {
	function update() {
		document.documentElement.dataset.adminAppearance = getScheme();
		onChange();
	}
	window.addEventListener("storage", update);
	window.addEventListener(changeEvent, update);
	return () => {
		window.removeEventListener("storage", update);
		window.removeEventListener(changeEvent, update);
	};
}

function setScheme(scheme: Scheme) {
	fallbackScheme = scheme;
	try {
		localStorage.setItem(appearanceStorageKey, scheme);
	} catch {
		// Keep the selection for this page when browser storage is unavailable.
	}
	window.dispatchEvent(new Event(changeEvent));
}

const subscribeToHydration = () => () => {};

export function AdminTheme({ children }: { children: ReactNode }) {
	const hydrated = useSyncExternalStore(
		subscribeToHydration,
		() => true,
		() => false,
	);
	const scheme = useSyncExternalStore<Scheme>(
		subscribe,
		getScheme,
		() => "system",
	);
	const prefersDark = usePrefersDark();
	return (
		<AppearanceContext.Provider value={{ scheme, setScheme }}>
			<ThemeProvider
				theme={adminTheme}
				scheme={scheme === "system" ? (prefersDark ? "dark" : "light") : scheme}
			>
				{/* The server cannot know the system or localStorage preference. */}
				<div hidden={!hydrated}>
					<Card style={{ minHeight: "100dvh" }}>{children}</Card>
				</div>
			</ThemeProvider>
		</AppearanceContext.Provider>
	);
}

export function useAdminAppearance() {
	const appearance = useContext(AppearanceContext);
	if (!appearance) throw new Error("AdminTheme is required");
	return appearance;
}
