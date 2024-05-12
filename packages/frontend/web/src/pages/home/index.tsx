import { FC, useState } from "react";
import type { Dayjs } from "dayjs";
import { GenericDatePicker } from "../../components/DatePicker";
import { GenericTimePicker } from "../../components/TimePicker";
import { getLocationService } from "@weather-and-traffic/services/dist";

export const Home: FC = () => {
	const [date, setDate] = useState<string>();
	const [selectedDate, setSelectedDate] = useState<string | null>(null);
	const [time, setTime] = useState<Dayjs | null>(null);

	const handleDateChange = (date: string) => {
		setSelectedDate(date);
	};

	const handleTimeChange = (time: Dayjs) => {
		setTime(time);
	};

	const locationList = getLocationService("", "");


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

			{locationList.map((item) => item.name)}

		</>
	);
};
