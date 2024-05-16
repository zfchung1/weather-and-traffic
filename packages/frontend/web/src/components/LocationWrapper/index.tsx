import { FC } from "react";
import { HourMinute, LocationListData, YearMonthDate } from "@weather-and-traffic-shared/types";
import { useAsync } from "react-use";
import { getLocations } from "@weather-and-traffic/services";
import { LocationList } from "../LocationList";

interface IProps {
	isMobile: boolean;
	date: YearMonthDate | null;
	time: HourMinute | null;
	selectedLocation: LocationListData | null;
	onSelectLocation: (location: LocationListData) => void;
}

export const LocationWrapper: FC<IProps> = (
	{
		isMobile,
		date,
		time,
		selectedLocation,
		onSelectLocation
	}
) => {

	const { value: locations } = useAsync(async () => {
		try {
			return date && time ? await getLocations(date, time) : [];
		} catch (e) {
			console.error(e);
			throw e;
		}
	}, [date, time]);

	return locations ? (
		<>
			<div style={isMobile ? { height: "100px" } : { height: "300px" }}>
				<LocationList
					data={locations}
					selectedLocation={selectedLocation}
					onSelectLocation={onSelectLocation}
				/>
			</div>

		</>

	) : (
		<></>
	);

};