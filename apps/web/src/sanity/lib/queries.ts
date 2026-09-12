import { defineQuery } from "next-sanity";
import type {
	FooterContent,
	HeaderContent,
	HomepageContent,
} from "@/components/homepage/content";
import type { PageSection } from "@/components/page-sections/types";

import { HOME_PAGE_DOCUMENT_ID } from "../singletons";

const BODY_PROJECTION = `body[]{
  ...,
  markDefs[]{
    ...,
  },
  _type == "image" => {
    ...,
    asset->{
      _id,
      url,
      metadata {
        lqip,
        dimensions { width, height }
      }
    }
  }
}`;

const HOMEPAGE_IMAGE_PROJECTION = `{
  _type, alt, crop, hotspot, asset->{_id, url}
}`;

const HEADER_PROJECTION = `header {
  navigation[]{_key, label, href, headline, description, mobileOnly,
    children[]{_key, label, href, groupLabel}
  },
  utilityLinks[]{_key, label, href}, menuHeading, give, giveHref
}`;

export const HOME_PAGE_QUERY = defineQuery(
	`*[_id == "${HOME_PAGE_DOCUMENT_ID}"][0]{
    _id, title, description,
    hero { eyebrow, headline, description, actionLabel, photograph ${HOMEPAGE_IMAGE_PROJECTION} },
    introduction { eyebrow, headline, description },
    areas[] { _key, _type, label, headline, body[]{_key, _type, style, children[]{_key, _type, text, marks}, markDefs[]}, actionLabel, contentType,
      photograph ${HOMEPAGE_IMAGE_PROJECTION},
      pathways[] { _key, title, description }
    },
    featuredExample { eyebrow, headline, body[]{_key, _type, style, children[]{_key, _type, text, marks}, markDefs[]}, actionLabel },
    involvement { eyebrow, headline, actionLabel, opportunities[] { _key, title, description, actionLabel } },
    signup { eyebrow, headline, description, actionLabel },
    ${HEADER_PROJECTION},
    footer { summary, navigationTitle, navigation[]{_key, label, href}, legalNavigation[]{_key, label, href}, copyright,
      offices[] { _key, country, address[]{_key, _type, style, children[]{_key, _type, text, marks}, markDefs[]}, phone, tel, email }
    }
  }`,
);

// Reuse the currently authored header/footer while their editing home remains
// in Home Page. Pages do not contain copies of navigation or office details.
export const SITE_CHROME_QUERY =
	defineQuery(`*[_id == "${HOME_PAGE_DOCUMENT_ID}"][0]{
    ${HEADER_PROJECTION},
    footer { summary, navigationTitle, navigation[]{_key, label, href}, legalNavigation[]{_key, label, href}, copyright,
      offices[]{_key, country, address[]{_key, _type, style, children[]{_key, _type, text, marks}, markDefs[]}, phone, tel, email}
    }
}`);
export type SiteChrome = { header?: HeaderContent; footer?: FooterContent };

export const PAGE_QUERY = defineQuery(
	`*[_type == "page" && slug.current == $slug][0]{
    _id,
    title,
    description,
    slug,
    sections[]{
      _key, _type, navigationLabel, eyebrow, headline, accentText, lead,
      ${BODY_PROJECTION},
      image{_type, alt, caption, crop, hotspot, asset->{_id, url}},
      noteTitle, "noteBody": noteBody[]{..., markDefs[]{...}, _type == "image" => {..., asset->{_id, url, metadata{lqip, dimensions}}}},
      statementLabel, statement, attribution,
      link{_key, label, href},
      items[]{_key, title, ${BODY_PROJECTION}},
      links[]{_key, label, href}, actionTitle,
      "actionBody": actionBody[]{..., markDefs[]{...}, _type == "image" => {..., asset->{_id, url, metadata{lqip, dimensions}}}},
      primaryAction{_key, label, href}, secondaryAction{_key, label, href}
    }
  }`,
);

export type HomePage = HomepageContent & { _id: string };

export type Page = {
	_id: string;
	title: string;
	slug: { current: string };
	description?: string | null;
	sections?: PageSection[] | null;
};
