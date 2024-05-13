import { GeoLocation, IWeatherForecast } from "./types";


const mockWeatherForecastData: IWeatherForecast = {
	"area_metadata": [
		{
			"name": "Ang Mo Kio",
			"label_location": {
				"latitude": 1.375,
				"longitude": 103.839
			}
		},
		{
			"name": "Bedok",
			"label_location": {
				"latitude": 1.321,
				"longitude": 103.924
			}
		},
		{
			"name": "Bishan",
			"label_location": {
				"latitude": 1.350772,
				"longitude": 103.839
			}
		},
		{
			"name": "Boon Lay",
			"label_location": {
				"latitude": 1.304,
				"longitude": 103.701
			}
		},
		{
			"name": "Bukit Batok",
			"label_location": {
				"latitude": 1.353,
				"longitude": 103.754
			}
		},
		{
			"name": "Bukit Merah",
			"label_location": {
				"latitude": 1.277,
				"longitude": 103.819
			}
		}
	],
	"items": [
		{
			"update_timestamp": "2024-05-11T20:35:51+08:00",
			"timestamp": "2024-05-11T20:30:00+08:00",
			"valid_period": {
				"start": "2024-05-11T20:30:00+08:00",
				"end": "2024-05-11T22:30:00+08:00"
			},
			"forecasts": [
				{
					"area": "Ang Mo Kio",
					"forecast": "Light Showers"
				},
				{
					"area": "Bedok",
					"forecast": "Cloudy"
				},
				{
					"area": "Bishan",
					"forecast": "Light Showers"
				},
				{
					"area": "Boon Lay",
					"forecast": "Cloudy"
				},
				{
					"area": "Bukit Batok",
					"forecast": "Cloudy"
				},
				{
					"area": "Bukit Merah",
					"forecast": "Cloudy"
				}
			]
		}
	],
	"api_info": {
		"status": "healthy"
	}
};

export function getGeoLocationData(): GeoLocation[] {
	return mockWeatherForecastData.area_metadata.map((area) => {
		return {
			areaName: area.name,
			longitude: area.label_location.longitude,
			latitude: area.label_location.latitude
		}
	});
}

export function getWeatherForecast(){
	return mockWeatherForecastData.items[0].forecasts;
}