import { stegaClean } from "next-sanity";
import { Footer } from "@/app/design-refresh/_components/footer";
import { Hero } from "@/app/design-refresh/_components/hero";
import { Involvement } from "@/app/design-refresh/_components/involvement";
import { Headline } from "@/app/design-refresh/_components/primitives";
import {
	Enterprise,
	Evidence,
	Introduction,
	Programme,
} from "@/app/design-refresh/_components/programmes";
import { Signup } from "@/app/design-refresh/_components/signup";
import { areaAnchor, type HomepageContent } from "./content";

export function Homepage({ content }: { content: HomepageContent }) {
	const areas = content.areas ?? [];
	let photographIndex = 0;
	return (
		<>
			{content.hero && (
				<Hero
					content={content.hero}
					header={content.header ?? undefined}
					placeholderLinks
				/>
			)}
			<main id="dh-main">
				{content.introduction && (
					<Introduction
						content={content.introduction}
						areas={areas.map((area) => ({
							id: areaAnchor(area),
							label: area.label,
						}))}
					/>
				)}
				{areas.map((area, index) => {
					const number = String(index + 1).padStart(2, "0");
					if (stegaClean(area.contentType) === "pathways") {
						return (
							<Enterprise
								key={area._key}
								id={areaAnchor(area)}
								number={number}
								content={area}
								href="#"
							/>
						);
					}
					const position = photographIndex++;
					return (
						<Programme
							key={area._key}
							id={areaAnchor(area)}
							number={number}
							label={area.label}
							title={<Headline text={area.headline} />}
							body={area.body ?? []}
							photograph={area.photograph}
							alt={area.photograph?.alt ?? ""}
							href="#"
							linkLabel={area.actionLabel}
							framed={position === 0}
							imageRight={position % 2 === 1}
							crop={
								position === 0
									? "object-[center_52%]"
									: position === 1
										? "object-[center_45%]"
										: "object-[42%_38%]"
							}
						/>
					);
				})}
				{content.featuredExample && (
					<Evidence content={content.featuredExample} href="#" />
				)}
				{content.involvement && (
					<Involvement content={content.involvement} placeholderLinks />
				)}
				{content.signup && <Signup content={content.signup} placeholderLinks />}
			</main>
			{content.footer && <Footer content={content.footer} placeholderLinks />}
		</>
	);
}
