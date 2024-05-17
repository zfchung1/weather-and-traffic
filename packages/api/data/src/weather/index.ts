import { GeoLocation, IWeatherForecast } from "./types";
import { partialIsoString } from "@weather-and-traffic-shared/types";

async function newGetWeatherData(dateTime: partialIsoString) {
	const trafficCamApiUrl = "https://api.data.gov.sg/v1/environment/2-hour-weather-forecast";
	const query = `?date_time=${encodeURIComponent(dateTime)}`;

	try {
		const response = await fetch(trafficCamApiUrl + query);
		if (!response.ok) {
			// do something to handle the error
		}
		return await response.json() as IWeatherForecast;
	} catch (error) {
		console.error("Error fetching data:", error);
		throw error;
	}
}

export async function getGeoLocationData(dateTime: partialIsoString): Promise<GeoLocation[]> {
	const weatherData = await newGetWeatherData(dateTime);
	//TODO: '2022-01-01T10:01:00' return  { items: [ {} ], area_metadata: [], api_info: { status: 'healthy' } }
	const normalizedForecasts = weatherData.items[0].forecasts.reduce((final, { area, forecast }) => {
		final[area] = { forecast };
		return final;
	}, {} as { [key: string]: { forecast: string } });
	return weatherData.area_metadata.map((area) => {
		return {
			areaName: area.name,
			longitude: area.label_location.longitude,
			latitude: area.label_location.latitude,
			forecast: normalizedForecasts[area.name].forecast
		};
	});
}

