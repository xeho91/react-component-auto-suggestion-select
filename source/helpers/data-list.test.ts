import { faker } from "@faker-js/faker";
import { describe, expect, test } from "vitest";

import { getMapFromDataList, isValidDataList } from "$helpers/data-list";

const SAMPLE_DATA_LIST = [
	{ id: 1234, name: "Matt" },
	{ id: 5678, name: "Chris" },
];
const SAMPLE_INCORRECT_DATA_LIST = [
	{ id: 1234, name: "Matt" },
	{ name: "Chris", planet: "Earth" },
];

describe("isValidDataList(dataList)", () => {
	it(`Should return TRUE on data list (objects has same shared keys): ${JSON.stringify(
		SAMPLE_DATA_LIST,
	)}`, () => {
		expect(isValidDataList(SAMPLE_DATA_LIST)).toBe(true);
	});

	it(`Should return FALSE on not a data list (objects doesn't have same shared keys): ${JSON.stringify(
		SAMPLE_INCORRECT_DATA_LIST,
	)}`, () => {
		expect(isValidDataList(SAMPLE_INCORRECT_DATA_LIST)).toBe(false);
	});
});

describe("getMapFromDataList(dataList)", () => {
	it(`Should return Map on sample data list (with key: "id" as reference): ${JSON.stringify(
		SAMPLE_DATA_LIST,
	)}`, () => {
		const map = getMapFromDataList(SAMPLE_DATA_LIST, "id");

		expect(map).toBeInstanceOf(Map);
		expect(map.get(1234)).toStrictEqual(SAMPLE_DATA_LIST[0]);
		expect(map.get(5678)).toStrictEqual(SAMPLE_DATA_LIST[1]);
	});

	const incorrectTypes = [
		new Map(),
		[{}, {}],
		faker.datatype.string(),
		faker.datatype.number(),
		JSON.parse(faker.datatype.json()),
	];

	test.each(incorrectTypes)(
		"It should throw TypeError on passed invalid argument: %p",
		(type) => {
			expect(() => getMapFromDataList(type, "key")).toThrow(TypeError);
		},
	);
});
