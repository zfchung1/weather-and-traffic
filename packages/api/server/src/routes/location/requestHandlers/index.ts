import type { Request, Response } from "express";
import { constants } from "http2";
import { getLocations } from "@weather-and-traffic-api/business";
import { HourMinute, YearMonthDate } from "@weather-and-traffic-shared/types";

const { HTTP_STATUS_OK } = constants;

export async function getLocationsRequestHandler(req: Request, res: Response) {
	const { date, time } = req.query;
	const locations = await getLocations(date as YearMonthDate, time as HourMinute);
	res.status(HTTP_STATUS_OK).json(locations);
}