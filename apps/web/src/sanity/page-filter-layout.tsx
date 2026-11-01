import { Box, Button, Card, Flex, Text } from "@sanity/ui";
import { useMemo } from "react";
import type { ActiveToolLayoutProps } from "sanity";
import { useRouter, useRouterState } from "sanity/router";
import type { RouterPanes } from "sanity/structure";
import { getPageFilter, pageFilters } from "./page-filters";
import { createStructure } from "./structure";

export function PageFilterLayout(props: ActiveToolLayoutProps) {
	const router = useRouter();
	const state = useRouterState();
	// Structure's router decodes each pane group into RouterPanes.
	const panes = (state.panes as RouterPanes | undefined) ?? [];
	const pagePane = panes[0]?.[0];
	const selected = getPageFilter(pagePane?.params?.scope);
	// Sanity caches resolved panes by ID, not URL params. A new structure
	// resolver refreshes the native list when the selected scope changes.
	const activeTool = useMemo(
		() => ({
			...props.activeTool,
			options: {
				...props.activeTool.options,
				structure: createStructure(selected.id),
			},
		}),
		[props.activeTool, selected.id],
	);
	if (props.activeTool.name !== "structure" || pagePane?.id !== "page") {
		return props.renderDefault(props);
	}

	return (
		<Flex direction="column" height="fill">
			<Card borderBottom padding={3}>
				<Flex
					align="center"
					gap={2}
					wrap="wrap"
					role="group"
					aria-label="Filter pages by publishing scope"
				>
					<Box marginRight={2}>
						<Text size={1} weight="medium">
							Pages
						</Text>
					</Box>
					{pageFilters.map(({ id, title }) => (
						<Button
							key={id}
							text={title}
							mode="bleed"
							selected={selected.id === id}
							aria-pressed={selected.id === id}
							onClick={() =>
								router.navigate({
									...state,
									panes: [
										[
											{
												...pagePane,
												params: { ...pagePane.params, scope: id },
											},
										],
										...panes.slice(1),
									],
								})
							}
						/>
					))}
				</Flex>
			</Card>
			<Flex flex={1} style={{ minHeight: 0 }}>
				{props.renderDefault({ ...props, activeTool })}
			</Flex>
		</Flex>
	);
}
