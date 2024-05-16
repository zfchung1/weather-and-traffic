import { SearchRecordData } from "@weather-and-traffic-shared/types";

export async function getRecentSearch(limit: number) {
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