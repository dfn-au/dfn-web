import type { PortableTextBlock } from "next-sanity";
import type { HomepageContent } from "@/components/homepage/content";

function paragraphsToBody(paragraphs: string[]): PortableTextBlock[] {
	return paragraphs.map((text, index) => ({
		_type: "block",
		_key: `paragraph-${index}`,
		style: "normal",
		markDefs: [],
		children: [{ _type: "span", _key: "text", text, marks: [] }],
	}));
}

// Static copy for the retained design reference routes only.
export const previewHomepage: Omit<HomepageContent, "title" | "description"> = {
	hero: {
		eyebrow: "Dignity Freedom Network",
		headline: "Dignity. Freedom.\nOpportunity.",
		description:
			"Locally led education, healthcare and livelihood programmes, alongside protection for vulnerable communities in South Asia.",
		photograph: {
			_type: "homepagePhotograph",
			alt: "A woman and child photographed for DFN",
		},
		actionLabel: "Explore our work",
	},
	introduction: {
		eyebrow: "Four areas. One purpose.",
		headline: "Local people.\nLasting change.",
		description:
			"Our programmes are designed, led and staffed by local teams. Through education, healthcare, economic empowerment and support for vulnerable communities, we work towards a future where people can live with dignity and freedom.",
	},
	areas: [
		{
			_key: "education",
			_type: "programmeFeature",
			contentType: "photograph",
			label: "Education",
			headline: "The freedom\nto learn.",
			body: paragraphsToBody([
				"Education opens doors and gives children a reason to dream. Our schools provide quality, English-medium education for children from poor and marginalised communities, alongside healthcare, sport and the arts.",
				"Respect, self-worth, dignity and equality are part of that education.",
			]),
			photograph: {
				_type: "homepagePhotograph",
				alt: "A teacher and pupils taking part in a classroom lesson",
			},
			actionLabel: "Explore education",
		},
		{
			_key: "health",
			_type: "programmeFeature",
			contentType: "photograph",
			label: "Healthcare",
			headline: "Care that reaches\nthe community.",
			body: paragraphsToBody([
				"Good health is essential to breaking the poverty cycle. Community Health Workers, primary clinics and HIV/AIDS centres help prevent sickness and disease, bringing care closer to the people who need it.",
			]),
			photograph: {
				_type: "homepagePhotograph",
				alt: "A community health worker checking a woman's blood pressure",
			},
			actionLabel: "Explore healthcare",
		},
		{
			_key: "enterprise",
			_type: "programmeFeature",
			contentType: "pathways",
			label: "Economic empowerment",
			headline: "Skills today.\nIndependence tomorrow.",
			body: paragraphsToBody([
				"The opportunity to earn a livelihood helps people become self-sufficient and hold their heads up high.",
			]),
			actionLabel: "Explore economic empowerment",
			pathways: [
				{
					_key: "training",
					title: "Vocational training",
					description: "Practical skills to help people earn a living.",
				},
				{
					_key: "grants",
					title: "Business start-up grants",
					description: "Support to take the first step towards a livelihood.",
				},
				{
					_key: "groups",
					title: "Self-help groups",
					description: "People supporting one another to move forward.",
				},
			],
		},
		{
			_key: "women",
			_type: "programmeFeature",
			contentType: "photograph",
			label: "Vulnerable communities",
			headline: "A future with\ndignity and hope.",
			body: paragraphsToBody([
				"Prevention and awareness programmes support at-risk women and girls and their communities. Our teams work to protect vulnerable girls, rescue women and girls from abuse, and help them find a new future.",
			]),
			photograph: {
				_type: "homepagePhotograph",
				alt: "A girl photographed for DFN's work with vulnerable communities",
			},
			actionLabel: "Explore this work",
		},
	],
	featuredExample: {
		eyebrow: "From DFN’s work / LAMP self-help groups",
		headline: "Confidence grows\nwith community.",
		body: paragraphsToBody([
			"In DFN’s LAMP self-help groups, women build confidence through mutual support. Local staff help members access government benefits, open a bank account and learn to manage and save money.",
			"Small business grants can also help members take the next step towards earning a livelihood.",
		]),
		actionLabel: "Read about LAMP groups",
	},
	involvement: {
		eyebrow: "Be part of the change",
		headline: "There’s a place\nfor you in this work.",
		actionLabel: "Make a donation",
		opportunities: [
			{
				_key: "give",
				title: "Give in your own way.",
				description:
					"Discover ways to support DFN’s work across our four areas of focus.",
				actionLabel: "Ways to give",
			},
			{
				_key: "events",
				title: "Bring people together.",
				description: "Join a DFN event or organise an event of your own.",
				actionLabel: "Explore events",
			},
			{
				_key: "advocate",
				title: "Use your voice.",
				description:
					"Help others learn about the work and the communities behind it.",
				actionLabel: "Become an advocate",
			},
		],
	},
	signup: {
		eyebrow: "Receive updates from DFN",
		headline: "Stay close\nto the work.",
		description:
			"Hear about DFN’s programmes, events and ways to get involved.",
		actionLabel: "Sign up",
	},
	header: {
		navigation: [
			{ _key: "work", label: "Our work", href: "#dh-work" },
			{ _key: "about", label: "About DFN", href: "/about" },
			{ _key: "involved", label: "Get involved", href: "#dh-involved" },
			{
				_key: "updates",
				label: "Receive updates",
				href: "#dh-signup",
				mobileOnly: true,
			},
			{
				_key: "contact",
				label: "Contact DFN",
				href: "#dh-contact",
				mobileOnly: true,
			},
		],
		give: "Give",
	},
	footer: {
		summary:
			"Working towards dignity and freedom for marginalised communities in South Asia.",
		navigationTitle: "Explore DFN",
		navigation: [
			{ _key: "work", label: "Our work", href: "#dh-work" },
			{ _key: "about", label: "About DFN", href: "/about" },
			{
				_key: "stories",
				label: "Stories",
				href: "https://dfn.org.au/stories/",
			},
			{
				_key: "involved",
				label: "Get involved",
				href: "https://dfn.org.au/help/",
			},
			{
				_key: "contact",
				label: "Contact",
				href: "https://dfn.org.au/contact/",
			},
		],
		legalNavigation: [
			{
				_key: "privacy",
				label: "Privacy",
				href: "https://dfn.org.au/privacy-policy/",
			},
			{
				_key: "fundraising",
				label: "Ethical fundraising",
				href: "https://dfn.org.au/ethical-fundraising-standards/",
			},
			{ _key: "faqs", label: "FAQs", href: "https://dfn.org.au/faqs/" },
		],
		copyright: "© 2026 Dignity Freedom Network",
		offices: [
			{
				_key: "au",
				country: "Australia",
				address: paragraphsToBody(["P.O. Box 7\nNunawading\nVIC 3131"]),
				phone: "1800 949 774",
				tel: "1800949774",
				email: "info@dfn.org.au",
			},
			{
				_key: "nz",
				country: "New Zealand",
				address: paragraphsToBody([
					"PO Box 10053, Bayfair\nMount Maunganui 3152",
				]),
				phone: "022 672 0260",
				tel: "+64226720260",
				email: "info@dfn.org.nz",
			},
		],
	},
};
