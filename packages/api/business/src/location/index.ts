import { getTrafficCamData, getTrafficCams } from "@weather-and-traffic-api/data";
import { getWeatherForecast, getGeoLocationData } from "@weather-and-traffic-api/data";
import { findNearest } from "geolib";
import { GeoLocation } from "@weather-and-traffic-api/data";

const fakeDateTime = "2020-04-26T01:01:00";

export function getLocations(date: string, time: string) {
	const trafficCams = getTrafficCams(fakeDateTime);
	const geoLocations = getGeoLocationData();

	const data = trafficCams.map((trafficCam) => {
		const nearestLocation = findNearest(trafficCam.coordinate, geoLocations);
		const location = nearestLocation as GeoLocation;
		return {
			cameraId: trafficCam.cameraId,
			locationName: location.areaName,
			coordinate: trafficCam.coordinate
		};
	});

	return { date, time, data };
}