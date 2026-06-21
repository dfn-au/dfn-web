import { ErrorTestControls } from "./error-test-controls";

export default function ErrorTestingPage() {
	return (
		<main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 py-16">
			<header className="py-10">
				<a
					href="/admin"
					className="text-sm font-medium text-muted hover:text-foreground"
				>
					<span aria-hidden="true">&lt;-</span> Admin
				</a>
				<p className="mt-8 text-sm font-medium uppercase tracking-[0.16em] text-muted">
					Diagnostics
				</p>
				<h1 className="mt-4 text-4xl font-semibold text-foreground">
					Error testing
				</h1>
				<p className="mt-5 max-w-2xl text-lg leading-8 text-subtle">
					Use these controls to verify that errors reach the configured
					monitoring services. Each action creates a real unhandled error.
				</p>
			</header>

			<ErrorTestControls />
		</main>
	);
}
