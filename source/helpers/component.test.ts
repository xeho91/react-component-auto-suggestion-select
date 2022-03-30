import { describe, expect, test } from "vitest";

import { setComponentId } from "$helpers/component";

describe("setComponentId(name, id)", () => {
	const name = "input";
	const id = "uid123";
	const expected = `${name}-${id}`;

	test(`arguments: name ("${name}") and id ("${id}") - should return: "${expected}"`, () => {
		expect(setComponentId(name, id)).toBe(expected);
	});

	it("Should fail on empty arguments", () => {
		// @ts-expect-error
		expect(() => setComponentId()).toThrow(TypeError);
	});

	it("Should fail on invalid type of name passed as argument (first one)", () => {
		// @ts-expect-error
		expect(() => setComponentId(123, id)).toThrow(TypeError);
	});

	it("Should fail on no provided id passed as argument (second one)", () => {
		// @ts-expect-error
		expect(() => setComponentId(name)).toThrow(TypeError);
	});
});
