// Stable CMS keys identify programmes even when editors reorder or rename them.
// The women programme covers trafficking prevention and support for vulnerable
// women and girls, represented by the guide's broken-chain icon.
const sectorArtwork: Record<string, string> = {
	"area-education": "education",
	"area-health": "healthcare",
	"area-enterprise": "economic-empowerment",
	"area-women": "trafficking-prevention",
};

export function SectorMarker({
	id,
	number,
	separator = false,
}: {
	id: string;
	number: string;
	separator?: boolean;
}) {
	const artwork = sectorArtwork[id];
	// Additional CMS programmes retain their number rather than borrowing an unrelated icon.
	if (!artwork)
		return (
			<>
				{number}
				{separator ? " / " : ""}
			</>
		);
	return (
		<>
			<span data-sector-number>
				{number}
				{separator ? " / " : ""}
			</span>
			<span
				data-sector-icon
				aria-hidden="true"
				className={`hidden h-8 w-9 align-middle bg-current ${separator ? "mr-2" : ""}`}
				style={{
					maskImage: `url(/icons/dfn/${artwork}.svg)`,
					maskSize: "contain",
					maskPosition: "center",
					maskRepeat: "no-repeat",
				}}
			/>
		</>
	);
}
