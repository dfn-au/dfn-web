import { notFound } from "next/navigation";

// Nested unknown URLs must use the public layout and its recovery page.
export default function MissingRoute() {
	notFound();
}
