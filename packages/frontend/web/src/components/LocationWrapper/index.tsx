import { FC, PropsWithChildren } from "react";
import { HourMinute, YearMonthDate } from "@weather-and-traffic-shared/types";
import { useAsync } from "react-use";
import { getLocations } from "@weather-and-traffic/services";
import { NewLocationList } from "../List";

interface IProps {
	date: YearMonthDate | null;
	time: HourMinute | null;
	selectedLocation: string | null;
	onSelectLocation: (value: string) => void;
}

export const LocationWrapper: FC<IProps> = (
	{
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
		<NewLocationList
			data={locations}
			selectedLocation={selectedLocation}
			onSelectLocation={onSelectLocation}
		/>
	) : (
		<></>
	);

};