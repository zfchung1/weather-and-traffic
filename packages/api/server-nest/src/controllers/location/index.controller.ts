import { Controller, Get, Query } from "@nestjs/common";
import { HourMinute, YearMonthDate } from "@weather-and-traffic-shared/types";
import { AppService } from "../../app.service";

@Controller("locations")
export class LocationController {
	constructor(private readonly appService: AppService) {
	}

	@Get()
	async getLocations(@Query("date") date: YearMonthDate, @Query("time") time: HourMinute) {
		return await this.appService.getLocations(date, time);
	}
}
