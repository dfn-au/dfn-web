import { at, type NodePatch, type Path, set, unset } from "sanity/migrate";
import { type LinkOwner, linkCountries } from "../../src/sanity/link-scope";

export type LinkTarget = {
	_id: string;
	_type: string;
	slug?: { current?: string };
	publishingScope?: string[] | null;
};
const linkTypes = [
	"homepageNavigationLink",
	"homepageHeaderLink",
	"homepageHeaderChildLink",
];

/** Only unambiguous relative page paths are converted. Absolute URLs and anchors
 * can intentionally target the old website or a specific section. */
export function pageLinkPatches<Document extends LinkOwner>(
	document: Document,
	targets: LinkTarget[],
): NodePatch[] {
	function visit(value: unknown, path: Path): NodePatch[] {
		if (Array.isArray(value))
			return value.flatMap((item, index) =>
				visit(item, [
					...path,
					typeof item?._key === "string" ? { _key: item._key } : index,
				]),
			);
		if (!value || typeof value !== "object") return [];
		const node = value as Record<string, unknown>;
		const fields =
			node._type === "homepageHeader"
				? { page: "givePage", url: "giveHref" }
				: typeof node._type === "string" && linkTypes.includes(node._type)
					? { page: "page", url: "href" }
					: null;
		const candidates =
			fields && !node[fields.page] && typeof node[fields.url] === "string"
				? targets.filter((target) => {
						const href =
							target._type === "homePage"
								? "/"
								: target.slug?.current
									? `/${target.slug.current}`
									: null;
						return (
							href === node[fields.url] &&
							linkCountries(document, path).every(
								(site) =>
									target.publishingScope == null ||
									target.publishingScope.includes(site),
							)
						);
					})
				: [];
		const patches =
			fields && candidates.length === 1
				? [
						at(
							[...path, fields.page],
							set({ _type: "reference", _ref: candidates[0]._id }),
						),
						at([...path, fields.url], unset()),
					]
				: [];
		return [
			...patches,
			...Object.entries(node).flatMap(([key, child]) =>
				visit(child, [...path, key]),
			),
		];
	}
	return visit(document, []);
}
