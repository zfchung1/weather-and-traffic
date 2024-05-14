import type { IntRange } from "type-fest";

type needPadding = IntRange<0, 10>;
type paddedRange<T extends number> = T extends needPadding ? `0${T}` : `${T}`;


type daysRange = IntRange<1, 32>;
type monthsRange = IntRange<1, 13>;
type yearsRange = IntRange<0, 100>;
type yearsFullRange =
	| `19${paddedRange<yearsRange>}`
	| `20${paddedRange<yearsRange>}`;

export type YearMonthDate = `${yearsFullRange}-${paddedRange<monthsRange>}-${paddedRange<daysRange>}`;

type hoursRange = paddedRange<IntRange<0, 24>>;
type minutesRange = paddedRange<IntRange<0, 60>>;
type secondsRange = paddedRange<IntRange<0, 60>>;
export type HourMinute = `${hoursRange}:${minutesRange}`;
export type HourMinuteSecond = `${HourMinute}:${secondsRange}`;

// `${YearMonthDate}T${HourMinuteSecond}` throws error TS2590
export type partialIsoString = `${string}T${HourMinuteSecond}`;

export interface LocationList {
	date: YearMonthDate;
	time: HourMinute;
	data: LocationListData[]
}

export interface GeoCoordinates {
	latitude: number;
	longitude: number;
}

export interface LocationListData {
	cameraId: string;
	locationName: string;
	coordinate: GeoCoordinates;
	forecast: string;
}

export interface WeatherList {
	date: YearMonthDate;
	time: HourMinute;
	data: WeatherListData;
}

export interface WeatherListData {
	locationName: string;
	coordinates: GeoCoordinates;
	forecast: string;
	image: {
		url: string;
		height: number;
		width: number;
	}
}