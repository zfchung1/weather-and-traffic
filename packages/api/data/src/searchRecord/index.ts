import { getDBClient } from "../db/client";


interface SearchRecordDb {
	id: string;
	search_date: Date;
	location: string;
	camera_id: string;
	created_at: Date;
	updated_at: Date;
}

export async function getSearchRecord(limit: number) {

	try {
		const searchRecordTable = getDBClient<SearchRecordDb>("search_record");

		const latestRecords = await searchRecordTable
			.select("search_date", "location", "camera_id")
			.orderBy("created_at", "desc")
			.limit(limit);

		return latestRecords.map((record) => ({
			searchDate: record.search_date,
			location: record.location,
			cameraId: record.camera_id
		}))

	} catch (e) {
		throw e;
	}
}