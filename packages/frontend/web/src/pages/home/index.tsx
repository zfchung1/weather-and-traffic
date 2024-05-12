import { FC, useState } from "react";
import type { Dayjs } from "dayjs";
import { GenericDatePicker } from "../../components/DatePicker";
import { GenericTimePicker } from "../../components/TimePicker";
import { getLocationService } from "@weather-and-traffic/services/dist";
import { NewLocationList } from "../../components/List";

export const Home: FC = () => {
	const [date, setDate] = useState<string>();
	const [selectedDate, setSelectedDate] = useState<string | null>(null);
	const [time, setTime] = useState<Dayjs | null>(null);
	const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

	const handleSelectLocation = (location: string) => {
		setSelectedLocation(location);
	};

	const handleDateChange = (date: string) => {
		setSelectedDate(date);
	};

	const handleTimeChange = (time: Dayjs) => {
		setTime(time);
	};

	const locations = getLocationService("", "");

	return (
		<>
			<div>
				<h2>Select a Date:</h2>
				<GenericDatePicker onSelectDate={handleDateChange} />
			</div>

			<div>
				<h2>Select a Time:</h2>
				<GenericTimePicker onSelectTime={handleTimeChange} />
			</div>

			<div>
				<h2>Select a Location:</h2>
				<NewLocationList
					data={locations}
					selectedLocation = {selectedLocation}
					onSelectLocation = {handleSelectLocation}
				/>
			</div>

			{locations.map((item) => item.name)}

		</>
	);
};
