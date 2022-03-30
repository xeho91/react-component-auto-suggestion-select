export function isNumber(value: unknown): boolean {
	return (
		typeof value === "number" &&
		!Number.isNaN(value) &&
		Number.isFinite(value)
	);
}
