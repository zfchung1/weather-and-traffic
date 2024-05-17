import { CacheClient } from "../../types";

interface CacheData {
	[key: string]: {
		value: object;
		expire: number;
	};
}

export const memoryClientFactory = (keyPrefix: string = ""): CacheClient => {
	let data: CacheData = {};

	function clean() {
		const now = Date.now();
		const validEntries = Object.entries(data).filter(([, { expire }]) => {
			return expire > now;
		});
		data = Object.fromEntries(validEntries);
	}

	async function setItem<T extends object>(
		key: string,
		value: T,
		ttlInSeconds: number,
	): Promise<void> {
		clean();
		const ttlInMilliseconds = ttlInSeconds * 1000;
		data[keyPrefix + key] = {
			expire: Date.now() + ttlInMilliseconds,
			value,
		};
	}

	async function getItem<T>(key: string): Promise<T | null> {
		clean();
		const cache = data[keyPrefix + key];
		return cache ? (cache.value as T) : null;
	}

	async function deleteItem(key: string): Promise<void> {
		clean();
		delete data[keyPrefix + key];
	}

	return {
		getItem,
		setItem,
		deleteItem,
	};
};
