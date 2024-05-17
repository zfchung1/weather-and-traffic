import { memoryClientFactory } from "./";
import { CacheClient } from "../../types";

describe("Memory Client for Cache Decorators", () => {
	let memoryClient: CacheClient | null;

	afterEach(() => {
		memoryClient = null;
	});

	it("should set item and get item", async () => {
		const key = "testKey";
		const value = { data: "testValue" };
		const ttlInSeconds = 60;
		memoryClient = memoryClientFactory();

		await memoryClient.setItem(key, value, ttlInSeconds);
		const retrievedValue = await memoryClient.getItem("testKey");

		expect(retrievedValue).toBe(value);
	});

	it("should get null for expired item", async () => {
		const key = "testKey";
		const value = { data: "testValue" };
		const ttlInSeconds = -10;
		memoryClient = memoryClientFactory();

		await memoryClient.setItem(key, value, ttlInSeconds);
		const retrievedValue = await memoryClient.getItem("testKey");
		expect(retrievedValue).toBeNull();
	});

	it("should delete item", async () => {
		const key = "testKey";
		const value = { data: "testValue" };
		const ttlInSeconds = 60;
		memoryClient = memoryClientFactory();

		await memoryClient.setItem(key, value, ttlInSeconds);
		await memoryClient.deleteItem(key);
		const retrievedValue = await memoryClient.getItem(key);

		expect(retrievedValue).toBeNull();
	});

	it("should prefix keys", async () => {
		const key = "testKey";
		const value = { data: "testValue" };
		const ttlInSeconds = 60;
		memoryClient = memoryClientFactory("prefix:");

		await memoryClient.setItem(key, value, ttlInSeconds);
		const retrievedValue = await memoryClient.getItem("testKey");

		expect(retrievedValue).toBe(value);
	});
});
