import Image from "next/image";
import type { ComponentProps, ReactNode } from "react";

export function Arrow({ down = false }: { down?: boolean }) {
	return (
		<span aria-hidden="true" className="text-[19px] font-normal">
			{down ? "↓" : "→"}
		</span>
	);
}

export function DesignLink({
	href,
	children,
	...props
}: ComponentProps<"a"> & { href: string }) {
	const external = href.startsWith("https://");
	return (
		<a
			href={href}
			target={external ? "_blank" : undefined}
			rel={external ? "noopener noreferrer" : undefined}
			{...props}
		>
			{children}
		</a>
	);
}

export const buttonClasses =
	"inline-flex min-h-[46px] cursor-pointer items-center justify-between gap-7 border-0 px-[22px] py-[13px] text-label leading-[1.4] font-medium";

export function ButtonLink({
	href,
	children,
	light = false,
}: {
	href: string;
	children: ReactNode;
	light?: boolean;
}) {
	return (
		<DesignLink
			href={href}
			className={`${buttonClasses} ${light ? "shrink-0 bg-ink text-page" : "bg-action text-white"}`}
		>
			{children}
			<Arrow down={href.startsWith("#")} />
		</DesignLink>
	);
}

export function TextLink({
	href,
	children,
}: {
	href: string;
	children: ReactNode;
}) {
	return (
		<DesignLink
			href={href}
			className="inline-flex min-h-11 items-center gap-[18px] py-2.5 text-label leading-normal font-medium text-accent"
		>
			{children}
			<Arrow down={href.startsWith("#")} />
		</DesignLink>
	);
}

export function Eyebrow({
	children,
	className = "",
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<div
			className={`text-caption leading-normal font-medium tracking-[1.5px] uppercase ${className}`}
		>
			{children}
		</div>
	);
}

export function ProgrammeTitle({ children }: { children: ReactNode }) {
	return (
		<h2 className="mb-5 font-display text-[36px] leading-[1.12] font-normal tracking-[-.7px] @desktop:text-[38px]">
			{children}
		</h2>
	);
}

export function Photo({
	name,
	alt,
	className = "",
	priority = false,
}: {
	name: string;
	alt: string;
	className?: string;
	priority?: boolean;
}) {
	return (
		<Image
			src={`/design-refresh/${name}.jpg`}
			alt={alt}
			width={name === "hero" ? 1800 : 960}
			height={name === "hero" ? 1013 : 672}
			unoptimized
			preload={priority}
			className={className}
		/>
	);
}
