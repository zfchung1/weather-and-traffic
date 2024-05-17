import { IWeatherForecast, GeoLocation } from "./types";
import { getGeoLocationData } from "./index";


const mockedWeatherData: IWeatherForecast = {
	area_metadata: [
		{ name: "Area1", label_location: { latitude: 1.1, longitude: 103.1 } },
		{ name: "Area2", label_location: { latitude: 1.2, longitude: 103.2 } }
	],
	items: [{
		update_timestamp: "fake timestamp",
		timestamp: "fake_timestamp",
		valid_period: {
			start: "fake start time",
			end: "fake end time"
		},
		forecasts: [
			{ area: "Area1", forecast: "Rainy" },
			{ area: "Area2", forecast: "Sunny" }
		]
	}],
	api_info: { status: "healthy" }
};

describe("getGeoLocationData", () => {
	beforeEach(() => {
		global.fetch = jest.fn();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should return geo location data correctly", async () => {
		(fetch as jest.Mock).mockResolvedValueOnce({
			ok: true,
			json: async () => mockedWeatherData
		});

		const dateTime = "2022-01-01T10:01:00";
		const result = await getGeoLocationData(dateTime);

		const expected: GeoLocation[] = [
			{
				areaName: "Area1",
				latitude: 1.1,
				longitude: 103.1,
				forecast: "Rainy"
			},
			{
				areaName: "Area2",
				latitude: 1.2,
				longitude: 103.2,
				forecast: "Sunny"
			}
		];

		expect(result).toEqual(expected);
	});
});
