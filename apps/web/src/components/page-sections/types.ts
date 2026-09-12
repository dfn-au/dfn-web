import type { PortableTextBlock } from "next-sanity";
import type { HomepageImage, NavigationItem } from "../homepage/content";

export type SectionImage = Omit<HomepageImage, "_type"> & {
	_type: "sectionImage";
} & { caption?: string };
type Base = { _key: string; navigationLabel?: string };
type Copy = { eyebrow?: string; headline?: string; body?: PortableTextBlock[] };
export type SectionLink = NavigationItem & { _type?: "homepageNavigationLink" };
export type PageSection =
	| (Base & { _type: "pageTitle"; headline?: string })
	| (Base & { _type: "richTextSection"; body?: PortableTextBlock[] })
	| (Base &
			Copy & {
				_type: "introSection";
				accentText?: string;
				lead?: string;
				image?: SectionImage;
			})
	| (Base & { _type: "sectionNavigation" })
	| (Base &
			Copy & {
				_type: "imageTextSection";
				image?: SectionImage;
				noteTitle?: string;
				noteBody?: PortableTextBlock[];
			})
	| (Base &
			Copy & {
				_type: "statementSection";
				statementLabel?: string;
				statement?: string;
				attribution?: string;
			})
	| (Base &
			Copy & {
				_type: "numberedSection";
				link?: SectionLink;
				items?: {
					_key: string;
					_type?: "sectionItem";
					title: string;
					body?: PortableTextBlock[];
				}[];
			})
	| (Base &
			Copy & {
				_type: "valuesSection";
				items?: {
					_key: string;
					_type?: "sectionItem";
					title: string;
					body?: PortableTextBlock[];
				}[];
			})
	| (Base &
			Copy & {
				_type: "actionSection";
				links?: SectionLink[];
				actionTitle?: string;
				actionBody?: PortableTextBlock[];
				primaryAction?: SectionLink;
				secondaryAction?: SectionLink;
			});
