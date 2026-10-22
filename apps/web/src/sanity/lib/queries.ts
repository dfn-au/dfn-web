import { defineQuery, type StegaBranded } from "next-sanity";
import { HOME_PAGE_DOCUMENT_ID } from "../singletons";
import type {
	HOME_PAGE_QUERY_RESULT,
	PAGE_QUERY_RESULT,
	SITE_CHROME_QUERY_RESULT,
} from "../types";

const RICH_TEXT_PROJECTION = `[]{
  ...,
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
  navigation[]{_key, label, href, headline, description,
    children[]{_key, label, href, groupLabel}
  },
  menuHeading, give, giveHref
}`;

export const HOME_PAGE_QUERY = defineQuery(
	`*[_type == "homePage" && _id == "${HOME_PAGE_DOCUMENT_ID}"][0]{
    _id, title, description,
    hero { eyebrow, headline, description, actionLabel, photograph ${HOMEPAGE_IMAGE_PROJECTION} },
    introduction { eyebrow, headline, description },
    areas[] { _key, _type, label, headline, body, actionLabel, contentType,
      photograph ${HOMEPAGE_IMAGE_PROJECTION},
      pathways[] { _key, title, description }
    },
    featuredExample { eyebrow, headline, body, actionLabel },
    involvement { eyebrow, headline, actionLabel, opportunities[] { _key, title, description, actionLabel } },
    signup { eyebrow, headline, description, actionLabel },
    ${HEADER_PROJECTION},
    footer { summary, navigationTitle, navigation[]{_key, label, href}, legalNavigation[]{_key, label, href}, copyright,
      offices[] { _key, country, address, phone, tel, email }
    }
  }`,
);

// Reuse the currently authored header/footer while their editing home remains
// in Home Page. Pages do not contain copies of navigation or office details.
export const SITE_CHROME_QUERY =
	defineQuery(`*[_type == "homePage" && _id == "${HOME_PAGE_DOCUMENT_ID}"][0]{
    ${HEADER_PROJECTION},
    footer { summary, navigationTitle, navigation[]{_key, label, href}, legalNavigation[]{_key, label, href}, copyright,
      offices[]{_key, country, address, phone, tel, email}
    }
}`);
export type SiteChrome = NonNullable<SITE_CHROME_QUERY_RESULT>;

/**
 * Reads a field written with `sharedOrCountryFields`: the shared value, or this
 * Country Site's own value when the field varies by country. An empty
 * country value stays empty; it never falls back to the other country.
 */
// `as const` keeps the query's literal type, which sanityFetch uses to find
// its generated result type.
const countryValue = <Field extends string>(field: Field) =>
	`select(
    ${field}VariesByCountry => select(
      $countrySite == "AU" => ${field}AU,
      $countrySite == "NZ" => ${field}NZ
    ),
    ${field}
  )` as const;

const COPY_PROJECTION = `"eyebrow": ${countryValue("eyebrow")},
  "headline": ${countryValue("headline")},
  "body": ${countryValue("body")}${RICH_TEXT_PROJECTION}` as const;

// A page or section with no Publishing Scope was saved before scopes existed
// and appears on every site (see publishingScopeSites).
export const PAGE_QUERY = defineQuery(
	`*[
    _type == "page" && slug.current == $slug &&
    (!defined(publishingScope) || $countrySite in publishingScope)
  ][0]{
    _id,
    title,
    "browserTitle": ${countryValue("browserTitle")},
    "description": ${countryValue("description")},
    slug,
    sections[!defined(onlyOn) || onlyOn == $countrySite]{
      _key, _type, navigationLabel,
      _type == "pageTitle" => {"headline": ${countryValue("headline")}},
      _type == "richTextSection" => {"body": ${countryValue("body")}${RICH_TEXT_PROJECTION}},
      _type == "introSection" => {
        ${COPY_PROJECTION}, accentText, lead,
        image{_type, alt, caption, crop, hotspot, asset->{_id, url}}
      },
      _type == "imageTextSection" => {
        ${COPY_PROJECTION},
        image{_type, alt, caption, crop, hotspot, asset->{_id, url}},
        noteTitle, "noteBody": ${countryValue("noteBody")}${RICH_TEXT_PROJECTION}
      },
      _type == "statementSection" => {
        ${COPY_PROJECTION}, statementLabel, statement, attribution
      },
      _type == "valuesSection" => {
        ${COPY_PROJECTION},
        items[]{_key, title, "body": ${countryValue("body")}${RICH_TEXT_PROJECTION}}
      },
      _type == "numberedSection" => {
        ${COPY_PROJECTION},
        items[]{_key, title, "body": ${countryValue("body")}${RICH_TEXT_PROJECTION}}, link{label, href}
      },
      _type == "actionSection" => {
        ${COPY_PROJECTION},
        links[]{_key, label, href}, actionTitle, "actionBody": ${countryValue("actionBody")}${RICH_TEXT_PROJECTION},
        primaryAction{label, href}, secondaryAction{label, href}
      }
    }
  }`,
);

export type HomePage = NonNullable<
	HOME_PAGE_QUERY_RESULT | StegaBranded<HOME_PAGE_QUERY_RESULT>
>;
export type Page = NonNullable<PAGE_QUERY_RESULT>;
