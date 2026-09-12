import { defineQuery } from "next-sanity";
import type { HomepageContent } from "@/components/homepage/content";

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
    header { navigation[]{_key, label, href, mobileOnly}, give },
    footer { summary, navigationTitle, navigation[]{_key, label, href}, legalNavigation[]{_key, label, href}, copyright,
      offices[] { _key, country, address[]{_key, _type, style, children[]{_key, _type, text, marks}, markDefs[]}, phone, tel, email }
    }
  }`,
);

export const PAGE_QUERY = defineQuery(
	`*[_type == "page" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    ${BODY_PROJECTION}
  }`,
);

export const PAGE_SLUGS_QUERY = defineQuery(
	`*[_type == "page" && defined(slug.current)]{ "slug": slug.current }`,
);

export type HomePage = HomepageContent & { _id: string };

export type Page = {
	_id: string;
	title: string;
	slug: { current: string };
	body?: unknown[] | null;
};
