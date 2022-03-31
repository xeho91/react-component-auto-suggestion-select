export function isArrayEmpty(array: Array<unknown>): boolean {
	if (Array.isArray(array)) {
		return array.length === 0;
	} else {
		throw new TypeError("The provided argument is not a Array!");
	}
}
