import { GeoCoordinates } from "@weather-and-traffic-shared/types";

export interface ITrafficImages {
	items: {
		timestamp: string;
		cameras: {
			timestamp: string;
			image: string;
			location: GeoCoordinates;
			camera_id: string;
			image_metadata: ImageMetadata
		}[]
	}[];
	api_info: {
		status: string;
	};
}

interface ImageMetadata {
	height: number;
	width: number;
	md5: string;
}