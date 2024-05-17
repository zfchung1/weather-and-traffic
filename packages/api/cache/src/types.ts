export interface StaleWrapper<T> {
	timestamp: number;
	value: T;
}

export interface CacheClient {
	setItem<T extends object>(
		key: string,
		value: T,
		ttlInSeconds: number,
	): Promise<void>;

	getItem<T>(key: string): Promise<T | null>;

	deleteItem(key: string): Promise<void>;
}
