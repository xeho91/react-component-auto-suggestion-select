export function isMap(parameter: unknown): boolean {
	return parameter instanceof Map;
}

export function isMapEmpty(map: Map<unknown, unknown>): boolean {
	if (isMap(map)) {
		return map.size === 0;
	} else {
		throw new TypeError("The provided argument is not a Map!");
	}
}
