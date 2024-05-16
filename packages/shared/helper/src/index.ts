export function checkUndefinedOrNull(
	key: string,
	value?: string | null
): string {
	if (value === undefined || value === null) {
		throw new Error(`${key} key not set`);
	}
	return value;
}
