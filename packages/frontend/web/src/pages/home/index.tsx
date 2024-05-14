import { FC, useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { GenericDatePicker } from "../../components/DatePicker";
import { GenericTimePicker } from "../../components/TimePicker";
import { Image } from "antd";
import { LocationWrapper } from "../../components/LocationWrapper";
import { HourMinute, ImageData, LocationListData, YearMonthDate } from "@weather-and-traffic-shared/types";

export const Home: FC = () => {
	const [selectedDate, setSelectedDate] = useState<YearMonthDate | null>(null);
	const [selectedTime, setSelectedTime] = useState<HourMinute | null>(null);
	const [selectedLocation, setSelectedLocation] = useState<LocationListData | null>(null);
	const [weather, setWeather] = useState<string | null>(null);
	const [trafficCam, setTrafficCam] = useState<ImageData | null>(null);

	const handleSelectLocation = (location: LocationListData) => {
		setSelectedLocation(location);
	};

	const handleDateChange = (date: Dayjs) => {
		const formattedDate = date ? dayjs(date).format("YYYY-MM-DD") : null;
		setSelectedDate(formattedDate as YearMonthDate);
	};

	const handleTimeChange = (time: Dayjs) => {
		const formattedTime = time ? dayjs(time).format("HH:mm") : null;
		setSelectedTime(formattedTime as HourMinute);
	};

	useEffect(() => {
		if (selectedLocation) {
			setWeather(selectedLocation.forecast);
			setTrafficCam(selectedLocation.image);
		}
	}, [handleSelectLocation]);

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
				<LocationWrapper
					date={selectedDate}
					time={selectedTime}
					selectedLocation={selectedLocation}
					onSelectLocation={handleSelectLocation}
				/>
			</div>

			<div>
				<h2>Weather Forecast:</h2>
				{weather}
			</div>

			<div>
				<h2>Traffic Cam:</h2>
				{
					trafficCam ? <Image src={trafficCam.url} /> : ""
				}
			</div>

		</>
	);
};
