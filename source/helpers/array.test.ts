import { faker } from "@faker-js/faker";
import { describe, expect, it, test } from "vitest";

import { isArrayEmpty } from "$helpers/array";

describe("isArrayEmpty(array)", () => {
	it("Should return TRUE on an empty Array", () => {
		expect(isArrayEmpty([])).toBe(true);
	});

	const randomArray = faker.datatype.array();

	it("Should return FALSE on a random array", () => {
		expect(isArrayEmpty(randomArray)).toBe(false);
	});

	const incorrectTypes = [
		faker.datatype.bigInt(),
		faker.datatype.string(),
		faker.datatype.number(),
		JSON.parse(faker.datatype.json()),
	];

	test.each(incorrectTypes)(
		"It should throw TypeError on passed invalid argument: %p",
		(type) => {
			expect(() => isArrayEmpty(type)).toThrow(TypeError);
		},
	);
});
