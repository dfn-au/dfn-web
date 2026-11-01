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

// A separate menu never falls back to the shared or other country's list.
// Missing mode uses existing shared menus saved before country choices existed.
const menuValue = <Name extends string>(name: Name) =>
	`select(${name}Mode == "country" => select(
    $countrySite == "AU" => ${name}AU,
    $countrySite == "NZ" => ${name}NZ
  ), ${name})` as const;

// A selected page is authoritative. An unavailable target must not revive a
// previously entered URL. Scope is checked again when public content is read.
const linkHref = <PageField extends string, UrlField extends string>(
	pageField: PageField,
	urlField: UrlField,
) =>
	`select(defined(${pageField}) => ${pageField}->{
    "path": select(
      _type == "homePage" && _id == "homePage" => "/",
      _type == "page" && defined(slug.current) &&
        (!defined(publishingScope) || $countrySite in publishingScope) => "/" + slug.current
    )
  }.path, ${urlField})` as const;
const LINK_FIELDS = `label, "href": ${linkHref("page", "href")}` as const;

const HEADER_PROJECTION = `header {
  "navigation": ${menuValue("navigation")}[]{_key, label, "href": ${linkHref("page", "href")}, headline, description,
    children[]{_key, label, "href": ${linkHref("page", "href")}, groupLabel}[defined(href)]
  }[defined(href) || count(children) > 0],
  menuHeading, give, "giveHref": ${linkHref("givePage", 'coalesce(giveHref, "https://dfn.org.au/donate/")')}
}` as const;

const FOOTER_PROJECTION = `footer {
  summary, navigationTitle,
  "navigation": ${menuValue("navigation")}[]{_key, ${LINK_FIELDS}}[defined(href)],
  "legalNavigation": ${menuValue("legalNavigation")}[]{_key, ${LINK_FIELDS}}[defined(href)],
  copyright,
  offices[country == select($countrySite == "AU" => "Australia", $countrySite == "NZ" => "New Zealand")]{
    _key, country, address, phone, tel, email
  }
}` as const;

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
    ${FOOTER_PROJECTION}
  }`,
);

// Reuse the currently authored header/footer while their editing home remains
// in Home Page. Pages do not contain copies of navigation or office details.
export const SITE_CHROME_QUERY =
	defineQuery(`*[_type == "homePage" && _id == "${HOME_PAGE_DOCUMENT_ID}"][0]{
    ${HEADER_PROJECTION},
    ${FOOTER_PROJECTION}
}`);
export type SiteChrome = NonNullable<
	SITE_CHROME_QUERY_RESULT | StegaBranded<SITE_CHROME_QUERY_RESULT>
>;

// Pages without a saved Publishing Scope remain available on both sites.
export const PAGE_QUERY = defineQuery(
	`*[_type == "page" && slug.current == $slug &&
    (!defined(publishingScope) || $countrySite in publishingScope)][0]{
    _id,
    title,
    description,
    slug,
    sections[]{
      _key, _type, navigationLabel,
      _type == "pageTitle" => {headline},
      _type == "richTextSection" => {body${RICH_TEXT_PROJECTION}},
      _type == "introSection" => {
        eyebrow, headline, body${RICH_TEXT_PROJECTION}, accentText, lead,
        image{_type, alt, caption, crop, hotspot, asset->{_id, url}}
      },
      _type == "imageTextSection" => {
        eyebrow, headline, body${RICH_TEXT_PROJECTION},
        image{_type, alt, caption, crop, hotspot, asset->{_id, url}},
        noteTitle, noteBody${RICH_TEXT_PROJECTION}
      },
      _type == "statementSection" => {
        eyebrow, headline, body${RICH_TEXT_PROJECTION}, statementLabel, statement, attribution
      },
      _type == "valuesSection" => {
        eyebrow, headline, body${RICH_TEXT_PROJECTION},
        items[]{_key, title, body${RICH_TEXT_PROJECTION}}
      },
      _type == "numberedSection" => {
        eyebrow, headline, body${RICH_TEXT_PROJECTION},
        items[]{_key, title, body${RICH_TEXT_PROJECTION}}, link{${LINK_FIELDS}}
      },
      _type == "actionSection" => {
        eyebrow, headline, body${RICH_TEXT_PROJECTION},
        links[]{_key, ${LINK_FIELDS}}[defined(href)], actionTitle, actionBody${RICH_TEXT_PROJECTION},
        primaryAction{${LINK_FIELDS}}, secondaryAction{${LINK_FIELDS}}
      }
    }
  }`,
);

export type HomePage = NonNullable<
	HOME_PAGE_QUERY_RESULT | StegaBranded<HOME_PAGE_QUERY_RESULT>
>;
export type Page = NonNullable<PAGE_QUERY_RESULT>;
