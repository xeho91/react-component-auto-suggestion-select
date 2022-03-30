import { isNumber } from "./number";

export const SECONDS_A_MINUTE = 60;
export const SECONDS_A_HOUR = SECONDS_A_MINUTE * 60;
export const SECONDS_A_DAY = SECONDS_A_HOUR * 24;
export const SECONDS_A_WEEK = SECONDS_A_DAY * 7;

export const MILLISECONDS_A_SECOND = 1000;
export const MILLISECONDS_A_MINUTE = SECONDS_A_MINUTE * MILLISECONDS_A_SECOND;
export const MILLISECONDS_A_HOUR = SECONDS_A_HOUR * MILLISECONDS_A_SECOND;
export const MILLISECONDS_A_DAY = SECONDS_A_DAY * MILLISECONDS_A_SECOND;
export const MILLISECONDS_A_WEEK = SECONDS_A_WEEK * MILLISECONDS_A_SECOND;

function validateNumber(value: unknown): number {
	if (!isNumber(value)) {
		throw new TypeError(
			`Unexpected type of the passed argument ("${typeof value}"). Only "number" is accepted!`,
		);
	} else {
		return value as number;
	}
}

// To miliseconds
export const secondsToMilliseconds = (seconds: number) => {
	return MILLISECONDS_A_SECOND * validateNumber(seconds);
};
export const minutesToMilliseconds = (minutes: number) => {
	return MILLISECONDS_A_MINUTE * validateNumber(minutes);
};
export const hoursToMilliseconds = (hours: number) => {
	return MILLISECONDS_A_HOUR * validateNumber(hours);
};

// To seconds
export const millisecondsToSeconds = (milliseconds: number) => {
	return Math.round(validateNumber(milliseconds) / MILLISECONDS_A_SECOND);
};
export const minutesToSeconds = (minutes: number) => {
	return SECONDS_A_MINUTE * validateNumber(minutes);
};
export const hoursToSeconds = (hours: number) => {
	return SECONDS_A_HOUR * validateNumber(hours);
};
