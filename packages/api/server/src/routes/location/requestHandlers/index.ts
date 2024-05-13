import type { Request, Response } from "express";
import { constants } from "http2";
import { getLocations } from "@weather-and-traffic-api/business";

const { HTTP_STATUS_OK } = constants;

export function getLocationsRequestHandler(req: Request, res: Response) {
	const { date, time } = req.query;
	const locations = getLocations(date as string, time as string);
	res.status(HTTP_STATUS_OK).json(locations);
}