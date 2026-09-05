import type { ReactNode } from "react";
import "./components.css";

const assetBasePath = "/tailwind-migration/reference";
const htmlClassName =
	"legacy-wordpress-root [font-family:sans-serif] text-[10px] [text-size-adjust:100%] [-webkit-tap-highlight-color:rgba(0,0,0,0)] box-border **:box-border legacy-before:box-border legacy-after:box-border [&_*::before]:box-border [&_*::after]:box-border";

export default function TailwindMigrationLayout({
	children,
}: {
	children: ReactNode;
}) {
	return (
		<html lang="en-AU" className={htmlClassName}>
			<head>
				<link
					href={`${assetBasePath}/assets/fonts/google-fonts.css`}
					rel="stylesheet"
				/>
				<link href="/tailwind-migration/tailwind.css" rel="stylesheet" />
			</head>
			<body style={{ margin: 0, padding: 0 }}>{children}</body>
		</html>
	);
}
