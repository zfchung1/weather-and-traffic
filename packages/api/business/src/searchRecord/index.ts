import { getSearchRecord } from "@weather-and-traffic-api/data";


export async function getMostRecentSearch(limit: number){
	return getSearchRecord(limit);
}