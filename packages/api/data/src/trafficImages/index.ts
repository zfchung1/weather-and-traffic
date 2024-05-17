import { ITrafficImages } from "./types";
import { partialIsoString } from "@weather-and-traffic-shared/types";
import { memoryClientFactory } from "@weather-and-traffic-api/cache";

const memoryClient = memoryClientFactory("cache:");
const fifteenMinutesInSeconds = 900;

async function newGetTrafficCamData(dateTime: partialIsoString) {
	const cacheKey = `traffic:${dateTime}`;
	const cachedResult = await memoryClient.getItem<ITrafficImages>(cacheKey);

	if (cachedResult) {
		console.log(`Return cached result for ${cacheKey}`);
		return cachedResult;
	}

	const trafficCamApiUrl = "https://api.data.gov.sg/v1/transport/traffic-images";
	const query = `?date_time=${encodeURIComponent(dateTime)}`;

	try {
		const response = await fetch(trafficCamApiUrl + query);
		if (!response.ok) {
			// do something
		}
		const result = await response.json() as ITrafficImages;
		await memoryClient.setItem(cacheKey, result, fifteenMinutesInSeconds);
		return result;
	} catch (error) {
		console.error("Error fetching data:", error);
		throw error;
	}
}

export async function getTrafficCamData(dateTime: partialIsoString) {
	const trafficCamData = await newGetTrafficCamData(dateTime);
	return trafficCamData.items[0].cameras.map((camera) => {
		return {
			id: camera.camera_id,
			coordinate: camera.location,
			image: {
				url: camera.image,
				height: camera.image_metadata.height,
				width: camera.image_metadata.width
			}
		};
	});
}

export async function getTrafficCams(dateTime: partialIsoString) {
	const trafficCamData = await newGetTrafficCamData(dateTime);
	return trafficCamData.items[0].cameras.map((camera) => {
		return {
			cameraId: camera.camera_id,
			coordinate: camera.location,
			image: {
				url: camera.image,
				height: camera.image_metadata.height,
				width: camera.image_metadata.width
			}
		};
	});
}