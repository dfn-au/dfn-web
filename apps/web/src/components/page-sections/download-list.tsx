import { stegaClean } from "next-sanity";
import type { PageSection } from "./types";

type Downloads = Extract<
	PageSection,
	{ _type: "downloadListSection" }
>["downloads"];
const dateFormat = new Intl.DateTimeFormat("en-AU", {
	day: "numeric",
	month: "long",
	year: "numeric",
	timeZone: "UTC",
});

export function DownloadList({ downloads }: { downloads: Downloads }) {
	const available = (downloads ?? []).filter(
		(item) =>
			item.title && item.href && /^https?:\/\//i.test(stegaClean(item.href)),
	);
	if (!available.length) return null;
	return (
		<ol className="mt-8 border-t border-rule">
			{available.map((item) => {
				const date = item.date ? stegaClean(item.date) : null;
				const hasDate = date && !Number.isNaN(Date.parse(date));
				const format =
					item.extension && stegaClean(item.extension).toUpperCase();
				return (
					<li key={item._key} className="border-b border-rule">
						{/* Resource URLs must stay exact: page preview parameters can invalidate signed downloads. */}
						<a
							href={stegaClean(item.href ?? "")}
							className="group flex min-h-11 flex-col items-start gap-2 py-4 focus-visible:outline-2 focus-visible:outline-offset-4"
						>
							<span className="wrap-anywhere text-[21px] leading-snug text-accent underline decoration-1 underline-offset-4 group-hover:decoration-2">
								{item.title}
							</span>
							{(hasDate || format) && (
								<span className="text-sm text-muted">
									{hasDate && (
										<time dateTime={date}>
											{dateFormat.format(new Date(date))}
										</time>
									)}
									{hasDate && format && " · "}
									{format}
								</span>
							)}
						</a>
					</li>
				);
			})}
		</ol>
	);
}
