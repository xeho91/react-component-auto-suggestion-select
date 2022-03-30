import { faker } from "@faker-js/faker";
import { describe, expect, it, test } from "vitest";

import { isString, isStringEmpty } from "$helpers/string";

describe("isString(argument)", () => {
	test(`argument: "Matt" - should return true`, () => {
		expect(isString("Matt")).toBe(true);
	});

	test(`argument: 123 - should return false`, () => {
		expect(isString(123)).toBe(false);
	});
});

describe("isStringEmpty(string)", () => {
	it("Should return TRUE on an empty string", () => {
		expect(isStringEmpty("")).toBe(true);
	});

	const randomString = faker.datatype.string();

	it(`Should return FALSE on a random string: "${randomString}"`, () => {
		expect(isStringEmpty(randomString)).toBe(false);
	});

	const incorrectTypes = [
		faker.datatype.array(),
		faker.datatype.number(),
		JSON.parse(faker.datatype.json()),
	];

	test.each(incorrectTypes)(
		"It should throw TypeError on passed invalid argument: %p",
		(type) => {
			expect(() => isStringEmpty(type)).toThrow(TypeError);
		},
	);
});
