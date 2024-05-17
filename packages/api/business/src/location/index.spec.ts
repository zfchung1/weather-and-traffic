import { getTrafficCams, getGeoLocationData } from "@weather-and-traffic-api/data";
import { findNearest } from "geolib";
import { getLocations } from "./index";
import { HourMinute, YearMonthDate } from "@weather-and-traffic-shared/types";

jest.mock('geolib', () => ({
	findNearest: jest.fn(),
}));

jest.mock("@weather-and-traffic-api/data");

describe("getLocations", () => {
	let mockDate: YearMonthDate;
	let mockTime: HourMinute;
	let mockNearestLocation;
	beforeEach(() => {
		mockDate = "2023-05-17";
		mockTime = "14:30";
	});

	it("should return the correct locations data", async () => {
		const mockTrafficCams = [
			{ cameraId: "cam1", coordinate: { latitude: 40.7128, longitude: -74.0060 }, image: "cam1.jpg" }
		];
		const mockGeoLocations = [
			{ areaName: "Area1", coordinate: { latitude: 40.7128, longitude: -74.0060 }, forecast: "Sunny" }
		];
		mockNearestLocation = {
			areaName: "Area1",
			coordinate: { latitude: 40.7128, longitude: -74.0060 },
			forecast: "Sunny"
		};

		(getTrafficCams as jest.Mock).mockResolvedValue(mockTrafficCams);
		(getGeoLocationData as jest.Mock).mockResolvedValue(mockGeoLocations);
		(findNearest as jest.Mock).mockReturnValue(mockNearestLocation);

		const expectedData = {
			date: mockDate,
			time: mockTime,
			data: [
				{
					cameraId: "cam1",
					locationName: "Area1",
					coordinate: { latitude: 40.7128, longitude: -74.0060 },
					forecast: "Sunny",
					image: "cam1.jpg"
				}
			]
		};

		const result = await getLocations(mockDate, mockTime);

		expect(result).toEqual(expectedData);
	});

	it("should handle empty traffic cams data", async () => {
		mockNearestLocation = {
			areaName: "Area1",
			coordinate: { latitude: 40.7128, longitude: -74.0060 },
			forecast: "Sunny"
		};

		(getTrafficCams as jest.Mock).mockResolvedValue([]);
		(getGeoLocationData as jest.Mock).mockResolvedValue([]);
		(findNearest as jest.Mock).mockReturnValue(mockNearestLocation);

		const expectedData = {
			date: mockDate,
			time: mockTime,
			data: []
		};

		const result = await getLocations(mockDate, mockTime);

		expect(result).toEqual(expectedData);
	});
});
