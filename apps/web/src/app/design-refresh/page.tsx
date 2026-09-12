import { Footer } from "./_components/footer";
import { Hero } from "./_components/hero";
import { Involvement } from "./_components/involvement";
import { PalettePreview } from "./_components/palette-preview";
import { Headline } from "./_components/primitives";
import {
	Enterprise,
	Evidence,
	Introduction,
	Programme,
} from "./_components/programmes";
import { Signup } from "./_components/signup";
import { resolvePalette } from "./palettes";
import { previewHomepage } from "./preview-content";

export default async function DesignRefreshPage({
	searchParams,
}: {
	searchParams: Promise<{ variant?: string; clean?: string }>;
}) {
	const { variant, clean } = await searchParams;
	return (
		<PalettePreview
			initialPalette={resolvePalette(variant)}
			showControls={clean !== "1"}
		>
			<Hero
				content={previewHomepage.hero}
				header={previewHomepage.header}
				image="hero"
			/>
			<main id="dh-main">
				<Introduction
					content={previewHomepage.introduction}
					areas={previewHomepage.areas.map((area) => ({
						id: area._key,
						label: area.label,
					}))}
				/>
				{previewHomepage.areas.map((area, index) => {
					const number = String(index + 1).padStart(2, "0");
					if (area.contentType === "pathways")
						return (
							<Enterprise
								key={area._key}
								content={area}
								id={area._key}
								number={number}
								href="https://dfn.org.au/give/economic-empowerment/"
							/>
						);
					return (
						<Programme
							key={area._key}
							id={area._key}
							number={number}
							label={area.label}
							title={<Headline text={area.headline} />}
							body={area.body}
							image={area._key}
							alt={area.photograph?.alt ?? ""}
							href={
								index === 0
									? "https://dfn.org.au/education/"
									: index === 1
										? "https://dfn.org.au/give/healthcare/"
										: "https://dfn.org.au/anti-human-trafficking/"
							}
							linkLabel={area.actionLabel}
							framed={index === 0}
							imageRight={index === 1}
							crop={
								index === 0
									? "object-[center_52%]"
									: index === 1
										? "object-[center_45%]"
										: "object-[42%_38%]"
							}
						/>
					);
				})}
				<Evidence
					content={previewHomepage.featuredExample}
					href="https://dfn.org.au/self-help-groups/"
				/>
				<Involvement content={previewHomepage.involvement} />
				<Signup content={previewHomepage.signup} />
			</main>
			<Footer content={previewHomepage.footer} />
		</PalettePreview>
	);
}
