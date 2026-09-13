"use client";

import { Box, Button, Card, Grid, Heading, Stack, Text } from "@sanity/ui";
import { useState } from "react";
import {
	ADMIN_REQUEST_HEADER,
	adminAuthMessages,
} from "@/lib/admin-auth-shared";

const clientErrorMessage = "Admin test: unhandled client-side error";

export function ErrorTestControls() {
	const [serverResult, setServerResult] = useState<string>();

	function triggerClientError() {
		setTimeout(() => {
			throw new Error(clientErrorMessage);
		});
	}

	async function triggerServerError() {
		setServerResult("Sending request...");

		try {
			const response = await fetch("/admin/errors/server", {
				method: "POST",
				headers: { [ADMIN_REQUEST_HEADER]: "1" },
			});
			if (response.status === 401) {
				window.location.assign("/admin/login?returnTo=%2Fadmin%2Ferrors");
				return;
			}
			if (response.status === 403 || response.status === 503) {
				setServerResult(adminAuthMessages[response.status]);
				return;
			}

			setServerResult(
				response.ok
					? `Unexpected response: ${response.status}`
					: `Server returned ${response.status}. Check the server logs for "Admin test: unhandled server-side error".`,
			);
		} catch {
			setServerResult(
				"Request failed before a response was received. Check the server logs.",
			);
		}
	}

	return (
		<Grid gridTemplateColumns={[1, 1, 2]} gap={4}>
			<Card as="section" border radius={3} padding={4}>
				<Stack gap={4}>
					<Text size={1} muted>
						Browser
					</Text>
					<Heading as="h2" size={2}>
						Client-side error
					</Heading>
					<Text as="p" muted>
						Throws an unhandled error in the browser. Check the browser console
						for the error message below.
					</Text>
					<Card padding={3} radius={2} tone="transparent">
						<Text as="code" size={1} style={{ overflowWrap: "anywhere" }}>
							{clientErrorMessage}
						</Text>
					</Card>
					<Box>
						<Button
							type="button"
							onClick={triggerClientError}
							text="Trigger client error"
							tone="caution"
							mode="ghost"
						/>
					</Box>
				</Stack>
			</Card>
			<Card as="section" border radius={3} padding={4}>
				<Stack gap={4}>
					<Text size={1} muted>
						Node.js
					</Text>
					<Heading as="h2" size={2}>
						Server-side error
					</Heading>
					<Text as="p" muted>
						Calls a route that throws an unhandled server error. Check the
						server logs.
					</Text>
					<Card padding={3} radius={2} tone="transparent">
						<Text as="code" size={1} style={{ overflowWrap: "anywhere" }}>
							Admin test: unhandled server-side error
						</Text>
					</Card>
					<Box>
						<Button
							type="button"
							onClick={triggerServerError}
							text="Trigger server error"
							tone="caution"
							mode="ghost"
							disabled={serverResult === "Sending request..."}
							loading={serverResult === "Sending request..."}
						/>
					</Box>
					{serverResult && (
						<Text as="p" aria-live="polite" size={1} muted>
							{serverResult}
						</Text>
					)}
				</Stack>
			</Card>
		</Grid>
	);
}
