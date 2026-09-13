const storageKey = "dfn-sanity-login";
const stateParameter = "dfnLoginState";
const lifetime = 30 * 60 * 1000;

export class InvalidSanityCallback extends Error {
	constructor() {
		super(
			"This sign-in link has expired or was not started in this tab. Please sign in again.",
		);
	}
}

function hasCredential(url: URL) {
	// Sanity's parsers match these substrings, not just URLSearchParams keys.
	return /(?:sid|token|claim)=/.test(url.hash);
}

function withoutState(url: URL) {
	url.searchParams.delete(stateParameter);
	return `${url.pathname}${url.search}`;
}

export function createSanityLoginReturnPath(path: string) {
	const url = new URL(path, window.location.origin);
	if (
		url.origin !== window.location.origin ||
		!/^\/admin\/(?:login$|studio(?:\/|$))/.test(url.pathname)
	) {
		throw new Error("Invalid sign-in return path");
	}
	const returnPath = withoutState(url);
	const state = crypto.randomUUID();
	// sessionStorage binds the attempt to this tab, independently of the callback URL.
	sessionStorage.setItem(
		storageKey,
		JSON.stringify({ state, returnPath, expiresAt: Date.now() + lifetime }),
	);
	url.searchParams.set(stateParameter, state);
	return `${url.pathname}${url.search}`;
}

export function validateSanityCallback() {
	const url = new URL(window.location.href);
	if (!hasCredential(url)) return;
	const states = url.searchParams.getAll(stateParameter);
	const returnPath = withoutState(url);
	let valid = false;
	try {
		const stored = sessionStorage.getItem(storageKey);
		// Consume once, even for a rejected attempt. Never store callback credentials.
		sessionStorage.removeItem(storageKey);
		const transaction: unknown = stored ? JSON.parse(stored) : null;
		valid =
			typeof transaction === "object" &&
			transaction !== null &&
			"state" in transaction &&
			states.length === 1 &&
			states[0] === transaction.state &&
			"returnPath" in transaction &&
			transaction.returnPath === returnPath &&
			"expiresAt" in transaction &&
			typeof transaction.expiresAt === "number" &&
			transaction.expiresAt > Date.now() &&
			transaction.expiresAt <= Date.now() + lifetime;
	} catch {
		// Storage unavailable or malformed: refuse the credential before loading Sanity.
	}
	if (!valid) url.hash = "";
	window.history.replaceState(window.history.state, "", url);
	if (!valid) throw new InvalidSanityCallback();
}

// Same-document fragment navigation must not feed credentials to an already loaded Studio.
// Provider redirects reload the document and go through validateSanityCallback instead.
export function protectSanityHashNavigation() {
	function rejectCredential(event: Event) {
		const url = new URL(window.location.href);
		if (!hasCredential(url)) return;
		withoutState(url);
		url.hash = "";
		window.history.replaceState(window.history.state, "", url);
		event.stopImmediatePropagation();
	}
	window.addEventListener("hashchange", rejectCredential, true);
	window.addEventListener("popstate", rejectCredential, true);
	return () => {
		window.removeEventListener("hashchange", rejectCredential, true);
		window.removeEventListener("popstate", rejectCredential, true);
	};
}
