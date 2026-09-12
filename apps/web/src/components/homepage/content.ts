import type { PortableTextBlock } from "next-sanity";

export type HomepageImage = {
	_type: "homepagePhotograph";
	alt: string;
	asset?: { _ref?: string; _id?: string; url?: string };
	crop?: { top: number; bottom: number; left: number; right: number };
	hotspot?: { x: number; y: number; width: number; height: number };
};

export type IntroductionContent = {
	eyebrow: string;
	headline: string;
	description: string;
};

export type AreaContent = {
	_key: string;
	_type: "programmeFeature";
	label: string;
	headline: string;
	body: PortableTextBlock[];
	actionLabel: string;
	contentType: "photograph" | "pathways";
	photograph?: HomepageImage;
	pathways?: { _key: string; title: string; description: string }[];
};

export type NavigationItem = {
	_key: string;
	label: string;
	href: string;
};

export type HeaderContent = {
	navigation: HeaderNavigationItem[];
	utilityLinks?: NavigationItem[];
	menuHeading?: string;
	give: string;
	giveHref?: string;
};

export type HeaderChildLink = NavigationItem & { groupLabel?: string };

export type HeaderNavigationItem = {
	_key: string;
	label: string;
	href?: string;
	headline?: string;
	description?: string;
	children?: HeaderChildLink[];
	/** Existing content is retained; the public header shows links on every device. */
	mobileOnly?: boolean;
};

export type FooterContent = {
	summary: string;
	navigationTitle: string;
	navigation: NavigationItem[];
	legalNavigation: NavigationItem[];
	copyright: string;
	offices: {
		_key: string;
		country: string;
		address: PortableTextBlock[];
		phone: string;
		tel: string;
		email: string;
	}[];
};

export type HomepageContent = {
	title: string;
	description: string;
	hero: IntroductionContent & {
		photograph: HomepageImage;
		actionLabel: string;
	};
	introduction: IntroductionContent;
	areas: AreaContent[];
	featuredExample: {
		eyebrow: string;
		headline: string;
		body: PortableTextBlock[];
		actionLabel: string;
	};
	involvement: {
		eyebrow: string;
		headline: string;
		actionLabel: string;
		opportunities: {
			_key: string;
			title: string;
			description: string;
			actionLabel: string;
		}[];
	};
	signup: IntroductionContent & { actionLabel: string };
	header: HeaderContent;
	footer: FooterContent;
};

// Keep anchors stable when editors change labels or reorder areas. Sanity keys
// are content identity; programme numbering is derived from the current order.
export function areaAnchor(area: Pick<AreaContent, "_key">) {
	return `area-${area._key}`;
}
