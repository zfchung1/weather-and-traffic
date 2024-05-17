import { SearchRecordData } from "@weather-and-traffic-shared/types";
import { getRecentSearch } from "./index";

global.fetch = jest.fn();

describe("getRecentSearch", () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	it("should fetch recent searches successfully", async () => {
		const mockData: SearchRecordData[] = [
			{ cameraId: "1", location: "Location1", searchDate: new Date("2023-05-17T00:00:00Z") },
			{ cameraId: "2", location: "Location2", searchDate: new Date("2023-05-17T00:01:00Z") }
		];

		// Mock the fetch response to return mockData
		(fetch as jest.Mock).mockResolvedValueOnce({
			ok: true,
			json: async () => mockData
		});

		const result = await getRecentSearch(2);

		expect(result).toEqual(mockData);
		expect(fetch).toHaveBeenCalledTimes(1);
		expect(fetch).toHaveBeenCalledWith("http://localhost:9001/recent-search?limit=2");
	});

	it("should throw an error when fetch fails", async () => {
		const errorMessage = "Error fetching data 500";

		(fetch as jest.Mock).mockResolvedValueOnce({
			ok: false,
			status: 500
		});

		await expect(getRecentSearch(2)).rejects.toThrow(errorMessage);
		expect(fetch).toHaveBeenCalledTimes(1);
		expect(fetch).toHaveBeenCalledWith("http://localhost:9001/recent-search?limit=2");
	});

	it("should log and rethrow an error when fetch throws an exception", async () => {
		const consoleErrorMock = jest.spyOn(console, "error").mockImplementation(() => {
		});

		(fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

		await expect(getRecentSearch(2)).rejects.toThrow("Network error");
		expect(fetch).toHaveBeenCalledTimes(1);
		expect(fetch).toHaveBeenCalledWith("http://localhost:9001/recent-search?limit=2");
		expect(consoleErrorMock).toHaveBeenCalledWith("Error fetching data:", expect.any(Error));

		consoleErrorMock.mockRestore();
	});
});

