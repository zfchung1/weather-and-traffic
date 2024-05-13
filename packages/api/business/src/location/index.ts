import { getTrafficCams } from "@weather-and-traffic-api/data";
import { getGeoLocationData } from "@weather-and-traffic-api/data";
import { findNearest } from "geolib";
import { GeoLocation } from "@weather-and-traffic-api/data";
import { HourMinute, LocationList, partialIsoString, YearMonthDate } from "@weather-and-traffic-shared/types";

function toPartialIsoString(date: YearMonthDate, time: HourMinute) {
	// TS2590: Expression produces a union type that is too complex to represent.
	return `${date as string}T${time}:00` as partialIsoString;
}

export async function getLocations(date: YearMonthDate, time: HourMinute): Promise<LocationList> {
	const partialIsoDateTime = toPartialIsoString(date, time);
	const trafficCams = await getTrafficCams(partialIsoDateTime);
	const geoLocations = await getGeoLocationData(partialIsoDateTime);

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