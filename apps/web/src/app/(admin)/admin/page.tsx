import { AdminDashboard } from "@/components/admin-dashboard";
import { AdminPage } from "@/components/admin-ui";
import { requireAdminPage } from "@/lib/admin-auth";

export default async function AdminHome() {
	await requireAdminPage("/admin");
	return (
		<AdminPage
			title="DFN admin"
			eyebrow="Workspace"
			description="Staff tools for content and operations."
		>
			<AdminDashboard />
		</AdminPage>
	);
}
