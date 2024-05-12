import { ITrafficImages } from "./types";
import { partialIsoString } from "@weather-and-traffic-shared/types";


const mockTrafficData: ITrafficImages = {
	"items": [
		{
			"timestamp": "2024-05-11T20:41:34+08:00",
			"cameras": [
				{
					"timestamp": "2024-05-11T20:39:54+08:00",
					"image": "https://images.data.gov.sg/api/traffic-images/2024/05/0806f8bb-f1b4-4e9e-a672-797ab4c1a122.jpg",
					"location": {
						"latitude": 1.29531332,
						"longitude": 103.871146
					},
					"camera_id": "1001",
					"image_metadata": {
						"height": 240,
						"width": 320,
						"md5": "180b6ae4ffc369c543029ecd36be2aff"
					}
				},
				{
					"timestamp": "2024-05-11T20:39:54+08:00",
					"image": "https://images.data.gov.sg/api/traffic-images/2024/05/2b477126-c4ee-4776-9f62-beb30817ee7c.jpg",
					"location": {
						"latitude": 1.319541067,
						"longitude": 103.8785627
					},
					"camera_id": "1002",
					"image_metadata": {
						"height": 240,
						"width": 320,
						"md5": "e8a81cffd5951ffa9a7b725411d64b7e"
					}
				},
				{
					"timestamp": "2024-05-11T20:39:54+08:00",
					"image": "https://images.data.gov.sg/api/traffic-images/2024/05/00a0beb0-ddee-458d-8d15-55df7db6a8d6.jpg",
					"location": {
						"latitude": 1.323957439,
						"longitude": 103.8728576
					},
					"camera_id": "1003",
					"image_metadata": {
						"height": 240,
						"width": 320,
						"md5": "1e54d3027bcaaa80e684efeb795dc780"
					}
				},
				{
					"timestamp": "2024-05-11T20:39:54+08:00",
					"image": "https://images.data.gov.sg/api/traffic-images/2024/05/2807626e-2f69-440a-98f6-b1e4445e30a4.jpg",
					"location": {
						"latitude": 1.319535712,
						"longitude": 103.8750668
					},
					"camera_id": "1004",
					"image_metadata": {
						"height": 240,
						"width": 320,
						"md5": "d49a5cacb6ffa56414de2ed20f28f1f2"
					}
				},
				{
					"timestamp": "2024-05-11T20:39:54+08:00",
					"image": "https://images.data.gov.sg/api/traffic-images/2024/05/cf5963ae-550d-4d51-9866-4309889051ae.jpg",
					"location": {
						"latitude": 1.363519886,
						"longitude": 103.905394
					},
					"camera_id": "1005",
					"image_metadata": {
						"height": 240,
						"width": 320,
						"md5": "6f27cde26c26f04f02fb5f2315a2846e"
					}
				},
				{
					"timestamp": "2024-05-11T20:39:54+08:00",
					"image": "https://images.data.gov.sg/api/traffic-images/2024/05/20721b94-6ae1-45f8-9ea8-65fe73825b11.jpg",
					"location": {
						"latitude": 1.41270056,
						"longitude": 103.80642712
					},
					"camera_id": "9706",
					"image_metadata": {
						"height": 1080,
						"width": 1920,
						"md5": "c17ecc2a71be43957fe6e930dd3b067b"
					}
				}
			]
		}
	],
	"api_info": {
		"status": "healthy"
	}
};

export function getTrafficImageData(dateTime: partialIsoString) {
	return mockTrafficData.items[0].cameras.map((camera) => {
		return {
			image: camera.image,
			location: camera.location,
			imageMetadata: {
				height: camera.image_metadata.height,
				width: camera.image_metadata.width
			}
		}
	})
}