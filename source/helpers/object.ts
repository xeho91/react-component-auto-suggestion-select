export function isObject(value: unknown): boolean {
	// eslint-disable-next-line unicorn/no-null
	return (
		value !== null &&
		typeof value === "object" &&
		value.constructor.name === "Object"
	);
}

export function isObjectEmpty<Schema = object>(object: Schema): boolean {
	if (isObject(object)) {
		return Object.entries(object).length === 0;
	} else {
		throw new TypeError(
			`The provided argument is not an object! Received ${typeof object} instead.`,
		);
	}
}
