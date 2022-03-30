import { isStringEmpty } from "$helpers/string";

export function setComponentId(name: string, id: string): string {
	if (isStringEmpty(name)) {
		throw new TypeError("Provided name cannot be an empty string!");
	} else if (isStringEmpty(id)) {
		throw new TypeError("Provided id cannot be an empty string!");
	} else {
		return `${name}-${id}`;
	}
}
