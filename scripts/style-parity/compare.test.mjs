import assert from "node:assert/strict";
import test from "node:test";

import { compareSnapshots } from "./compare.mjs";

function snapshot(overrides = {}) {
	return {
		document: { clientWidth: 390, scrollHeight: 1000 },
		nodes: [
			{
				box: { height: 20, width: 100, x: 10, y: 10 },
				key: ":scope",
				label: ":scope",
				pseudoElements: { after: null, before: null },
				style: { color: "rgb(0, 0, 0)", display: "block" },
				tagName: "html",
				textNodes: [],
			},
		],
		...overrides,
	};
}

test("equivalent snapshots have no differences", () => {
	assert.deepEqual(compareSnapshots(snapshot(), snapshot()), []);
});

test("accepts omitted leading zeroes in decimal custom properties only", () => {
	const reference = snapshot();
	const candidate = snapshot();
	reference.nodes[0].style["--scale"] = "0.8";
	candidate.nodes[0].style["--scale"] = ".8";
	reference.nodes[0].style["--offset"] = "-0.5";
	candidate.nodes[0].style["--offset"] = "-.5";
	assert.deepEqual(compareSnapshots(reference, candidate), []);

	for (const [expected, actual] of [
		["0.8", ".7"],
		["0.8px", ".8px"],
		["0.8 1", ".8 1"],
		["0.80000000000000001", ".8"],
		["0.8", undefined],
	]) {
		reference.nodes[0].style["--scale"] = expected;
		candidate.nodes[0].style["--scale"] = actual;
		assert.equal(compareSnapshots(reference, candidate).length, 1);
	}

	delete reference.nodes[0].style["--scale"];
	delete candidate.nodes[0].style["--scale"];
	reference.nodes[0].style.opacity = "0.8";
	candidate.nodes[0].style.opacity = ".8";
	assert.equal(compareSnapshots(reference, candidate).length, 1);
});

test("reports computed-style and layout differences", () => {
	const candidate = snapshot();
	candidate.nodes[0].style.color = "rgb(255, 255, 255)";
	candidate.nodes[0].box.width = 101;

	assert.deepEqual(compareSnapshots(snapshot(), candidate), [
		{
			actual: "rgb(255, 255, 255)",
			category: "style",
			expected: "rgb(0, 0, 0)",
			node: ":scope",
			property: "color",
		},
		{
			actual: 101,
			category: "layout",
			expected: 100,
			node: ":scope",
			property: "width",
		},
	]);
});

test("applies layout tolerance and ignored properties", () => {
	const candidate = snapshot();
	candidate.nodes[0].style.color = "rgb(255, 255, 255)";
	candidate.nodes[0].box.width = 100.04;

	assert.deepEqual(
		compareSnapshots(snapshot(), candidate, {
			ignoredProperties: ["color"],
			layoutTolerance: 0.05,
		}),
		[],
	);
});

test("reports pseudo-element and text-fragment differences", () => {
	const reference = snapshot();
	reference.nodes[0].pseudoElements.before = {
		content: '"A"',
		style: { color: "rgb(0, 0, 0)" },
	};
	reference.nodes[0].textNodes = [
		{ rects: [{ height: 10, width: 20, x: 0, y: 0 }], text: "Hello" },
	];

	const candidate = structuredClone(reference);
	candidate.nodes[0].pseudoElements.before.content = '"B"';
	candidate.nodes[0].textNodes[0].rects[0].width = 21;

	const differences = compareSnapshots(reference, candidate);
	assert.equal(differences.length, 2);
	assert.deepEqual(
		differences.map(({ category, property }) => ({ category, property })),
		[
			{ category: "pseudo:before", property: "content" },
			{ category: "text-layout", property: "textNode[0].rect[0].width" },
		],
	);
});
