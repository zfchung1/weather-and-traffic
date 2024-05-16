import { FC } from "react";
import { HourMinute, LocationListData, YearMonthDate } from "@weather-and-traffic-shared/types";
import { LocationWrapper } from "../LocationWrapper";

interface IProps {
	isMobile: boolean;
	selectedDate: YearMonthDate | null;
	selectedTime: HourMinute | null;
	selectedLocation: LocationListData | null;
	onSelectLocation: (location: LocationListData) => void;
	weather: string | null;
}

export const LocationWeatherWrapper: FC<IProps> = (
	{
		isMobile,
		selectedDate,
		selectedTime,
		selectedLocation,
		onSelectLocation,
		weather
	}
) => {

	const containerStyle = isMobile
		? { display: "block" }
		: { display: "flex" };
	const locationStyle = isMobile
		? {}
		: { flex: 2 };
	const weatherStyle = isMobile
		? {}
		: { flex: 1 };

	return (
		<>
			{
				<div style={containerStyle}>
					<div style={locationStyle}>
						<h2>Select a Location:</h2>
						<LocationWrapper
							isMobile={isMobile}
							date={selectedDate}
							time={selectedTime}
							selectedLocation={selectedLocation}
							onSelectLocation={onSelectLocation}
						/>
					</div>

					<div style={weatherStyle}>
						<h2>Weather Forecast:</h2>
						{weather}
					</div>
				</div>
			}
		</>
	);
};