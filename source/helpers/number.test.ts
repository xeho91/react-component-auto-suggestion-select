import { faker } from "@faker-js/faker";
import { describe, expect, test } from "vitest";

import { isNumber } from "$helpers/number";

describe("isNumber(argument)", () => {
	const randomMumber = faker.datatype.number();

	test(`argument: "${randomMumber}" - should return FALSE`, () => {
		expect(isNumber(`"${randomMumber}`)).toBe(false);
	});

	test(`argument: ${randomMumber} - should return TRUE`, () => {
		expect(isNumber(randomMumber)).toBe(true);
	});

	test(`argument: NaN - should return FALSE`, () => {
		expect(isNumber(Number.NaN)).toBe(false);
	});

	test(`argument: Number.POSITIVE_INFINITY - should return FALSE`, () => {
		expect(isNumber(Number.POSITIVE_INFINITY)).toBe(false);
	});

	test(`argument: Number.MAX_VALUE - should return TRUE`, () => {
		expect(isNumber(Number.MAX_VALUE)).toBe(true);
	});

	test(`argument: BigInt(100) - should return FALSE`, () => {
		expect(isNumber(BigInt(100))).toBe(false);
	});
});
