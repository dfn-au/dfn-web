import { defineQuery } from "next-sanity";

import { HOME_PAGE_DOCUMENT_ID } from "../singletons";

export const HOME_PAGE_QUERY = defineQuery(
	`*[_id == "${HOME_PAGE_DOCUMENT_ID}"][0]{
    _id,
    title,
    body
  }`,
);

export const PAGE_QUERY = defineQuery(
	`*[_type == "page" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    body
  }`,
);

export const PAGE_SLUGS_QUERY = defineQuery(
	`*[_type == "page" && defined(slug.current)]{ "slug": slug.current }`,
);

export type HomePage = {
	_id: string;
	title: string;
	body?: unknown[] | null;
};

export type Page = {
	_id: string;
	title: string;
	slug: { current: string };
	body?: unknown[] | null;
};
