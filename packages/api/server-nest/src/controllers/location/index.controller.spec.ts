import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from '../../app.service';
import { YearMonthDate, HourMinute } from '@weather-and-traffic-shared/types';
import { LocationController } from "./index.controller";

describe('LocationController', () => {
	let locationController: LocationController;
	let appService: AppService;

	const mockAppService = {
		getLocations: jest.fn(),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [LocationController],
			providers: [
				{
					provide: AppService,
					useValue: mockAppService,
				},
			],
		}).compile();

		locationController = module.get<LocationController>(LocationController);
		appService = module.get<AppService>(AppService);
	});

	it('should be defined', () => {
		expect(locationController).toBeDefined();
	});

	describe('getLocations', () => {
		it('should call appService.getLocations with the correct parameters', async () => {
			const date: YearMonthDate = "2024-01-01";
			const time: HourMinute = "01:01";

			await locationController.getLocations(date, time);

			expect(appService.getLocations).toHaveBeenCalledWith(date, time);
		});

		it('should return the result from appService.getLocations', async () => {
			const date: YearMonthDate = "2024-01-01";
			const time: HourMinute = "01:01";
			const result = [{ location: 'example' }];

			mockAppService.getLocations.mockResolvedValue(result);

			const response = await locationController.getLocations(date, time);

			expect(response).toEqual(result);
		});
	});
});
