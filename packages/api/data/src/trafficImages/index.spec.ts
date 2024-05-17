import { ITrafficImages } from "./types";
import { getTrafficCamData, getTrafficCams } from "./index";
import { partialIsoString } from "@weather-and-traffic-shared/types";

describe("Traffic Data API", () => {
	beforeEach(() => {
		global.fetch = jest.fn();
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it("should fetch and return traffic cam data correctly for getTrafficCamData", async () => {
		const mockData: ITrafficImages = {
			items: [
				{
					timestamp: "fake timestamp",
					cameras: [
						{
							timestamp: "fake timestamp",
							camera_id: "camera1",
							location: { latitude: 1.29027, longitude: 103.851959 },
							image: "http://example.com/image1.jpg",
							image_metadata: {
								height: 480,
								width: 640,
								md5: "mock md5 value"
							}
						}
						// more cameras if needed
					]
				}
			],
			api_info: { status: "fake status" }
		};

		(global.fetch as jest.Mock).mockResolvedValueOnce({
			ok: true,
			json: async () => mockData
		});

		const dateTime = "2023-05-01T00:00:00";
		const result = await getTrafficCamData(dateTime);

		expect(global.fetch).toHaveBeenCalledWith(`https://api.data.gov.sg/v1/transport/traffic-images?date_time=${encodeURIComponent(dateTime)}`);
		expect(result).toEqual([
			{
				id: "camera1",
				coordinate: { latitude: 1.29027, longitude: 103.851959 },
				image: {
					url: "http://example.com/image1.jpg",
					height: 480,
					width: 640
				}
			}
			// more cameras if needed
		]);
	});

	it("should fetch and return traffic cams correctly for getTrafficCams", async () => {
		const mockData: ITrafficImages = {
			items: [
				{
					timestamp: "fake timestamp",
					cameras: [
						{
							timestamp: "fake timestamp",
							camera_id: "camera1",
							location: { latitude: 1.29027, longitude: 103.851959 },
							image: "http://example.com/image1.jpg",
							image_metadata: {
								height: 480,
								width: 640,
								md5: "mock md5 value"
							}
						}
						// more cameras if needed
					]
				}
			],
			api_info: { status: "fake status" }
		};

		(global.fetch as jest.Mock).mockResolvedValueOnce({
			ok: true,
			json: async () => mockData
		});

		const dateTime: partialIsoString = "2023-05-01T00:00:00";
		const result = await getTrafficCams(dateTime);

		expect(global.fetch).toHaveBeenCalledWith(`https://api.data.gov.sg/v1/transport/traffic-images?date_time=${encodeURIComponent(dateTime)}`);
		expect(result).toEqual([
			{
				cameraId: "camera1",
				coordinate: { latitude: 1.29027, longitude: 103.851959 },
				image: {
					url: "http://example.com/image1.jpg",
					height: 480,
					width: 640
				}
			}
			// more cameras if needed
		]);
	});
});
