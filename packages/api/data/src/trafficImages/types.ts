export interface ITrafficImages {
	items: {
		timestamp: string;
		cameras: {
			timestamp: string;
			image: string;
			location: GeoLocation;
			camera_id: string;
			image_metadata: ImageMetadata
		}[]
	}[];
	api_info: {
		status: string;
	};
}

export interface GeoLocation {
	latitude: number;
	longitude: number;
}

interface ImageMetadata {
	height: number;
	width: number;
	md5: string;
}