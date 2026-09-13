"use client";

import { ArrowRightIcon } from "@sanity/icons/ArrowRight";
import { CogIcon } from "@sanity/icons/Cog";
import { EditIcon } from "@sanity/icons/Edit";
import { WarningOutlineIcon } from "@sanity/icons/WarningOutline";
import {
	Badge,
	Box,
	Button,
	Card,
	Flex,
	Grid,
	Heading,
	Stack,
	Text,
} from "@sanity/ui";

export function AdminDashboard() {
	return (
		<Grid
			as="section"
			aria-label="Admin tools"
			gridTemplateColumns={[1, 1, 2]}
			gap={4}
		>
			{[
				{
					title: "Content Studio",
					category: "Content",
					description:
						"Edit Sanity-authored pages, stories, settings, and launch content.",
					href: "/admin/studio",
					action: "Open Studio",
					icon: EditIcon,
				},
				{
					title: "Error testing",
					category: "Diagnostics",
					description:
						"Trigger client and server errors to verify error reporting.",
					href: "/admin/errors",
					action: "Open error tests",
					icon: WarningOutlineIcon,
				},
			].map(({ title, category, description, href, action, icon: Icon }) => (
				<Card key={href} border radius={3} padding={4}>
					<Flex direction="column" gap={4} height="fill">
						<Flex align="center" gap={3}>
							<Text size={3}>
								<Icon />
							</Text>
							<Text size={1} muted>
								{category}
							</Text>
						</Flex>
						<Heading as="h2" size={2}>
							{title}
						</Heading>
						<Text as="p" muted>
							{description}
						</Text>
						<Box flex={1} />
						<Box>
							<Button
								as="a"
								href={href}
								text={action}
								iconRight={ArrowRightIcon}
								mode="ghost"
								tone="primary"
							/>
						</Box>
					</Flex>
				</Card>
			))}
			<Card border radius={3} padding={4} tone="transparent">
				<Stack gap={4}>
					<Flex align="center" justify="space-between" gap={3}>
						<Flex align="center" gap={3}>
							<Text size={3} muted>
								<CogIcon />
							</Text>
							<Text size={1} muted>
								Operations
							</Text>
						</Flex>
						<Badge>Coming soon</Badge>
					</Flex>
					<Heading as="h2" size={2}>
						Operational tools
					</Heading>
					<Text as="p" muted>
						Exports, payment views, event workflows, and reporting will be
						available here.
					</Text>
				</Stack>
			</Card>
		</Grid>
	);
}
