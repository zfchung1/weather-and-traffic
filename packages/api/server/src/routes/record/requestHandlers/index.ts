import type { Request, Response } from "express";
import { constants } from "http2";
import { getMostRecentSearch } from "@weather-and-traffic-api/business";

const { HTTP_STATUS_OK } = constants;

export async function getRecentSearchRequestHandler(req: Request, res: Response) {
	const { limit } = req.query;
	const locations = await getMostRecentSearch(Number(limit));
	res.status(HTTP_STATUS_OK).json(locations);
}