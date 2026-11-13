import { ButtonLink } from "@/components/site/primitives";

export default function NotFound() {
	return (
		<main
			data-palette="charcoal"
			className="flex min-h-screen items-center bg-page px-6 py-16 font-body text-ink [&_:focus-visible]:outline-2 [&_:focus-visible]:outline-offset-4 [&_:focus-visible]:outline-focus"
		>
			<div className="mx-auto w-full max-w-xl">
				<p className="mb-4 text-label text-muted">404</p>
				<h1 className="font-display text-4xl leading-tight sm:text-5xl">
					Page not found
				</h1>
				<p className="mt-6 mb-8 text-lg leading-relaxed text-muted">
					Sorry, we couldn&apos;t find the page you&apos;re looking for.
				</p>
				<ButtonLink href="/">Back to homepage</ButtonLink>
			</div>
		</main>
	);
}
