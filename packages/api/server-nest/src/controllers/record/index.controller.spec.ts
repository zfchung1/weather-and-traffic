import { Test, TestingModule } from "@nestjs/testing";
import { AppService } from "../../app.service";
import { RecordController } from "./index.controller";

describe("RecordController", () => {
	let recordController: RecordController;
	let appService: AppService;

	beforeEach(async () => {
		const appServiceMock = {
			getMostRecentSearch: jest.fn()
		};

		const module: TestingModule = await Test.createTestingModule({
			controllers: [RecordController],
			providers: [
				{
					provide: AppService,
					useValue: appServiceMock
				}
			]
		}).compile();

		recordController = module.get<RecordController>(RecordController);
		appService = module.get<AppService>(AppService);
	});

	describe("getRecentSearch", () => {
		it("should call appService.getMostRecentSearch with the correct limit", async () => {
			const limit = 5;
			const result = ["search1", "search2"];

			appService.getMostRecentSearch = jest.fn().mockResolvedValue(result);

			expect(await recordController.getRecentSearch(limit)).toBe(result);
			expect(appService.getMostRecentSearch).toHaveBeenCalledWith(limit);
		});

		it("should return the result from appService.getMostRecentSearch", async () => {
			const limit = 3;
			const result = ["searchA", "searchB"];

			appService.getMostRecentSearch = jest.fn().mockResolvedValue(result);

			const response = await recordController.getRecentSearch(limit);
			expect(response).toBe(result);
		});
	});
});
