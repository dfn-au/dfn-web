import { AdminPage } from "@/components/admin-ui";
import { requireAdminPage } from "@/lib/admin-auth";
import { ErrorTestControls } from "./error-test-controls";

export default async function ErrorTestingPage() {
	await requireAdminPage("/admin/errors");
	return (
		<AdminPage
			title="Error testing"
			eyebrow="Diagnostics"
			description="Inspect errors in the browser console and server logs. Each action creates a real unhandled error."
			back
		>
			<ErrorTestControls />
		</AdminPage>
	);
}
