import type { Request, Response } from "express";
import { constants } from "http2";

const { HTTP_STATUS_OK } = constants;

export function getWeatherRequestHandler(req: Request, res: Response) {
	res.status(HTTP_STATUS_OK).json({
		date: "2024-01-01",
		time: "22:00:00",
		data: {
			"1001": {
				name: "Ang Mo Kio",
				coordinate: {
					longitude: 11111,
					latitude: 22222
				},
				forecast: "Light Showers",
				image: {
					url: "https://xxx.jpg",
					height: 100,
					width: 80
				}
			}
		}
	});
}