import { Footer } from "./_components/footer";
import { Hero } from "./_components/hero";
import { Involvement } from "./_components/involvement";
import { PalettePreview } from "./_components/palette-preview";
import {
	Enterprise,
	Evidence,
	Introduction,
	Programme,
} from "./_components/programmes";
import { Signup } from "./_components/signup";
import { resolvePalette } from "./palettes";

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
			<Hero />
			<main>
				<Introduction />
				<Programme
					id="education"
					number="01"
					label="Education"
					title={
						<>
							The freedom
							<br />
							to learn.
						</>
					}
					paragraphs={[
						"Education opens doors and gives children a reason to dream. Our schools provide quality, English-medium education for children from poor and marginalised communities, alongside healthcare, sport and the arts.",
						"Respect, self-worth, dignity and equality are part of that education.",
					]}
					image="education"
					alt="A teacher and pupils taking part in a classroom lesson"
					href="https://dfn.org.au/education/"
					linkLabel="Explore education"
					framed
					crop="object-[center_52%]"
				/>
				<Programme
					id="health"
					number="02"
					label="Healthcare"
					title={
						<>
							Care that reaches
							<br />
							the community.
						</>
					}
					paragraphs={[
						"Good health is essential to breaking the poverty cycle. Community Health Workers, primary clinics and HIV/AIDS centres help prevent sickness and disease, bringing care closer to the people who need it.",
					]}
					image="health"
					alt="A community health worker checking a woman's blood pressure"
					href="https://dfn.org.au/give/healthcare/"
					linkLabel="Explore healthcare"
					imageRight
					crop="object-[center_45%]"
				/>
				<Enterprise />
				<Programme
					id="women"
					number="04"
					label="Vulnerable communities"
					title={
						<>
							A future with
							<br />
							dignity and hope.
						</>
					}
					paragraphs={[
						"Prevention and awareness programmes support at-risk women and girls and their communities. Our teams work to protect vulnerable girls, rescue women and girls from abuse, and help them find a new future.",
					]}
					image="women"
					alt="A girl photographed for DFN's work with vulnerable communities"
					href="https://dfn.org.au/anti-human-trafficking/"
					linkLabel="Explore this work"
					crop="object-[42%_38%]"
				/>
				<Evidence />
				<Involvement />
				<Signup />
			</main>
			<Footer />
		</PalettePreview>
	);
}
