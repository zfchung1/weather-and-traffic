import {
	LocationList,
	YearMonthDate,
	HourMinute
} from "@weather-and-traffic-shared/types";
import { getLocations } from "./index";

global.fetch = jest.fn();

describe("getLocations", () => {
	const mockDate: YearMonthDate = "2023-05-17";
	const mockTime: HourMinute = "12:00";

	afterEach(() => {
		jest.resetAllMocks();
	});

	it("should fetch location data successfully", async () => {
		const mockLocationData: LocationList = {
			date: "2022-01-01",
			time: "01:01",
			data: [
				{
					cameraId: "1",
					locationName: "Location1",
					coordinate: {
						longitude: 111,
						latitude: 222
					},
					forecast: "fake forecast",
					image: {
						url: "fake url",
						height: 111,
						width: 222
					}
				},
				{
					cameraId: "2", locationName: "Location2", coordinate: {
						longitude: 111,
						latitude: 222
					},
					forecast: "fake forecast",
					image: {
						url: "fake url",
						height: 111,
						width: 222
					}
				}
			]
		};

		(fetch as jest.Mock).mockResolvedValueOnce({
			ok: true,
			json: async () => mockLocationData
		});

		const result = await getLocations(mockDate, mockTime);

		expect(result).toEqual(mockLocationData.data);
		expect(fetch).toHaveBeenCalledTimes(1);
		expect(fetch).toHaveBeenCalledWith(`http://localhost:9001/locations?date=${mockDate}&time=${mockTime}`);
	});

	it("should throw an error when fetch fails", async () => {
		const errorMessage = "Error fetching data: 500";

		(fetch as jest.Mock).mockResolvedValueOnce({
			ok: false,
			status: 500
		});

		await expect(getLocations(mockDate, mockTime)).rejects.toThrow(errorMessage);
		expect(fetch).toHaveBeenCalledTimes(1);
		expect(fetch).toHaveBeenCalledWith(`http://localhost:9001/locations?date=${mockDate}&time=${mockTime}`);
	});

	it("should log and rethrow an error when fetch throws an exception", async () => {
		const consoleErrorMock = jest.spyOn(console, "error").mockImplementation(() => {
		});

		(fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

		await expect(getLocations(mockDate, mockTime)).rejects.toThrow("Network error");
		expect(fetch).toHaveBeenCalledTimes(1);
		expect(fetch).toHaveBeenCalledWith(`http://localhost:9001/locations?date=${mockDate}&time=${mockTime}`);
		expect(consoleErrorMock).toHaveBeenCalledWith("Error fetching data:", expect.any(Error));

		consoleErrorMock.mockRestore();
	});
});
