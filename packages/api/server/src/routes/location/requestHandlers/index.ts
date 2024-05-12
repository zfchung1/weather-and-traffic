import type { Request, Response } from "express";
import { constants } from "http2";

const { HTTP_STATUS_OK } = constants;

export function getLocationsRequestHandler(req: Request, res: Response) {
	res.status(HTTP_STATUS_OK).json({
		date: "",
		time: "",
		locations: {
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
		}
	});
}