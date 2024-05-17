import { SearchRecordData } from "@weather-and-traffic-shared/types";

export async function getRecentSearch(limit: number) {
	// URL can be extracted to be part of config service / process.env
	const locationsApiUrl = "http://localhost:9001/recent-search";
	const query = `?limit=${limit}`;

	try {
		const response = await fetch(locationsApiUrl + query);
		if (!response.ok) {
			throw new Error(`Error fetching data ${response.status}`);
		}
		return await response.json() as SearchRecordData[];
	} catch (error) {
		console.error("Error fetching data:", error);
		throw error;
	}
}