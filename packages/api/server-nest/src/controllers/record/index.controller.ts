import { Controller, Get, Query } from "@nestjs/common";
import { AppService } from "../../app.service";

@Controller("recent-search")
export class RecordController {
	constructor(private readonly appService: AppService) {
	}

	@Get()
	async getRecentSearch(@Query("limit") limit: number) {
		return await this.appService.getMostRecentSearch(limit);
	}
}
