import { HourMinute, LocationList, LocationListData, YearMonthDate } from "@weather-and-traffic-shared/types";

async function getLocationData(date: YearMonthDate, time: HourMinute) {
	const locationsApiUrl = "http://localhost:9001/locations";
	const query = `?date=${date}&time=${time}`;

	try {
		const response = await fetch(locationsApiUrl + query);
		if (!response.ok) {
			throw new Error(`Error fetching data: ${response.status}`)
		}
		return await response.json() as LocationList;
	} catch (error) {
		console.error("Error fetching data:", error);
		throw error;
	}
}

export const getLocations = async (
	date: YearMonthDate,
	time: HourMinute
): Promise<LocationListData[]> => {
	const locationData = await getLocationData(date, time);
	return locationData.data;
};