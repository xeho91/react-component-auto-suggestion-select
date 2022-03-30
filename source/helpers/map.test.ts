import { faker } from "@faker-js/faker";
import { describe, expect, it, test } from "vitest";

import { isMap, isMapEmpty } from "$helpers/map";

describe("isMap(argument)", () => {
	test("argument: new Map() - should return true", () => {
		expect(isMap(new Map())).toBe(true);
	});

	test("argument: [] - should return false", () => {
		expect(isMap([])).toBe(false);
	});
});

describe("isMapEmpty(map)", () => {
	it("Should return TRUE on an empty map", () => {
		expect(isMapEmpty(new Map())).toBe(true);
	});

	const randomMap = new Map(
		Object.entries(JSON.parse(faker.datatype.json())),
	);

	it("Should return FALSE on a random map", () => {
		expect(isMapEmpty(randomMap)).toBe(false);
	});

	const incorrectTypes = [
		faker.datatype.array(),
		faker.datatype.string(),
		faker.datatype.number(),
		JSON.parse(faker.datatype.json()),
	];

	test.each(incorrectTypes)(
		"It should throw TypeError on passed invalid argument: %p",
		(type) => {
			expect(() => isMapEmpty(type)).toThrow(TypeError);
		},
	);
});
