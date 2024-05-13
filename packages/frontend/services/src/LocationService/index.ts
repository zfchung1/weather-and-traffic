interface LocationApiResponse {
	date: string;
	time: string;
	locations: {
		[key: string]: {
			name: string;
		};
	};
}

export interface LocationData {
	key: string;
	name: string;
}

const mockResponse: LocationApiResponse = {
	date: "2024-01-01",
	time: "22:00:00",
	locations: {
		"ang_mo_kio": {
			name: "Ang Mo Kio"
		},
		"bedok": {
			name: "Bedok"
		}
	}
};

export const getLocations = (
	date: string,
	time: string
): LocationData[] => {
	return Object.entries(mockResponse.locations).map(([key, value]) => ({ key, name: value.name }));
};