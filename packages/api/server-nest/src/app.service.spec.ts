import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { getLocations, getMostRecentSearch } from '@weather-and-traffic-api/business';
import { HourMinute, YearMonthDate } from "@weather-and-traffic-shared/types";

jest.mock('@weather-and-traffic-api/business');

describe('AppService', () => {
	let appService: AppService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [AppService],
		}).compile();

		appService = module.get<AppService>(AppService);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should call getLocations with provided date and time', () => {
		const date: YearMonthDate = "2024-01-01";
		const time: HourMinute = "01:01";
		const expectedLocations = ['Location1', 'Location2'];

		(getLocations as jest.Mock).mockReturnValue(expectedLocations);

		const result = appService.getLocations(date, time);

		expect(getLocations).toHaveBeenCalledWith(date, time);
		expect(result).toEqual(expectedLocations);
	});

	it('should call getMostRecentSearch with provided limit', () => {
		const mockLimit = 10;
		const expectedSearchResults = ['Search1', 'Search2'];

		(getMostRecentSearch as jest.Mock).mockReturnValue(expectedSearchResults);

		const result = appService.getMostRecentSearch(mockLimit);

		expect(getMostRecentSearch).toHaveBeenCalledWith(mockLimit);
		expect(result).toEqual(expectedSearchResults);
	});
});
