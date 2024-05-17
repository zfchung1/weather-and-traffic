import { getSearchRecord } from '@weather-and-traffic-api/data';
import { getMostRecentSearch } from "./index";

jest.mock('@weather-and-traffic-api/data');

describe('getMostRecentSearch', () => {
	it('should call getSearchRecord with the correct limit', async () => {
		const limit = 5;
		const mockResult = [{ id: 1, search: 'example' }];

		(getSearchRecord as jest.Mock).mockResolvedValue(mockResult);

		const result = await getMostRecentSearch(limit);

		expect(getSearchRecord).toHaveBeenCalledWith(limit);
		expect(result).toEqual(mockResult);
	});
});
