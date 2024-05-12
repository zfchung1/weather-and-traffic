

interface WeatherApiResponse {
	date: string;
	time: string;
	result: {
		[key: string]: Weather
	}
}

interface Weather {
	forecast: string;
	trafficCamImage: string | null;
}

const mockData: WeatherApiResponse = {
	date: "",
	time: "",
	result: {
		"ang_mo_kio": {
			forecast: "Light Showers",
			trafficCamImage: "https://images.data.gov.sg/api/traffic-images/2024/05/0806f8bb-f1b4-4e9e-a672-797ab4c1a122.jpg"
		}
	}
}


export function getWeatherForecast(
	date: string,
	time: string,
	location: string
): Weather {
	return mockData.result[location] ? mockData.result[location] : {
		forecast: "Forecast not found",
		trafficCamImage: null
	};
}