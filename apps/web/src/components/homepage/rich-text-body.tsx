import { PortableText, type PortableTextComponents } from "next-sanity";

import type { AreaContent, FooterContent } from "./content";

type RichTextValue =
	| AreaContent["body"]
	| NonNullable<FooterContent["offices"]>[number]["address"];

const components = {
	address: {
		block: {
			normal: ({ children }) => (
				<p className="mb-2.5 leading-[1.65] text-muted">{children}</p>
			),
		},
	},
	programme: {
		block: {
			normal: ({ children }) => (
				<p className="mb-[23px] max-w-[60ch] text-copy leading-[1.65] text-muted">
					{children}
				</p>
			),
		},
	},
	pathways: {
		block: {
			normal: ({ children }) => (
				<p className="mb-[17px] max-w-[380px] text-copy leading-[1.65] text-muted">
					{children}
				</p>
			),
		},
	},
	example: {
		block: {
			normal: ({ children }) => (
				<p className="mb-[18px] max-w-[60ch] text-copy leading-[1.65] text-muted">
					{children}
				</p>
			),
		},
	},
} satisfies Record<
	string,
	PortableTextComponents<NonNullable<RichTextValue>[number]>
>;

export function RichTextBody({
	value,
	variant,
}: {
	value?: RichTextValue;
	variant: keyof typeof components;
}) {
	return <PortableText value={value ?? []} components={components[variant]} />;
}
