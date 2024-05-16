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
		? { padding: 10, margin: 5 }
		: { flex: 2, padding: 10, margin: 5 };
	const weatherStyle = isMobile
		? { padding: 10, margin: 5, background: "aliceblue" }
		: { flex: 1, padding: 10, margin: 5, background: "aliceblue" };

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
						{weather ? weather : <br />}
					</div>
				</div>
			}
		</>
	);
};