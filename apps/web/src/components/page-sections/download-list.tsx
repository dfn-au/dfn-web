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
				return (
					<li key={item._key} className="border-b border-rule">
						{/* Resource URLs must stay exact: page preview parameters can invalidate signed downloads. */}
						<a
							href={stegaClean(item.href ?? "")}
							className="flex min-h-11 flex-wrap items-center justify-between gap-x-6 gap-y-2 py-6 text-accent underline decoration-1 underline-offset-4 hover:decoration-2 focus-visible:outline-2 focus-visible:outline-offset-4"
						>
							<span className="min-w-0 flex-1 basis-64 wrap-anywhere text-[21px] leading-snug">
								{item.title}
							</span>
							<span className="text-sm">
								{item.extension
									? `Open ${stegaClean(item.extension).toUpperCase()}`
									: "Open resource"}
							</span>
						</a>
						{date && !Number.isNaN(Date.parse(date)) && (
							<p className="pb-5 text-sm text-muted">
								<time dateTime={date}>{dateFormat.format(new Date(date))}</time>
							</p>
						)}
					</li>
				);
			})}
		</ol>
	);
}
