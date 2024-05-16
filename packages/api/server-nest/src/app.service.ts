import { Injectable } from "@nestjs/common";
import { getLocations, getMostRecentSearch } from "@weather-and-traffic-api/business";
import { HourMinute, YearMonthDate } from "@weather-and-traffic-shared/types";

@Injectable()
export class AppService {
	getLocations(date: YearMonthDate, time: HourMinute) {
		return getLocations(date, time);
	}

	getMostRecentSearch(limit: number){
		return getMostRecentSearch(limit);
	}
}
