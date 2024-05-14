import { FC, useEffect, useState } from "react";
import type { Dayjs } from "dayjs";
import { GenericDatePicker } from "../../components/DatePicker";
import { GenericTimePicker } from "../../components/TimePicker";
import { getWeatherForecast } from "@weather-and-traffic/services";
import { Image } from "antd";
import { LocationWrapper } from "../../components/LocationWrapper";

export const Home: FC = () => {
	const [date, setDate] = useState<string>();
	const [selectedDate, setSelectedDate] = useState<string | null>(null);
	const [time, setTime] = useState<Dayjs | null>(null);
	const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
	const [weather, setWeather] = useState<string | null>(null);
	const [trafficCam, setTrafficCam] = useState<string | null>(null);

	const handleSelectLocation = (location: string) => {
		setSelectedLocation(location);
	};

	const handleDateChange = (date: string) => {
		setSelectedDate(date);
	};

	const handleTimeChange = (time: Dayjs) => {
		setTime(time);
	};

	const mockDate = "2020-01-01";
	const mockTime = "01:01";

	useEffect(() => {
		const result = selectedLocation ? getWeatherForecast("", "", selectedLocation) : {
			forecast: "Please select a location",
			trafficCamImage: null
		};
		setWeather(result.forecast);
		setTrafficCam(result.trafficCamImage);
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
					date={mockDate}
					time={mockTime}
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
					trafficCam ? <Image src={trafficCam} /> : ""
				}
			</div>

		</>
	);
};
