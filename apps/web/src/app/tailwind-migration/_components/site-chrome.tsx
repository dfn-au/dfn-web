// biome-ignore-all lint: This file preserves the verified chrome markup while its implementation is migrated.
// biome-ignore-all format: Formatting reference JSX can change significant HTML whitespace.
// Maintained React components. The reference generator only writes _generated/.

const headerMenuStyles = [
	"text-right legacy-max-992:text-center! legacy-max-992:hidden",
	"[&_ul]:list-none [&_li]:list-none [&_ul]:m-[0]",
	"[&_li]:m-[0] [&_ul]:p-[0] [&_li]:p-[0]",
	"[&_nav>ul]:pl-[0] [&_li]:relative [&_a]:block",
	"[&_a]:no-underline [&_a]:[outline:0] [&_a:hover]:no-underline",
	"[&_a:hover]:[outline:0] [&_a:focus]:no-underline [&_a:focus]:[outline:0]",
	"[&_nav>ul::before]:[content:''] [&_nav>ul::before]:table [&_nav>ul::before]:clear-both",
	"[&_nav>ul::after]:[content:''] [&_nav>ul::after]:table [&_nav>ul::after]:clear-both",
	"[&_nav>ul]:inline-flex [&_nav>ul]:flex-wrap [&_nav>ul]:items-center",
	"[&_nav]:[outline:0] [&_li:has(>ul):focus]:[outline:0] [&_li:has(>ul)_ul:not(:first-child):focus]:[outline:0]",
	"[&_div:has(>a):focus]:[outline:0] [&_div:has(>a)]:relative [&_span[role=button]]:absolute",
	"[&_span[role=button]]:top-1/2 [&_span[role=button]]:right-[10px] [&_span[role=button]]:cursor-pointer",
].join(" ");

const headerNavigationStyles = [
	"legacy-max-992:hidden [&>ul]:justify-end legacy-max-992:[&>ul]:block!",
	"legacy-max-992:[&>ul]:mt-[20px] legacy-min-993:[&>ul>li]:inline-block [&>ul_a]:[font-family:Oswald,sans-serif]",
	"[&>ul_a]:[font-weight:400] [&>ul_a]:text-[16px] [&>ul_a]:[letter-spacing:1px]",
	"[&>ul_a]:uppercase [&>ul_ul:not(:first-child)_a]:text-[14px] [&>ul>li>a]:text-white",
	"[&>ul>li>div:has(>a)>a]:text-white [&>ul>li:has(>a[aria-current=page])>a]:bg-[#de6026] [&>ul>li:has(>a[aria-current=page])>a]:text-white",
	"[&>ul>li:has(>a[aria-current=page])>div:has(>a)>a]:bg-[#de6026] [&>ul>li:has(>a[aria-current=page])>div:has(>a)>a]:text-white [&>ul>li>a:hover]:bg-[#de6026]",
	"[&>ul>li>a:hover]:text-white [&>ul>li>a:focus]:bg-[#de6026] [&>ul>li>a:focus]:text-white",
	"[&>ul>li:hover>div:has(>a)>a]:bg-[#de6026] [&>ul>li:hover>div:has(>a)>a]:text-white [&>ul>li>a]:[border-style:solid]",
	"[&>ul>li>a]:[border-width:0] [&>ul>li>a]:bg-clip-border [&>ul>li>a]:p-[10px]",
	"[&>ul>li>div:has(>a)>a]:[border-style:solid] [&>ul>li>div:has(>a)>a]:[border-width:0] [&>ul>li>div:has(>a)>a]:bg-clip-border",
	"[&>ul>li>div:has(>a)>a]:p-[10px] [&_ul:not(:first-child)>li:last-child>a:not(:focus)]:[border-style:none] [&_ul:not(:first-child)>li:last-child>div:has(>a)>a:not(:focus)]:[border-style:none]",
	"[&_div:has(>a)_a>span]:pr-[0] [&_ul:not(:first-child)]:hidden [&_ul:not(:first-child)]:bg-white",
	"[&_ul:not(:first-child)]:w-[220px] [&_ul:not(:first-child)>li>a]:text-[#383838] [&_ul:not(:first-child)>li>div:has(>a)>a]:text-[#383838]",
	"[&_ul:not(:first-child)>li>a]:[border:0_solid] [&_ul:not(:first-child)>li>a]:p-[10px] [&_ul:not(:first-child)>li>div:has(>a)>a]:[border:0_solid]",
	"[&_ul:not(:first-child)>li>div:has(>a)>a]:p-[10px] [&_ul:not(:first-child)>li>a:hover]:bg-[#f4f4f4] [&_ul:not(:first-child)>li>a:hover]:text-[#383838]",
	"[&_ul:not(:first-child)>li>a:focus]:bg-[#f4f4f4] [&_ul:not(:first-child)>li>a:focus]:text-[#383838] [&_ul:not(:first-child)>li>div:has(>a)>a:hover]:bg-[#f4f4f4]",
	"[&_ul:not(:first-child)>li>div:has(>a)>a:hover]:text-[#383838] [&_ul:not(:first-child)>li>div:has(>a)>a:focus]:bg-[#f4f4f4] [&_ul:not(:first-child)>li>div:has(>a)>a:focus]:text-[#383838]",
	"[&_ul:not(:first-child)>li:has(>a[aria-current=page])>div:has(>a)>a]:bg-[#f4f4f4] [&_ul:not(:first-child)>li:has(>a[aria-current=page])>div:has(>a)>a]:text-[#383838] legacy-max-992:[&_ul:not(:first-child)]:w-auto",
	"legacy-max-992:[&_ul:not(:first-child)]:[box-shadow:none] legacy-max-992:[&_ul:not(:first-child)]:[border:0] legacy-min-993:[&_ul:not(:first-child)]:absolute",
	"legacy-min-993:[&_ul:not(:first-child)]:top-full legacy-min-993:[&_ul:not(:first-child)]:left-[0] legacy-min-993:[&_ul:not(:first-child)]:z-10",
	"legacy-min-993:[&_ul:not(:first-child)]:invisible legacy-min-993:[&_ul:not(:first-child)]:opacity-0 legacy-min-993:[&_ul:not(:first-child)]:text-left",
	"legacy-min-993:[&_ul:not(:first-child)]:p-[0] legacy-min-993:[&_ul:not(:first-child)_li:has(>ul)>ul:not(:first-child)]:top-[0] legacy-min-993:[&_ul:not(:first-child)_li:has(>ul)>ul:not(:first-child)]:left-full",
	"legacy-min-993:[&_li:has(>ul):hover>ul:not(:first-child)]:block legacy-min-993:[&_li:has(>ul):hover>ul:not(:first-child)]:visible legacy-min-993:[&_li:has(>ul):hover>ul:not(:first-child)]:opacity-100",
	"[&_span[role=button]]:w-[24px] [&_span[role=button]]:h-[23px] [&_span[role=button]]:m-[-11.5px_0_0]",
	"legacy-min-993:[&_span[role=button]]:hidden [&_span[role=button]::before]:[content:''] [&_span[role=button]::before]:absolute",
	"[&_span[role=button]::before]:right-1/2 [&_span[role=button]::before]:top-1/2 [&_span[role=button]::before]:z-[1]",
	"[&_span[role=button]::before]:block [&_span[role=button]::before]:w-[9px] [&_span[role=button]::before]:h-[9px]",
	"[&_span[role=button]::before]:m-[-5px_-5px_0_0] [&_span[role=button]::before]:[border-right:2px_solid] [&_span[role=button]::before]:[border-bottom:2px_solid]",
	"[&_span[role=button]::before]:border-[#fff]! [&_ul:not(:first-child)_span[role=button]::before]:border-[#383838]! [&>ul_li:hover_span[role=button]::before]:border-[#fff]!",
	"[&>ul_li_a:hover_span[role=button]::before]:border-[#fff]! [&>ul_li_a:focus_span[role=button]::before]:border-[#fff]! [&>ul_ul:not(:first-child)_li:hover_span[role=button]::before]:border-[#383838]!",
	"[&_span[role=button]::before]:[transform-origin:right_bottom] [&_span[role=button]::before]:[transform:translateX(-5px)_rotate(45deg)]",
].join(" ");

const footerMenuStyles = [
	"text-left legacy-max-768:text-center [&_a]:text-[14px]",
	"[&_a]:[border-style:solid] [&_a]:[border-width:0] [&_a]:bg-clip-border",
	"[&_a]:p-[0_0_5px] [&_ul]:list-none [&_li]:list-none",
	"[&_ul]:m-[0] [&_li]:m-[0] [&_ul]:p-[0]",
	"[&_li]:p-[0] [&_nav>ul]:pl-[0] [&_li]:relative",
	"[&_a]:block [&_a]:no-underline [&_a]:[outline:0]",
	"[&_a:hover]:no-underline [&_a:hover]:[outline:0] [&_a:focus]:no-underline",
	"[&_a:focus]:[outline:0] [&_nav>ul::before]:[content:''] [&_nav>ul::before]:table",
	"[&_nav>ul::before]:clear-both [&_nav>ul::after]:[content:''] [&_nav>ul::after]:table",
	"[&_nav>ul::after]:clear-both [&_ul:not(:first-child)]:w-[220px] [&_nav]:[outline:0]",
	"[&_li:has(>ul):focus]:[outline:0] [&_li:has(>ul)_ul:not(:first-child):focus]:[outline:0] [&_div:has(>a):focus]:[outline:0]",
	"[&_div:has(>a)]:relative [&_span[role=button]]:absolute [&_span[role=button]]:top-1/2",
	"[&_span[role=button]]:right-[10px] [&_span[role=button]]:cursor-pointer",
].join(" ");

export type SiteChromePage = "home" | "about";

export function SiteHeader({ currentPage }: { currentPage: SiteChromePage }) {
	return (
<header className={"absolute w-full z-100"} role="banner" itemScope itemType="http://schema.org/WPHeader"><div className={"mx-auto min-w-[0] legacy-before:table legacy-before:[content:'_'] legacy-after:table legacy-after:[content:'_'] legacy-after:clear-both"}>
	<div className={"bg-transparent [border-top-width:1px] [border-right-width:0] [border-bottom-width:1px] [border-left-width:0] m-[0] pt-[60px] pb-[10px] pl-[0] legacy-max-992:pt-[20px] relative flex min-h-[0] items-center justify-center [-webkit-box-align:center] [-webkit-box-pack:center] legacy-max-768:bg-scroll! pr-[20px] legacy-max-768:mx-[0] legacy-max-768:mt-[0] legacy-max-768:mb-[0] legacy-max-768:px-[0]"}>
						<div className={"mx-auto min-w-[0] legacy-before:table legacy-before:[content:'_'] legacy-after:table legacy-after:[content:'_'] legacy-after:clear-both flex-auto max-w-full w-full"}>

<div className={"flex flex-wrap w-full"}>
			<div className={"w-[35%] legacy-max-768:w-[80%]! legacy-max-768:max-w-none! legacy-max-768:clear-none legacy-max-768:float-left float-left min-h-px legacy-max-768:mx-auto flex flex-auto"}>
	<div className={"bg-transparent [border-width:1px] flex flex-col mt-[0] mr-[0] mb-[0] ml-[0] pt-[0] pr-[0] pb-[0] pl-[0] legacy-max-768:mx-[0] legacy-max-768:mt-[0] legacy-max-768:mb-[0] legacy-max-768:px-[0] flex-auto min-w-px max-w-full w-full justify-center"}><div className={"text-left legacy-before:table legacy-before:[content:'_'] legacy-after:table legacy-after:[content:'_'] legacy-after:clear-both"}>
	<div className={"ml-[0] legacy-before:table legacy-before:[content:'_'] legacy-after:table legacy-after:[content:'_'] legacy-after:clear-both mt-[20px] mr-[20px] mb-[20px]"}>
		<div role="figure" className={"text-left relative [line-height:0]"} itemScope itemType="https://schema.org/ImageObject">
	<div className={"w-[250px] legacy-max-768:w-[200px] inline-block relative [line-height:0] max-w-full [&_img]:inline [&_img]:h-auto [&_img]:max-w-full"}>
				<a className={"text-[#de6026] no-underline hover:text-[#de6026] hover:underline hover:[outline:0] focus:text-[#de6026] focus:underline focus:[outline:5px_auto_-webkit-focus-ring-color] focus:[outline-offset:-2px] active:[outline:0]"} href="/tailwind-migration" target="_self" itemProp="url">
				<img loading="lazy" decoding="async" className={"w-[250px] legacy-max-768:w-[200px] max-w-full h-auto [border:0] align-middle"} src="/tailwind-migration/reference/wp-content/uploads/2020/07/DFN-Logo-Header.png" alt="DFN-Logo-Header" height="895" width="2000" title="DFN-Logo-Header" itemProp="image" srcSet="/tailwind-migration/reference/wp-content/uploads/2020/07/DFN-Logo-Header.png 2000w, /tailwind-migration/reference/wp-content/uploads/2020/07/DFN-Logo-Header-600x269.png 600w, /tailwind-migration/reference/wp-content/uploads/2020/07/DFN-Logo-Header-300x134.png 300w, /tailwind-migration/reference/wp-content/uploads/2020/07/DFN-Logo-Header-1024x458.png 1024w, /tailwind-migration/reference/wp-content/uploads/2020/07/DFN-Logo-Header-768x344.png 768w, /tailwind-migration/reference/wp-content/uploads/2020/07/DFN-Logo-Header-1536x687.png 1536w" sizes="auto, (max-width: 2000px) 100vw, 2000px" />
				</a>
					</div>
	</div>
	</div>
</div>
</div>
</div>
			<div className={"w-[65%] legacy-max-768:w-1/5! legacy-max-768:max-w-none! legacy-max-768:clear-none legacy-max-768:float-left float-left min-h-px legacy-max-768:mx-auto flex flex-auto"}>
	<div className={"bg-transparent [border-width:1px] flex flex-col mt-[0] mr-[0] mb-[0] ml-[0] pt-[0] pr-[0] pb-[0] pl-[0] legacy-max-768:mx-[0] legacy-max-768:mt-[0] legacy-max-768:mb-[0] legacy-max-768:px-[0] flex-auto min-w-px max-w-full w-full justify-center"}><div className={"legacy-before:table legacy-before:[content:'_'] legacy-after:table legacy-after:[content:'_'] legacy-after:clear-both"}>
	<div className={"mr-[60px] legacy-max-768:mr-[20px] legacy-before:table legacy-before:[content:'_'] legacy-after:table legacy-after:[content:'_'] legacy-after:clear-both mt-[20px] mb-[20px] ml-[20px]"}>
					<div className={"flex items-center text-right justify-end legacy-max-1200:justify-center"}>
			<button className={"text-white! legacy-min-993:hidden! relative p-[8px]! bg-transparent! [border:none]! rounded-none! [line-height:0]! inline-flex items-center justify-center text-[18px] [font-weight:400] [text-shadow:none] [box-shadow:none] [font-family:inherit] m-[0] overflow-visible normal-case [appearance:button] cursor-pointer legacy-tablet:text-[16px]"} tabIndex={0} aria-label="Menu" aria-expanded="false">
				<div className={"[font:inherit] inline-block overflow-visible m-[0] cursor-pointer [transition-timing-function:linear] [transition-duration:.15s] [transition-property:opacity,filter] normal-case text-inherit [border:0] bg-transparent [line-height:0]"}><div className={"relative inline-block w-[30px] h-[18px]"}><div className={"bg-white! legacy-before:bg-white! legacy-after:bg-white! absolute top-[50%] block w-[30px] h-[3px] mt-[-2px] [transition-timing-function:ease] [transition-duration:.15s] [transition-property:transform] rounded-[4px] legacy-before:[content:''] legacy-after:[content:''] legacy-before:absolute legacy-after:absolute legacy-before:block legacy-after:block legacy-before:w-[30px] legacy-after:w-[30px] legacy-before:h-[3px] legacy-after:h-[3px] legacy-before:[transition:all_.25s]! legacy-after:[transition:all_.25s]! legacy-before:rounded-[4px] legacy-after:rounded-[4px] legacy-before:top-[-8px] legacy-after:bottom-[-8px]"}></div></div></div>			</button>
			</div>
			<div className={headerMenuStyles}>
	<div></div>
	<SiteNavigation currentPage={currentPage} />
</div>
	</div>
</div>
</div>
</div>
	</div>
		</div>
	</div>
</div>
</header>
	);
}

function SiteNavigation({ currentPage }: { currentPage: SiteChromePage }) {
	return (
<nav className={headerNavigationStyles} aria-label="Menu" itemScope itemType="https://schema.org/SiteNavigationElement">
		<ul><li><a className={"text-[#de6026] no-underline hover:text-[#de6026] hover:underline hover:[outline:0] focus:text-[#de6026] focus:underline focus:[outline:5px_auto_-webkit-focus-ring-color] focus:[outline-offset:-2px] active:[outline:0]"} href="/tailwind-migration/about" aria-current={currentPage === "about" ? "page" : undefined}><span>About DFN</span></a></li><li><div><a className={"text-[#de6026] no-underline hover:text-[#de6026] hover:underline hover:[outline:0] focus:text-[#de6026] focus:underline focus:[outline:5px_auto_-webkit-focus-ring-color] focus:[outline-offset:-2px] active:[outline:0]"} href="https://dfn.org.au/help/"><span>Ways to Engage<span tabIndex={0} aria-expanded="false" aria-label="Ways to Engage: submenu" role="button"></span></span></a></div><ul>	<li><a className={"text-[#de6026] no-underline hover:text-[#de6026] hover:underline hover:[outline:0] focus:text-[#de6026] focus:underline focus:[outline:5px_auto_-webkit-focus-ring-color] focus:[outline-offset:-2px] active:[outline:0]"} href="https://dfn.org.au/donate/"><span>Donate</span></a></li>	<li><a className={"text-[#de6026] no-underline hover:text-[#de6026] hover:underline hover:[outline:0] focus:text-[#de6026] focus:underline focus:[outline:5px_auto_-webkit-focus-ring-color] focus:[outline-offset:-2px] active:[outline:0]"} href="https://dfn.org.au/help/advocate/"><span>Advocate</span></a></li>	<li><a className={"text-[#de6026] no-underline hover:text-[#de6026] hover:underline hover:[outline:0] focus:text-[#de6026] focus:underline focus:[outline:5px_auto_-webkit-focus-ring-color] focus:[outline-offset:-2px] active:[outline:0]"} href="https://dfn.org.au/events/my-event/"><span>My Event</span></a></li>	<li><a className={"text-[#de6026] no-underline hover:text-[#de6026] hover:underline hover:[outline:0] focus:text-[#de6026] focus:underline focus:[outline:5px_auto_-webkit-focus-ring-color] focus:[outline-offset:-2px] active:[outline:0]"} href="https://dfn.org.au/events/field-trips/"><span>Field Trips</span></a></li>	<li><a className={"text-[#de6026] no-underline hover:text-[#de6026] hover:underline hover:[outline:0] focus:text-[#de6026] focus:underline focus:[outline:5px_auto_-webkit-focus-ring-color] focus:[outline-offset:-2px] active:[outline:0]"} href="https://dfn.org.au/help/business-and-community-engagement/"><span>Business and Community Engagement</span></a></li>	<li><a className={"text-[#de6026] no-underline hover:text-[#de6026] hover:underline hover:[outline:0] focus:text-[#de6026] focus:underline focus:[outline:5px_auto_-webkit-focus-ring-color] focus:[outline-offset:-2px] active:[outline:0]"} href="https://dfn.org.au/events/upcoming-events/youth-challenge/"><span>Youth Challenge: Education Changes Lives</span></a></li>	<li><a className={"text-[#de6026] no-underline hover:text-[#de6026] hover:underline hover:[outline:0] focus:text-[#de6026] focus:underline focus:[outline:5px_auto_-webkit-focus-ring-color] focus:[outline-offset:-2px] active:[outline:0]"} href="https://dfn.org.au/store-category/merchandise/"><span>Merchandise</span></a></li></ul></li><li><div><a className={"text-[#de6026] no-underline hover:text-[#de6026] hover:underline hover:[outline:0] focus:text-[#de6026] focus:underline focus:[outline:5px_auto_-webkit-focus-ring-color] focus:[outline-offset:-2px] active:[outline:0]"}><span>Events<span tabIndex={0} aria-expanded="false" aria-label="Events: submenu" role="button"></span></span></a></div><ul>	<li><a className={"text-[#de6026] no-underline hover:text-[#de6026] hover:underline hover:[outline:0] focus:text-[#de6026] focus:underline focus:[outline:5px_auto_-webkit-focus-ring-color] focus:[outline-offset:-2px] active:[outline:0]"} href="https://dfn.org.au/events/upcoming-events/dinners-nz/"><span>NZ HOPE Dinners 2026</span></a></li>	<li><a className={"text-[#de6026] no-underline hover:text-[#de6026] hover:underline hover:[outline:0] focus:text-[#de6026] focus:underline focus:[outline:5px_auto_-webkit-focus-ring-color] focus:[outline-offset:-2px] active:[outline:0]"} href="https://dfn.org.au/events/my-event/"><span>My Event</span></a></li>	<li><a className={"text-[#de6026] no-underline hover:text-[#de6026] hover:underline hover:[outline:0] focus:text-[#de6026] focus:underline focus:[outline:5px_auto_-webkit-focus-ring-color] focus:[outline-offset:-2px] active:[outline:0]"} href="https://dfn.org.au/events/upcoming-events/upstreamchallenge/"><span>Upstream Challenge</span></a></li></ul></li><li><div><a className={"text-[#de6026] no-underline hover:text-[#de6026] hover:underline hover:[outline:0] focus:text-[#de6026] focus:underline focus:[outline:5px_auto_-webkit-focus-ring-color] focus:[outline-offset:-2px] active:[outline:0]"} href="https://dfn.org.au/give/"><span>Give<span tabIndex={0} aria-expanded="false" aria-label="Give: submenu" role="button"></span></span></a></div><ul>	<li><a className={"text-[#de6026] no-underline hover:text-[#de6026] hover:underline hover:[outline:0] focus:text-[#de6026] focus:underline focus:[outline:5px_auto_-webkit-focus-ring-color] focus:[outline-offset:-2px] active:[outline:0]"} href="https://dfn.org.au/eofy-au/"><span>Australia EOFY</span></a></li>	<li><a className={"text-[#de6026] no-underline hover:text-[#de6026] hover:underline hover:[outline:0] focus:text-[#de6026] focus:underline focus:[outline:5px_auto_-webkit-focus-ring-color] focus:[outline-offset:-2px] active:[outline:0]"} href="https://dfn.org.au/donate-nz-dinners/"><span>NZ HOPE Dinner Donation</span></a></li>	<li><a className={"text-[#de6026] no-underline hover:text-[#de6026] hover:underline hover:[outline:0] focus:text-[#de6026] focus:underline focus:[outline:5px_auto_-webkit-focus-ring-color] focus:[outline-offset:-2px] active:[outline:0]"} href="https://dfn.org.au/give/education-vulnerable-girls/"><span>Vulnerable Girls Scholarship</span></a></li>	<li><a className={"text-[#de6026] no-underline hover:text-[#de6026] hover:underline hover:[outline:0] focus:text-[#de6026] focus:underline focus:[outline:5px_auto_-webkit-focus-ring-color] focus:[outline-offset:-2px] active:[outline:0]"} href="https://dfn.org.au/give/child-sponsorship/"><span>Education Support</span></a></li>	<li><a className={"text-[#de6026] no-underline hover:text-[#de6026] hover:underline hover:[outline:0] focus:text-[#de6026] focus:underline focus:[outline:5px_auto_-webkit-focus-ring-color] focus:[outline-offset:-2px] active:[outline:0]"} href="https://dfn.org.au/give/bequests/"><span>Bequests</span></a></li>	<li><div><a className={"text-[#de6026] no-underline hover:text-[#de6026] hover:underline hover:[outline:0] focus:text-[#de6026] focus:underline focus:[outline:5px_auto_-webkit-focus-ring-color] focus:[outline-offset:-2px] active:[outline:0]"} href="https://dfn.org.au/areas-of-focus"><span>Areas of Focus<span tabIndex={0} aria-expanded="false" aria-label="Areas of Focus: submenu" role="button"></span></span></a></div><ul>		<li><a className={"text-[#de6026] no-underline hover:text-[#de6026] hover:underline hover:[outline:0] focus:text-[#de6026] focus:underline focus:[outline:5px_auto_-webkit-focus-ring-color] focus:[outline-offset:-2px] active:[outline:0]"} href="https://dfn.org.au/education/"><span>Education</span></a></li>		<li><a className={"text-[#de6026] no-underline hover:text-[#de6026] hover:underline hover:[outline:0] focus:text-[#de6026] focus:underline focus:[outline:5px_auto_-webkit-focus-ring-color] focus:[outline-offset:-2px] active:[outline:0]"} href="https://dfn.org.au/give/healthcare/"><span>Healthcare</span></a></li>		<li><a className={"text-[#de6026] no-underline hover:text-[#de6026] hover:underline hover:[outline:0] focus:text-[#de6026] focus:underline focus:[outline:5px_auto_-webkit-focus-ring-color] focus:[outline-offset:-2px] active:[outline:0]"} href="https://dfn.org.au/give/economic-empowerment/"><span>Economic Empowerment</span></a></li>		<li><a className={"text-[#de6026] no-underline hover:text-[#de6026] hover:underline hover:[outline:0] focus:text-[#de6026] focus:underline focus:[outline:5px_auto_-webkit-focus-ring-color] focus:[outline-offset:-2px] active:[outline:0]"} href="https://dfn.org.au/anti-human-trafficking/"><span>Freedom</span></a></li>		<li><a className={"text-[#de6026] no-underline hover:text-[#de6026] hover:underline hover:[outline:0] focus:text-[#de6026] focus:underline focus:[outline:5px_auto_-webkit-focus-ring-color] focus:[outline-offset:-2px] active:[outline:0]"} href="https://dfn.org.au/give/support-a-village/"><span>Support a Village</span></a></li></ul></li></ul></li><li><a className={"text-[#de6026] no-underline hover:text-[#de6026] hover:underline hover:[outline:0] focus:text-[#de6026] focus:underline focus:[outline:5px_auto_-webkit-focus-ring-color] focus:[outline-offset:-2px] active:[outline:0]"} href="https://dfn.org.au/contact/"><span>Contact</span></a></li></ul>	</nav>
	);
}

export function SiteFooter() {
	return (
<footer itemScope itemType="http://schema.org/WPFooter"><div className={"text-white [&_a]:text-white [&_a:hover]:text-white [&_a:focus]:text-white [&_h4]:text-white mx-auto min-w-[0] legacy-before:table legacy-before:[content:'_'] legacy-after:table legacy-after:[content:'_'] legacy-after:clear-both"}>
	<div className={"bg-[url('/tailwind-migration/reference/wp-content/uploads/2020/07/BG-Bar.jpg')] bg-no-repeat bg-center bg-scroll bg-cover [border-top-width:1px] [border-right-width:0] [border-bottom-width:1px] [border-left-width:0] mt-[10px] mb-[0] pt-[40px] pb-[40px] relative flex min-h-[0] items-center justify-center [-webkit-box-align:center] [-webkit-box-pack:center] legacy-max-768:bg-scroll! mr-[20px] ml-[20px] pr-[20px] pl-[20px] legacy-max-768:mx-[0] legacy-max-768:mt-[0] legacy-max-768:mb-[0] legacy-max-768:px-[0]"}>
						<div className={"min-w-[0] mx-auto legacy-before:table legacy-before:[content:'_'] legacy-after:table legacy-after:[content:'_'] legacy-after:clear-both flex-auto max-w-[1100px]"}>

<div className={"legacy-before:table legacy-before:[content:'_'] legacy-after:table legacy-after:[content:'_'] legacy-after:clear-both"}>
			<div className={"w-1/4 legacy-max-992:w-[30%]! legacy-max-992:max-w-none! legacy-max-992:flex-initial legacy-max-768:w-full! legacy-max-768:max-w-none! legacy-max-768:clear-none legacy-max-768:float-left legacy-before:table legacy-before:[content:'_'] legacy-after:table legacy-after:[content:'_'] legacy-after:clear-both float-left min-h-px legacy-max-768:mx-auto"}>
	<div className={"[border-width:1px] flex flex-col mt-[0] mr-[0] mb-[0] ml-[0] pt-[0] pr-[0] pb-[0] pl-[0] legacy-max-768:mx-[0] legacy-max-768:mt-[0] legacy-max-768:mb-[0] legacy-max-768:px-[0]"}><div className={"text-left legacy-max-768:text-center legacy-before:table legacy-before:[content:'_'] legacy-after:table legacy-after:[content:'_'] legacy-after:clear-both"}>
	<div className={"legacy-before:table legacy-before:[content:'_'] legacy-after:table legacy-after:[content:'_'] legacy-after:clear-both mt-[20px] mr-[20px] mb-[20px] ml-[20px]"}>
		<div role="figure" className={"text-left legacy-max-768:text-center relative [line-height:0]"} itemScope itemType="https://schema.org/ImageObject">
	<div className={"w-[150px] legacy-max-768:w-[200px] inline-block relative [line-height:0] max-w-full [&_img]:inline [&_img]:h-auto [&_img]:max-w-full"}>
				<img loading="lazy" decoding="async" className={"w-[150px] legacy-max-768:w-[200px] max-w-full h-auto [border:0] align-middle"} src="/tailwind-migration/reference/wp-content/uploads/2020/07/DFN-Logo-Reverse.png" alt="DFN-Logo-Reverse" height="864" width="1980" title="DFN-Logo-Reverse" itemProp="image" srcSet="/tailwind-migration/reference/wp-content/uploads/2020/07/DFN-Logo-Reverse.png 1980w, /tailwind-migration/reference/wp-content/uploads/2020/07/DFN-Logo-Reverse-600x262.png 600w, /tailwind-migration/reference/wp-content/uploads/2020/07/DFN-Logo-Reverse-300x131.png 300w, /tailwind-migration/reference/wp-content/uploads/2020/07/DFN-Logo-Reverse-1024x447.png 1024w, /tailwind-migration/reference/wp-content/uploads/2020/07/DFN-Logo-Reverse-768x335.png 768w, /tailwind-migration/reference/wp-content/uploads/2020/07/DFN-Logo-Reverse-1536x670.png 1536w" sizes="auto, (max-width: 1980px) 100vw, 1980px" />
					</div>
	</div>
	</div>
</div>
</div>
</div>
			<div className={"w-[16%] legacy-max-992:w-1/5! legacy-max-992:max-w-none! legacy-max-992:flex-initial legacy-max-768:w-full! legacy-max-768:max-w-none! legacy-max-768:clear-none legacy-max-768:float-left legacy-before:table legacy-before:[content:'_'] legacy-after:table legacy-after:[content:'_'] legacy-after:clear-both float-left min-h-px legacy-max-768:mx-auto"}>
	<div className={"[border-width:1px] flex flex-col mt-[0] mr-[0] mb-[0] ml-[0] pt-[0] pr-[0] pb-[0] pl-[0] legacy-max-768:mx-[0] legacy-max-768:mt-[0] legacy-max-768:mb-[0] legacy-max-768:px-[0]"}><div className={"legacy-before:table legacy-before:[content:'_'] legacy-after:table legacy-after:[content:'_'] legacy-after:clear-both"}>
	<div className={"legacy-before:table legacy-before:[content:'_'] legacy-after:table legacy-after:[content:'_'] legacy-after:clear-both mt-[20px] mr-[20px] mb-[20px] ml-[20px]"}>
		<div className={footerMenuStyles}>
	<div></div>
	<nav aria-label="Menu" itemScope itemType="https://schema.org/SiteNavigationElement">
		<ul><li><a className={"text-[#de6026] no-underline hover:text-[#de6026] hover:underline hover:[outline:0] focus:text-[#de6026] focus:underline focus:[outline:5px_auto_-webkit-focus-ring-color] focus:[outline-offset:-2px] active:[outline:0]"} href="https://dfn.org.au/education/"><span>Education</span></a></li><li><a className={"text-[#de6026] no-underline hover:text-[#de6026] hover:underline hover:[outline:0] focus:text-[#de6026] focus:underline focus:[outline:5px_auto_-webkit-focus-ring-color] focus:[outline-offset:-2px] active:[outline:0]"} href="https://dfn.org.au/give/healthcare/"><span>Healthcare</span></a></li><li><a className={"text-[#de6026] no-underline hover:text-[#de6026] hover:underline hover:[outline:0] focus:text-[#de6026] focus:underline focus:[outline:5px_auto_-webkit-focus-ring-color] focus:[outline-offset:-2px] active:[outline:0]"} href="https://dfn.org.au/give/economic-empowerment/"><span>Economic Empowerment</span></a></li><li><a className={"text-[#de6026] no-underline hover:text-[#de6026] hover:underline hover:[outline:0] focus:text-[#de6026] focus:underline focus:[outline:5px_auto_-webkit-focus-ring-color] focus:[outline-offset:-2px] active:[outline:0]"} href="https://dfn.org.au/anti-human-trafficking/"><span>Anti-human trafficking</span></a></li><li><a className={"text-[#de6026] no-underline hover:text-[#de6026] hover:underline hover:[outline:0] focus:text-[#de6026] focus:underline focus:[outline:5px_auto_-webkit-focus-ring-color] focus:[outline-offset:-2px] active:[outline:0]"} href="https://dfn.org.au/intern/"><span>Join our Intern Program</span></a></li></ul>	</nav>
</div>
	</div>
</div>
</div>
</div>
			<div className={"w-[29.07%] legacy-max-992:w-1/5! legacy-max-992:max-w-none! legacy-max-992:flex-initial legacy-max-768:w-full! legacy-max-768:max-w-none! legacy-max-768:clear-none legacy-max-768:float-left legacy-before:table legacy-before:[content:'_'] legacy-after:table legacy-after:[content:'_'] legacy-after:clear-both float-left min-h-px legacy-max-768:mx-auto"}>
	<div className={"[border-width:1px] flex flex-col mt-[0] mr-[0] mb-[0] ml-[0] pt-[0] pr-[0] pb-[0] pl-[0] legacy-max-768:mx-[0] legacy-max-768:mt-[0] legacy-max-768:mb-[0] legacy-max-768:px-[0]"}><div className={"legacy-before:table legacy-before:[content:'_'] legacy-after:table legacy-after:[content:'_'] legacy-after:clear-both"}>
	<div className={"legacy-before:table legacy-before:[content:'_'] legacy-after:table legacy-after:[content:'_'] legacy-after:clear-both mt-[20px] mr-[20px] mb-[20px] ml-[20px]"}>
		<div className={footerMenuStyles}>
	<div></div>
	<nav aria-label="Menu" itemScope itemType="https://schema.org/SiteNavigationElement">
		<ul><li><a className={"text-[#de6026] no-underline hover:text-[#de6026] hover:underline hover:[outline:0] focus:text-[#de6026] focus:underline focus:[outline:5px_auto_-webkit-focus-ring-color] focus:[outline-offset:-2px] active:[outline:0]"} href="https://dfn.org.au/events/upcoming-events/dinners-nz/"><span>NZ HOPE Dinners 2026</span></a></li><li><a className={"text-[#de6026] no-underline hover:text-[#de6026] hover:underline hover:[outline:0] focus:text-[#de6026] focus:underline focus:[outline:5px_auto_-webkit-focus-ring-color] focus:[outline-offset:-2px] active:[outline:0]"} href="https://dfn.org.au/eofy-au/"><span>EOFY AU</span></a></li><li><a className={"text-[#de6026] no-underline hover:text-[#de6026] hover:underline hover:[outline:0] focus:text-[#de6026] focus:underline focus:[outline:5px_auto_-webkit-focus-ring-color] focus:[outline-offset:-2px] active:[outline:0]"} href="https://dfn.org.au/give/education-vulnerable-girls/"><span>Vulnerable Girls Scholarship</span></a></li><li><a className={"text-[#de6026] no-underline hover:text-[#de6026] hover:underline hover:[outline:0] focus:text-[#de6026] focus:underline focus:[outline:5px_auto_-webkit-focus-ring-color] focus:[outline-offset:-2px] active:[outline:0]"} href="https://dfn.org.au/help/"><span>Ways to Help</span></a></li><li><a className={"text-[#de6026] no-underline hover:text-[#de6026] hover:underline hover:[outline:0] focus:text-[#de6026] focus:underline focus:[outline:5px_auto_-webkit-focus-ring-color] focus:[outline-offset:-2px] active:[outline:0]"} href="https://dfn.org.au/events/my-event/"><span>My Event</span></a></li><li><a className={"text-[#de6026] no-underline hover:text-[#de6026] hover:underline hover:[outline:0] focus:text-[#de6026] focus:underline focus:[outline:5px_auto_-webkit-focus-ring-color] focus:[outline-offset:-2px] active:[outline:0]"} href="https://dfn.org.au/donate/"><span>Donate</span></a></li><li><a className={"text-[#de6026] no-underline hover:text-[#de6026] hover:underline hover:[outline:0] focus:text-[#de6026] focus:underline focus:[outline:5px_auto_-webkit-focus-ring-color] focus:[outline-offset:-2px] active:[outline:0]"} href="https://dfn.org.au/careers/"><span>Career Opportunities</span></a></li><li><a className={"text-[#de6026] no-underline hover:text-[#de6026] hover:underline hover:[outline:0] focus:text-[#de6026] focus:underline focus:[outline:5px_auto_-webkit-focus-ring-color] focus:[outline-offset:-2px] active:[outline:0]"} href="https://dfn.org.au/stories/"><span>Stories</span></a></li></ul>	</nav>
</div>
	</div>
</div>
</div>
</div>
			<div className={"w-[14.96%] legacy-max-992:w-1/4! legacy-max-992:max-w-none! legacy-max-992:flex-initial legacy-max-768:w-1/2! legacy-max-768:max-w-none! legacy-max-768:clear-none legacy-max-768:float-left legacy-before:table legacy-before:[content:'_'] legacy-after:table legacy-after:[content:'_'] legacy-after:clear-both float-left min-h-px legacy-max-768:mx-auto"}>
	<div className={"[border-width:1px] legacy-max-768:ml-[15px]! flex flex-col mt-[0] mr-[0] mb-[0] ml-[0] pt-[0] pr-[0] pb-[0] pl-[0] legacy-max-768:mx-[0] legacy-max-768:mt-[0] legacy-max-768:mb-[0] legacy-max-768:px-[0]"}><div className={"legacy-before:table legacy-before:[content:'_'] legacy-after:table legacy-after:[content:'_'] legacy-after:clear-both"}>
	<div className={"mb-[0] legacy-before:table legacy-before:[content:'_'] legacy-after:table legacy-after:[content:'_'] legacy-after:clear-both mt-[20px] mr-[20px] ml-[20px]"}>
		<h4 className={"font-vinyl text-[#333] [font-weight:400] uppercase not-italic text-[18px] [line-height:1.4] [letter-spacing:1px] text-left p-[0]! m-[0]!"}>
		<span>Australia</span>
	</h4>
	</div>
</div>
<div className={"legacy-before:table legacy-before:[content:'_'] legacy-after:table legacy-after:[content:'_'] legacy-after:clear-both"}>
	<div className={"mt-[10px] mb-[0] legacy-before:table legacy-before:[content:'_'] legacy-after:table legacy-after:[content:'_'] legacy-after:clear-both mr-[20px] ml-[20px]"}>
		<div className={"text-[rgba(255,255,255,0.75)] **:text-[rgba(255,255,255,0.75)]! text-[14px]"}>
	<p className={"m-[0_0_10px]"}>P.O. Box 7,<br />
Nunawading,<br />
VIC 3131</p>
<p className={"m-[0_0_10px]"}><span>1800 949 774<br />
<a className={"text-[#de6026] no-underline hover:text-[#de6026] hover:underline hover:[outline:0] focus:text-[#de6026] focus:underline focus:[outline:5px_auto_-webkit-focus-ring-color] focus:[outline-offset:-2px] active:[outline:0]"} href="mailto:info@dfn.org.au"><span>info@dfn.org.au</span></a></span></p>
</div>
	</div>
</div>
<div className={"[&_a:focus]:no-underline legacy-before:table legacy-before:[content:'_'] legacy-after:table legacy-after:[content:'_'] legacy-after:clear-both"}>
	<div className={"mt-[5px] legacy-before:table legacy-before:[content:'_'] legacy-after:table legacy-after:[content:'_'] legacy-after:clear-both mr-[20px] mb-[20px] ml-[20px]"}>

<div className={"flex justify-start legacy-max-768:justify-center [&_a]:[font-family:Helvetica,Verdana,Arial,sans-serif] [&_a]:inline-flex [&_a]:float-left [&_a]:text-center [&_a]:justify-center [&_a]:items-center [&_a]:rounded-[100px] [&_a]:[border:0px_solid] [&_a]:text-[20px] [&_a]:w-[30px] [&_a]:h-[30px] [&_a]:[line-height:30px] [&_a:hover]:no-underline! [&_svg]:fill-current [&_svg]:w-[20px] [&_svg]:h-[20px]"}>
	<span className={"inline-block [line-height:0] mr-[5px] last:mr-[0]!"} itemScope itemType="https://schema.org/Organization">
		<link itemProp="url" href="/tailwind-migration" />
		<a className={"text-[#de6026] no-underline hover:text-[#de6026] hover:underline hover:[outline:0] focus:text-[#de6026] focus:underline focus:[outline:5px_auto_-webkit-focus-ring-color] focus:[outline-offset:-2px] active:[outline:0]"} itemProp="sameAs" href="https://www.facebook.com/DFNAU/" target="_blank" title="Facebook" aria-label="Facebook" role="button" rel="noopener noreferrer external">
							<i className={"inline-block [-webkit-font-smoothing:antialiased] [font-style:normal] [font-variant:normal] [text-rendering:auto] [line-height:1] [font-family:'Font_Awesome_5_Brands'] [font-weight:400] legacy-before:[content:'']"}></i>
					</a>
	</span>
		<span className={"inline-block [line-height:0] mr-[5px] last:mr-[0]!"} itemScope itemType="https://schema.org/Organization">
		<link itemProp="url" href="/tailwind-migration" />
		<a className={"text-[#de6026] no-underline hover:text-[#de6026] hover:underline hover:[outline:0] focus:text-[#de6026] focus:underline focus:[outline:5px_auto_-webkit-focus-ring-color] focus:[outline-offset:-2px] active:[outline:0]"} itemProp="sameAs" href="https://twitter.com/DFNA_NZ" target="_blank" title="X (Twitter)" aria-label="X (Twitter)" role="button" rel="noopener noreferrer external">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path></svg>
				
					</a>
	</span>
	</div>
	</div>
</div>
</div>
</div>
			<div className={"w-[14.97%] legacy-max-992:w-1/4! legacy-max-992:max-w-none! legacy-max-992:flex-initial legacy-max-768:w-1/2! legacy-max-768:max-w-none! legacy-max-768:clear-none legacy-max-768:float-left legacy-before:table legacy-before:[content:'_'] legacy-after:table legacy-after:[content:'_'] legacy-after:clear-both float-left min-h-px legacy-max-768:mx-auto"}>
	<div className={"[border-width:1px] flex flex-col mt-[0] mr-[0] mb-[0] ml-[0] pt-[0] pr-[0] pb-[0] pl-[0] legacy-max-768:mx-[0] legacy-max-768:mt-[0] legacy-max-768:mb-[0] legacy-max-768:px-[0]"}><div className={"legacy-before:table legacy-before:[content:'_'] legacy-after:table legacy-after:[content:'_'] legacy-after:clear-both"}>
	<div className={"mb-[0] legacy-before:table legacy-before:[content:'_'] legacy-after:table legacy-after:[content:'_'] legacy-after:clear-both mt-[20px] mr-[20px] ml-[20px]"}>
		<h4 className={"font-vinyl text-[#333] [font-weight:400] uppercase not-italic text-[18px] [line-height:1.4] [letter-spacing:1px] text-left p-[0]! m-[0]!"}>
		<span>New Zealand</span>
	</h4>
	</div>
</div>
<div className={"legacy-before:table legacy-before:[content:'_'] legacy-after:table legacy-after:[content:'_'] legacy-after:clear-both"}>
	<div className={"mt-[10px] mb-[0] legacy-before:table legacy-before:[content:'_'] legacy-after:table legacy-after:[content:'_'] legacy-after:clear-both mr-[20px] ml-[20px]"}>
		<div className={"text-[rgba(255,255,255,0.75)] **:text-[rgba(255,255,255,0.75)]! text-[14px]"}>
	<p className={"m-[0_0_10px]"}>PO Box 10053<br />
Bayfair,<br />
Mount Maunganui 3152</p>
<p className={"m-[0_0_10px]"}><a className={"text-[#de6026] no-underline hover:text-[#de6026] hover:underline hover:[outline:0] focus:text-[#de6026] focus:underline focus:[outline:5px_auto_-webkit-focus-ring-color] focus:[outline-offset:-2px] active:[outline:0]"} href="tel:022 672 0260">022 672 0260</a><br />
<a className={"text-[#de6026] no-underline hover:text-[#de6026] hover:underline hover:[outline:0] focus:text-[#de6026] focus:underline focus:[outline:5px_auto_-webkit-focus-ring-color] focus:[outline-offset:-2px] active:[outline:0]"} href="mailto:info@dfn.org.nz">info@dfn.org.nz</a></p>
</div>
	</div>
</div>
<div className={"[&_a:focus]:no-underline legacy-before:table legacy-before:[content:'_'] legacy-after:table legacy-after:[content:'_'] legacy-after:clear-both"}>
	<div className={"mt-[5px] legacy-before:table legacy-before:[content:'_'] legacy-after:table legacy-after:[content:'_'] legacy-after:clear-both mr-[20px] mb-[20px] ml-[20px]"}>

<div className={"flex justify-start legacy-max-768:justify-center [&_a]:[font-family:Helvetica,Verdana,Arial,sans-serif] [&_a]:inline-flex [&_a]:float-left [&_a]:text-center [&_a]:justify-center [&_a]:items-center [&_a]:rounded-[100px] [&_a]:[border:0px_solid] [&_a]:text-[20px] [&_a]:w-[30px] [&_a]:h-[30px] [&_a]:[line-height:30px] [&_a:hover]:no-underline! [&_svg]:fill-current [&_svg]:w-[20px] [&_svg]:h-[20px]"}>
	<span className={"inline-block [line-height:0] mr-[5px] last:mr-[0]!"} itemScope itemType="https://schema.org/Organization">
		<link itemProp="url" href="/tailwind-migration" />
		<a className={"text-[#de6026] no-underline hover:text-[#de6026] hover:underline hover:[outline:0] focus:text-[#de6026] focus:underline focus:[outline:5px_auto_-webkit-focus-ring-color] focus:[outline-offset:-2px] active:[outline:0]"} itemProp="sameAs" href="https://www.facebook.com/DFNNewZealand/" target="_blank" title="Facebook" aria-label="Facebook" role="button" rel="noopener noreferrer external">
							<i className={"inline-block [-webkit-font-smoothing:antialiased] [font-style:normal] [font-variant:normal] [text-rendering:auto] [line-height:1] [font-family:'Font_Awesome_5_Brands'] [font-weight:400] legacy-before:[content:'']"}></i>
					</a>
	</span>
		<span className={"inline-block [line-height:0] mr-[5px] last:mr-[0]!"} itemScope itemType="https://schema.org/Organization">
		<link itemProp="url" href="/tailwind-migration" />
		<a className={"text-[#de6026] no-underline hover:text-[#de6026] hover:underline hover:[outline:0] focus:text-[#de6026] focus:underline focus:[outline:5px_auto_-webkit-focus-ring-color] focus:[outline-offset:-2px] active:[outline:0]"} itemProp="sameAs" href="https://twitter.com/DFNA_NZ" target="_blank" title="X (Twitter)" aria-label="X (Twitter)" role="button" rel="noopener noreferrer external">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path></svg>
				
					</a>
	</span>
	</div>
	</div>
</div>
</div>
</div>
	</div>
		</div>
	</div>
</div>
<div className={"text-[#c4c4c4] [&_a]:text-[#c4c4c4] [&_a:hover]:text-[#c4c4c4] [&_a:focus]:text-[#c4c4c4] mx-auto min-w-[0] legacy-before:table legacy-before:[content:'_'] legacy-after:table legacy-after:[content:'_'] legacy-after:clear-both"}>
	<div className={"m-[0] p-[0] relative flex min-h-[0] items-center justify-center [-webkit-box-align:center] [-webkit-box-pack:center] legacy-max-768:bg-scroll! legacy-max-768:mx-[0] legacy-max-768:mt-[0] legacy-max-768:mb-[0] legacy-max-768:px-[0]"}>
						<div className={"min-w-[0] mx-auto legacy-before:table legacy-before:[content:'_'] legacy-after:table legacy-after:[content:'_'] legacy-after:clear-both flex-auto max-w-[1100px]"}>

<div className={"legacy-before:table legacy-before:[content:'_'] legacy-after:table legacy-after:[content:'_'] legacy-after:clear-both"}>
			<div className={"w-[70.09%] legacy-before:table legacy-before:[content:'_'] legacy-after:table legacy-after:[content:'_'] legacy-after:clear-both float-left min-h-px legacy-max-768:mx-auto legacy-max-768:w-auto! legacy-max-768:clear-both legacy-max-768:float-none"}>
	<div className={"flex flex-col mt-[0] mr-[0] mb-[0] ml-[0] pt-[0] pr-[0] pb-[0] pl-[0] legacy-max-768:mx-[0] legacy-max-768:mt-[0] legacy-max-768:mb-[0] legacy-max-768:px-[0]"}><div className={"legacy-before:table legacy-before:[content:'_'] legacy-after:table legacy-after:[content:'_'] legacy-after:clear-both"}>
	<div className={"legacy-max-768:mb-[5px] legacy-before:table legacy-before:[content:'_'] legacy-after:table legacy-after:[content:'_'] legacy-after:clear-both mt-[20px] mr-[20px] mb-[20px] ml-[20px]"}>
		<div className={"text-[14px] text-left legacy-max-768:text-center"}>
	<p className={"m-[0_0_10px]"}>©2026 Dignity Freedom Network | <a className={"text-[#de6026] no-underline hover:text-[#de6026] hover:underline hover:[outline:0] focus:text-[#de6026] focus:underline focus:[outline:5px_auto_-webkit-focus-ring-color] focus:[outline-offset:-2px] active:[outline:0]"} href="https://dfn.org.au/privacy-policy/">Privacy Policy</a> | <a className={"text-[#de6026] no-underline hover:text-[#de6026] hover:underline hover:[outline:0] focus:text-[#de6026] focus:underline focus:[outline:5px_auto_-webkit-focus-ring-color] focus:[outline-offset:-2px] active:[outline:0]"} href="https://dfn.org.au/ethical-fundraising-standards/">Ethical Fundraising Standards</a> | <a className={"text-[#de6026] no-underline hover:text-[#de6026] hover:underline hover:[outline:0] focus:text-[#de6026] focus:underline focus:[outline:5px_auto_-webkit-focus-ring-color] focus:[outline-offset:-2px] active:[outline:0]"} href="https://dfn.org.au/faqs/">FAQs</a></p>
</div>
	</div>
</div>
</div>
</div>
			<div className={"w-[29.91%] legacy-before:table legacy-before:[content:'_'] legacy-after:table legacy-after:[content:'_'] legacy-after:clear-both float-left min-h-px legacy-max-768:mx-auto legacy-max-768:w-auto! legacy-max-768:clear-both legacy-max-768:float-none legacy-max-768:max-w-[400px]"}>
	<div className={"flex flex-col mt-[0] mr-[0] mb-[0] ml-[0] pt-[0] pr-[0] pb-[0] pl-[0] legacy-max-768:mx-[0] legacy-max-768:mt-[0] legacy-max-768:mb-[0] legacy-max-768:px-[0]"}><div className={"legacy-before:table legacy-before:[content:'_'] legacy-after:table legacy-after:[content:'_'] legacy-after:clear-both"}>
	<div className={"legacy-max-768:mt-[5px] legacy-before:table legacy-before:[content:'_'] legacy-after:table legacy-after:[content:'_'] legacy-after:clear-both mt-[20px] mr-[20px] mb-[20px] ml-[20px]"}>
		<div className={"text-[14px] text-right legacy-max-768:text-center"}>
	<p className={"m-[0_0_10px]"}>Powered by <a className={"text-[#de6026] no-underline hover:text-[#de6026] hover:underline hover:[outline:0] focus:text-[#de6026] focus:underline focus:[outline:5px_auto_-webkit-focus-ring-color] focus:[outline-offset:-2px] active:[outline:0]"} href="https://inversit.com.au/" target="_blank" rel="noopener">Inversit</a></p>
</div>
	</div>
</div>
</div>
</div>
	</div>
		</div>
	</div>
</div>
</footer>
	);
}
