export default function AdminHome() {
	return (
		<main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 py-16">
			<header className="py-10">
				<p className="text-sm font-medium uppercase tracking-[0.16em] text-muted">
					Admin
				</p>
				<h1 className="mt-4 text-4xl font-semibold text-foreground">
					DFN admin
				</h1>
				<p className="mt-5 max-w-2xl text-lg leading-8 text-subtle">
					Staff tools for authored content and future operational workflows.
				</p>
			</header>

			<section aria-label="Admin tools" className="grid gap-4 sm:grid-cols-2">
				<a
					href="/admin/studio"
					className="group border border-border p-5 transition hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
				>
					<p className="text-sm font-medium text-muted">Content</p>
					<h2 className="mt-3 text-xl font-semibold text-foreground">
						Content Studio
					</h2>
					<p className="mt-3 text-sm leading-6 text-subtle">
						Edit Sanity-authored pages, stories, settings, and launch content.
					</p>
					<p className="mt-5 text-sm font-medium text-primary">
						Open Studio <span aria-hidden="true">-&gt;</span>
					</p>
				</a>

				<div className="border border-border/70 p-5 opacity-70">
					<p className="text-sm font-medium text-muted">Operations</p>
					<h2 className="mt-3 text-xl font-semibold text-foreground">
						Operational tools
					</h2>
					<p className="mt-3 text-sm leading-6 text-subtle">
						Exports, payment views, event workflows, and reporting will land
						here as vertical slices are built.
					</p>
				</div>
			</section>
		</main>
	);
}
