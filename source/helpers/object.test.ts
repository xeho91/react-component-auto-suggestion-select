import { faker } from "@faker-js/faker";
import { describe, expect, test } from "vitest";

import { isObject, isObjectEmpty } from "$helpers/object";

describe("isObject(argument)", () => {
	it("Should return TRUE on an empty object: {}", () => {
		expect(isObject({})).toBe(true);
	});

	it(`Should return FALSE on a: null`, () => {
		// eslint-disable-next-line unicorn/no-null
		expect(isObject(null)).toBe(false);
	});

	const nonObjectTypes = [
		faker.datatype.array(1),
		faker.datatype.number(),
		faker.datatype.string(),
		new Map(),
	];

	test.each(nonObjectTypes)(
		"Should return FALSE on non-object passed as argument: %p",
		(type) => {
			expect(isObject(type)).toBe(false);
		},
	);
});

describe("isObjectEmpty(object)", () => {
	it("Should return TRUE on an empty object: {}", () => {
		expect(isObject({})).toBe(true);
	});

	const exampleJSON = faker.datatype.json();

	it(`Should return FALSE on non-empty object (in JSON format): ${exampleJSON}`, () => {
		expect(isObjectEmpty(JSON.parse(exampleJSON))).toBe(false);
	});

	const invalidTypes = [
		faker.datatype.array(1),
		faker.datatype.number(),
		faker.datatype.string(),
		new Map(),
	];

	test.each(invalidTypes)(
		"Should throw TypeError invalid type passed as argument: %p",
		(type) => {
			expect(() => isObjectEmpty(type)).toThrow(TypeError);
		},
	);
});
