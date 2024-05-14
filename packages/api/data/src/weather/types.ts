import { GeoCoordinates } from "@weather-and-traffic-shared/types";

export interface IWeatherForecast {
	area_metadata: {
		name: string;
		label_location: GeoCoordinates
	}[];
	items: {
		update_timestamp: string;
		timestamp: string;
		valid_period: {
			start: string;
			end: string;
		},
		forecasts: {
			area: string;
			forecast: string;
		}[]
	}[];
	api_info: {
		status: string;
	};
}

export interface GeoLocation {
	areaName: string;
	longitude: number;
	latitude: number;
	forecast: string;
}