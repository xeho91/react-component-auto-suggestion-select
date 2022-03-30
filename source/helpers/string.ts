export function isString(value: unknown): boolean {
    return typeof value === "string";
}

export function isStringEmpty(string: string): boolean {
	if (isString(string)) {
		return string.length === 0;
	} else {
		throw new TypeError("The provided argument is not a String!");
	}
}
