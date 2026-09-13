"use client";

import { useEffect, useRef, useState } from "react";
import { createAuthStore, type LoginComponentProps } from "sanity";
import { AdminLoading } from "@/components/admin-ui";
import { dataset, projectId } from "@/sanity/env";
import { createSanityLoginReturnPath } from "./sanity-login-transaction";

// Used only by the guarded, dynamically imported login and Studio components.
export function createBoundSanityAuth() {
	const auth = createAuthStore({ projectId, dataset, loginMethod: "token" });
	const Login = auth.LoginComponent;
	if (!Login) throw new Error("Sanity login component is required");

	return {
		...auth,
		LoginComponent: function BoundLogin(props: LoginComponentProps) {
			const attempt = useRef<string | null>(null);
			const [returnPath, setReturnPath] = useState<string>();
			const [failed, setFailed] = useState(false);
			useEffect(() => {
				try {
					attempt.current ??= createSanityLoginReturnPath(
						props.redirectPath ?? props.basePath ?? "/admin/login",
					);
					setReturnPath(attempt.current);
				} catch {
					setFailed(true);
				}
			}, [props.redirectPath, props.basePath]);
			if (failed)
				throw new Error(
					"Browser storage is required to sign in. Enable it and reload this page.",
				);
			if (!returnPath) return <AdminLoading text="Preparing sign-in…" />;
			return <Login {...props} redirectPath={returnPath} />;
		},
	};
}
