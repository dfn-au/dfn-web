"use client";

import { ArrowLeftIcon } from "@sanity/icons/ArrowLeft";
import {
	Box,
	Button,
	Card,
	Container,
	Flex,
	Heading,
	Label,
	Spinner,
	Stack,
	Text,
} from "@sanity/ui";
import type { ReactNode } from "react";
import { AdminSignOut } from "./admin-sign-out";

export function AdminToolbar({ studio = false }: { studio?: boolean }) {
	return (
		<Card as="header" borderBottom padding={3}>
			<Flex align="center" justify="space-between" gap={3} wrap="wrap">
				{studio ? (
					<Button
						as="a"
						href="/admin"
						icon={ArrowLeftIcon}
						text="Back to admin"
						mode="bleed"
					/>
				) : (
					<Text weight="semibold" size={1}>
						DFN admin
					</Text>
				)}
				{!studio && (
					<Box flex="none">
						<AdminSignOut />
					</Box>
				)}
			</Flex>
		</Card>
	);
}

export function AdminPage({
	title,
	eyebrow,
	description,
	back = false,
	children,
}: {
	title: string;
	eyebrow: string;
	description: string;
	back?: boolean;
	children: ReactNode;
}) {
	return (
		<>
			<AdminToolbar />
			<Container as="main" width={3} padding={[4, 5, 6]}>
				<Stack gap={5}>
					{back && (
						<Box>
							<Button
								as="a"
								href="/admin"
								icon={ArrowLeftIcon}
								text="Admin"
								mode="bleed"
							/>
						</Box>
					)}
					<Stack gap={4}>
						<Label muted>{eyebrow}</Label>
						<Heading as="h1" size={[3, 4]}>
							{title}
						</Heading>
						<Text as="p" size={2} muted>
							{description}
						</Text>
					</Stack>
					{children}
				</Stack>
			</Container>
		</>
	);
}

export function AdminStatus({
	title,
	children,
}: {
	title: string;
	children: ReactNode;
}) {
	return (
		<Container as="main" width={1} padding={4} paddingY={[5, 6]}>
			<Card border radius={3} padding={[4, 5]}>
				<Stack gap={4}>
					<Heading as="h1" size={2}>
						{title}
					</Heading>
					{children}
				</Stack>
			</Card>
		</Container>
	);
}

export function AdminLoading({ text }: { text: string }) {
	return (
		<Flex align="center" justify="center" gap={3} padding={5} role="status">
			<Spinner muted />
			<Text muted>{text}</Text>
		</Flex>
	);
}

export function AdminSignedOut() {
	return (
		<AdminStatus title="You’re signed out">
			<Text as="p" muted>
				Your admin and Studio session has ended.
			</Text>
			<Box>
				<Button
					as="a"
					href="/admin/login"
					text="Sign in again"
					tone="primary"
				/>
			</Box>
		</AdminStatus>
	);
}
