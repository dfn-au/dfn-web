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
		<ol className="mt-3 border-t border-rule">
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
							className="group flex min-h-11 flex-col justify-center gap-0.5 py-2.5 @tablet:flex-row @tablet:items-baseline @tablet:justify-between @tablet:gap-5 @tablet:py-3 focus-visible:outline-2 focus-visible:outline-offset-4"
						>
							<span className="min-w-0 wrap-anywhere text-[17px] font-medium leading-snug text-accent underline decoration-1 underline-offset-4 group-hover:decoration-2">
								{item.title}
							</span>
							{(hasDate || format) && (
								<span className="shrink-0 text-sm leading-snug text-muted">
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
