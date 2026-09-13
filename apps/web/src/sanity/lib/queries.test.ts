import type { StegaBranded } from "next-sanity";
import { expectTypeOf, it, vi } from "vitest";
import type {
	HOME_PAGE_QUERY_RESULT,
	PAGE_QUERY_RESULT,
	SITE_CHROME_QUERY_RESULT,
} from "../types";
import { sanityFetch } from "./live";
import { HOME_PAGE_QUERY, PAGE_QUERY, SITE_CHROME_QUERY } from "./queries";

// These checks only inspect inferred types; no live content or server context is needed.
vi.mock("./live", () => ({ sanityFetch: vi.fn() }));

it("infers generated results through sanityFetch without a generic or cast", () => {
	const home = () => sanityFetch({ query: HOME_PAGE_QUERY, stega: false });
	const page = () =>
		sanityFetch({ query: PAGE_QUERY, params: { slug: "about" }, stega: false });
	const chrome = () => sanityFetch({ query: SITE_CHROME_QUERY, stega: false });
	const preview = () => sanityFetch({ query: HOME_PAGE_QUERY });

	expectTypeOf(home)
		.returns.resolves.toHaveProperty("data")
		.toEqualTypeOf<HOME_PAGE_QUERY_RESULT>();
	expectTypeOf(page)
		.returns.resolves.toHaveProperty("data")
		.toEqualTypeOf<PAGE_QUERY_RESULT>();
	expectTypeOf(chrome)
		.returns.resolves.toHaveProperty("data")
		.toEqualTypeOf<SITE_CHROME_QUERY_RESULT>();
	expectTypeOf(preview)
		.returns.resolves.toHaveProperty("data")
		.toEqualTypeOf<StegaBranded<HOME_PAGE_QUERY_RESULT>>();
});
