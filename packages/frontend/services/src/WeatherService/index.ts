

interface WeatherApiResponse {
	date: string;
	time: string;
	result: {
		[key: string]: {
			forecast: string;
			trafficCamImage: string;
		}
	}
}

const mockData: WeatherApiResponse = {
	date: "",
	time: "",
	result: {
		"ang_mo_kio": {
			forecast: "Light Showers",
			trafficCamImage: "https://xxx.jpg"
		}
	}
}


export function getWeatherForecast(
	date: string,
	time: string,
	location: string
){
	return mockData.result[location] ? mockData.result[location].forecast: "Forecast Not Found";
}