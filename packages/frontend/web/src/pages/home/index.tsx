import { FC, useEffect, useState } from "react";
import type { Dayjs } from "dayjs";
import { GenericDatePicker } from "../../components/DatePicker";
import { GenericTimePicker } from "../../components/TimePicker";
import { getLocationService } from "@weather-and-traffic/services/dist";
import { NewLocationList } from "../../components/List";
import { getWeatherForecast } from "@weather-and-traffic/services/dist";
import { Image } from "antd";

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

	const locations = getLocationService("", "");

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
				<NewLocationList
					data={locations}
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
					trafficCam ? <Image src={trafficCam}/> : ""
				}
			</div>

		</>
	);
};
