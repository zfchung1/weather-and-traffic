import { FC, PropsWithChildren } from "react";
import { HourMinute, LocationListData, YearMonthDate } from "@weather-and-traffic-shared/types";
import { useAsync } from "react-use";
import { getLocations } from "@weather-and-traffic/services";
import { NewLocationList } from "../List";

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
			{
				isMobile
					? ""
					: <div style={{ height: "300px" }}>
						<NewLocationList
							data={locations}
							selectedLocation={selectedLocation}
							onSelectLocation={onSelectLocation}
						/>
					</div>
			}
		</>

	) : (
		<></>
	);

};