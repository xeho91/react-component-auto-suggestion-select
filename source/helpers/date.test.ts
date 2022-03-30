import { faker } from "@faker-js/faker";
import { describe, expect, test } from "vitest";

import {
	hoursToMilliseconds,
	hoursToSeconds,
	millisecondsToSeconds,
	MILLISECONDS_A_HOUR,
	MILLISECONDS_A_MINUTE,
	MILLISECONDS_A_SECOND,
	minutesToMilliseconds,
	minutesToSeconds,
	secondsToMilliseconds,
	SECONDS_A_HOUR,
	SECONDS_A_MINUTE,
} from "$helpers/date";

describe("secondsToMilliseconds(seconds)", () => {
	const seconds = faker.datatype.number({ max: 60 });
	const expected = seconds * MILLISECONDS_A_SECOND;

	test(`seconds: ${seconds} - should return: ${expected}`, () => {
		expect(secondsToMilliseconds(seconds)).toBe(expected);
	});

	test(`seconds: "${seconds}" - should throw TypeError`, () => {
		expect(secondsToMilliseconds(seconds)).toThrow(TypeError);
	});
});

describe("minutesToMilliseconds(minutes)", () => {
	const minutes = faker.datatype.number({ max: 60 });
	const expected = minutes * MILLISECONDS_A_MINUTE;

	test(`minutes: ${minutes} - should return: ${expected}`, () => {
		expect(minutesToMilliseconds(minutes)).toBe(expected);
	});

	test(`minutes: Number.NEGATIVE_INFINITY - should throw TypeError`, () => {
		expect(() => minutesToMilliseconds(Number.NEGATIVE_INFINITY)).toThrow(
			TypeError,
		);
	});
});

describe("hoursToMilliseconds(hours)", () => {
	const hours = faker.datatype.number({ max: 24 });
	const expected = hours * MILLISECONDS_A_HOUR;

	test(`hours: ${hours} - should return: ${expected}`, () => {
		expect(hoursToMilliseconds(hours)).toBe(expected);
	});

	test(`hours: "${hours}" - should throw TypeError`, () => {
		expect(hoursToMilliseconds(hours)).toThrow(TypeError);
	});
});

describe("millisecondsToSeconds(milliseconds)", () => {
	const milliseconds = faker.datatype.number();
	const expected = Math.round(milliseconds / MILLISECONDS_A_SECOND);

	test(`milliseconds: ${milliseconds} - should return: ${expected}`, () => {
		expect(millisecondsToSeconds(milliseconds)).toBe(expected);
	});

	test(`milliseconds: BigInt(100) - should throw TypeError`, () => {
		// @ts-expect-error
		expect(() => millisecondsToSeconds(BigInt(100n))).toThrow(TypeError);
	});
});

describe("minutesToSeconds(minutes)", () => {
	const minutes = faker.datatype.number({ max: 60 });
	const expected = minutes * SECONDS_A_MINUTE;

	test(`minutes: ${minutes} - should return: ${expected}`, () => {
		expect(minutesToSeconds(minutes)).toBe(expected);
	});

	test(`minutes: Number.POSITIVE_INFINITY - should throw TypeError`, () => {
		expect(() => minutesToSeconds(Number.POSITIVE_INFINITY)).toThrow(
			TypeError,
		);
	});
});

describe("hoursToSeconds(hours)", () => {
	const hours = faker.datatype.number({ max: 24 });
	const expected = hours * SECONDS_A_HOUR;

	test(`hours: ${hours} - should return: ${expected}`, () => {
		expect(hoursToSeconds(hours)).toBe(expected);
	});

	test(`hours: NaN - should throw TypeError`, () => {
		expect(() => hoursToSeconds(Number.NaN)).toThrow(TypeError);
	});
});
