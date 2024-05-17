import { checkUndefinedOrNull } from "./";

describe("checkUndefinedOrNull", () => {
	it("should return value when the value is neither null nor undefined", () => {
		const result = checkUndefinedOrNull("key", "value");
		expect(result).toEqual("value");
	});

	it("should throw error when the value is null", () => {
		try {
			checkUndefinedOrNull("test", null);
		} catch (error) {
			expect(error).toHaveProperty("message", "test key not set");
		}
	});

	it("should throw error when value is undefined", () => {
		try {
			checkUndefinedOrNull("test", undefined);
		} catch (error) {
			expect(error).toHaveProperty("message", "test key not set");
		}
	});
});
