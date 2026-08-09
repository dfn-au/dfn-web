export async function capturePageSnapshot(page, { selector = "html" } = {}) {
	await page.evaluate(async () => {
		for (const image of document.images) image.loading = "eager";
		await document.fonts.ready;
		await Promise.race([
			Promise.all(
				Array.from(document.images, (image) =>
					image.decode?.().catch(() => undefined),
				),
			),
			new Promise((resolve) => setTimeout(resolve, 5000)),
		]);
		await new Promise((resolve) =>
			requestAnimationFrame(() => requestAnimationFrame(resolve)),
		);
	});

	return page.evaluate((rootSelector) => {
		const root = document.querySelector(rootSelector);
		if (!root) throw new Error(`Parity selector not found: ${rootSelector}`);

		const elements = [root, ...root.querySelectorAll("*")];
		const origin = window.location.origin;

		return {
			document: {
				clientHeight: document.documentElement.clientHeight,
				clientWidth: document.documentElement.clientWidth,
				scrollHeight: document.documentElement.scrollHeight,
				scrollWidth: document.documentElement.scrollWidth,
			},
			nodes: elements.map((element, index) => ({
				box: readBox(element),
				key: getElementKey(element, root, index),
				label: getElementLabel(element, root, index),
				pseudoElements: {
					after: readPseudoElement(element, "::after", origin),
					before: readPseudoElement(element, "::before", origin),
				},
				style: readStyle(getComputedStyle(element), origin),
				tagName: element.tagName.toLowerCase(),
				textNodes: readTextNodes(element),
			})),
		};

		function readBox(element) {
			const rect = element.getBoundingClientRect();
			return {
				clientHeight: element.clientHeight,
				clientWidth: element.clientWidth,
				height: rect.height,
				offsetHeight: element.offsetHeight,
				offsetWidth: element.offsetWidth,
				scrollHeight: element.scrollHeight,
				scrollWidth: element.scrollWidth,
				width: rect.width,
				x: rect.x,
				y: rect.y,
			};
		}

		function readStyle(style, documentOrigin) {
			return Object.fromEntries(
				Array.from(style)
					.sort()
					.map((property) => [
						property,
						style
							.getPropertyValue(property)
							.replaceAll(documentOrigin, "<origin>"),
					]),
			);
		}

		function readPseudoElement(element, pseudoElement, documentOrigin) {
			const style = getComputedStyle(element, pseudoElement);
			if (style.content === "none" || style.content === "normal") return null;
			return {
				content: style.content,
				style: readStyle(style, documentOrigin),
			};
		}

		function readTextNodes(element) {
			return Array.from(element.childNodes)
				.filter(
					(node) =>
						node.nodeType === Node.TEXT_NODE &&
						Boolean(node.textContent?.trim()),
				)
				.map((node) => {
					const range = document.createRange();
					range.selectNodeContents(node);
					return {
						rects: Array.from(range.getClientRects(), (rect) => ({
							height: rect.height,
							width: rect.width,
							x: rect.x,
							y: rect.y,
						})),
						text: node.textContent.replace(/\s+/g, " ").trim(),
					};
				});
		}

		function getElementKey(element, scopeRoot, index) {
			if (element === scopeRoot) return ":scope";
			const parts = [];
			let current = element;

			while (current && current !== scopeRoot) {
				const siblings = current.parentElement
					? Array.from(current.parentElement.children).filter(
							(sibling) => sibling.tagName === current.tagName,
						)
					: [];
				parts.unshift(
					`${current.tagName.toLowerCase()}:nth-of-type(${siblings.indexOf(current) + 1})`,
				);
				current = current.parentElement;
			}

			return parts.length > 0 ? parts.join(">") : `element:${index}`;
		}

		function getElementLabel(element, scopeRoot, index) {
			const parityName = element.getAttribute("data-parity");
			if (parityName) return `[data-parity="${parityName}"]`;
			if (element.id) return `#${element.id}`;
			if (element === scopeRoot) return ":scope";

			const className = Array.from(element.classList).find(
				(name) => !/^fl-node-|^n-uc-/.test(name),
			);
			return className
				? `${element.tagName.toLowerCase()}.${className}`
				: `${element.tagName.toLowerCase()}[${index}]`;
		}
	}, selector);
}
