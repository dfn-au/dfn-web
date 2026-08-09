export function compareSnapshots(
	reference,
	candidate,
	{ ignoredProperties = [], layoutTolerance = 0.05 } = {},
) {
	const differences = [];
	const ignored = new Set(ignoredProperties);

	compareNumericObject(
		differences,
		"document",
		"document",
		reference.document,
		candidate.document,
		layoutTolerance,
	);

	if (reference.nodes.length !== candidate.nodes.length) {
		differences.push({
			actual: candidate.nodes.length,
			category: "structure",
			expected: reference.nodes.length,
			node: "document",
			property: "elementCount",
		});
	}

	const nodeCount = Math.min(reference.nodes.length, candidate.nodes.length);
	for (let index = 0; index < nodeCount; index += 1) {
		const expectedNode = reference.nodes[index];
		const actualNode = candidate.nodes[index];
		const node = expectedNode.label ?? expectedNode.key;

		compareScalar(
			differences,
			node,
			"structure",
			"key",
			expectedNode.key,
			actualNode.key,
		);
		compareScalar(
			differences,
			node,
			"structure",
			"tagName",
			expectedNode.tagName,
			actualNode.tagName,
		);
		compareStringObject(
			differences,
			node,
			"style",
			expectedNode.style,
			actualNode.style,
			ignored,
		);
		compareNumericObject(
			differences,
			node,
			"layout",
			expectedNode.box,
			actualNode.box,
			layoutTolerance,
		);
		comparePseudoElement(
			differences,
			node,
			"before",
			expectedNode.pseudoElements.before,
			actualNode.pseudoElements.before,
			ignored,
		);
		comparePseudoElement(
			differences,
			node,
			"after",
			expectedNode.pseudoElements.after,
			actualNode.pseudoElements.after,
			ignored,
		);
		compareTextNodes(
			differences,
			node,
			expectedNode.textNodes,
			actualNode.textNodes,
			layoutTolerance,
		);
	}

	return differences;
}

function comparePseudoElement(
	differences,
	node,
	pseudo,
	expected,
	actual,
	ignored,
) {
	const category = `pseudo:${pseudo}`;
	if (!expected || !actual) {
		compareScalar(
			differences,
			node,
			category,
			"content",
			expected?.content ?? null,
			actual?.content ?? null,
		);
		return;
	}
	compareScalar(
		differences,
		node,
		category,
		"content",
		expected.content,
		actual.content,
	);
	compareStringObject(
		differences,
		node,
		category,
		expected.style,
		actual.style,
		ignored,
	);
}

function compareTextNodes(
	differences,
	node,
	expectedNodes,
	actualNodes,
	tolerance,
) {
	compareScalar(
		differences,
		node,
		"text",
		"nodeCount",
		expectedNodes.length,
		actualNodes.length,
	);
	const count = Math.min(expectedNodes.length, actualNodes.length);

	for (let index = 0; index < count; index += 1) {
		const expected = expectedNodes[index];
		const actual = actualNodes[index];
		const prefix = `textNode[${index}]`;
		compareScalar(
			differences,
			node,
			"text",
			`${prefix}.text`,
			expected.text,
			actual.text,
		);
		compareScalar(
			differences,
			node,
			"text",
			`${prefix}.lineCount`,
			expected.rects.length,
			actual.rects.length,
		);

		const rectCount = Math.min(expected.rects.length, actual.rects.length);
		for (let rectIndex = 0; rectIndex < rectCount; rectIndex += 1) {
			compareNumericObject(
				differences,
				node,
				"text-layout",
				expected.rects[rectIndex],
				actual.rects[rectIndex],
				tolerance,
				`${prefix}.rect[${rectIndex}].`,
			);
		}
	}
}

function compareStringObject(
	differences,
	node,
	category,
	expected,
	actual,
	ignored,
) {
	const properties = new Set([
		...Object.keys(expected),
		...Object.keys(actual),
	]);
	for (const property of properties) {
		if (ignored.has(property)) continue;
		compareScalar(
			differences,
			node,
			category,
			property,
			expected[property],
			actual[property],
		);
	}
}

function compareNumericObject(
	differences,
	node,
	category,
	expected,
	actual,
	tolerance,
	prefix = "",
) {
	const properties = new Set([
		...Object.keys(expected),
		...Object.keys(actual),
	]);
	for (const property of properties) {
		const expectedValue = expected[property];
		const actualValue = actual[property];
		if (
			typeof expectedValue === "number" &&
			typeof actualValue === "number" &&
			Math.abs(expectedValue - actualValue) <= tolerance
		) {
			continue;
		}
		compareScalar(
			differences,
			node,
			category,
			`${prefix}${property}`,
			expectedValue,
			actualValue,
		);
	}
}

function compareScalar(
	differences,
	node,
	category,
	property,
	expected,
	actual,
) {
	if (expected === actual) return;
	differences.push({ actual, category, expected, node, property });
}
