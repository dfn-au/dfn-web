import type { ReactNode } from "react";
import "@/components/site/theme.css";

export const metadata = {
	title: "DFN page pilots - editorial review",
	robots: { index: false, follow: false },
};
export default function ReviewLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en-AU">
			<head>
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Fraunces:opsz,wght@9..144,400;9..144,500&family=Oswald:wght@400;500&display=swap"
				/>
			</head>
			<body style={{ margin: 0 }}>{children}</body>
		</html>
	);
}
