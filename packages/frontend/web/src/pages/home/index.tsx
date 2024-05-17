import { FC, useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { GenericDatePicker } from "../../components/DatePicker";
import { GenericTimePicker } from "../../components/TimePicker";
import { HourMinute, ImageData, LocationListData, YearMonthDate } from "@weather-and-traffic-shared/types";
import { useAsync, useLocalStorage } from "react-use";
import { getRecentSearch } from "@weather-and-traffic/services";
import { LocationWeatherWrapper } from "../../components/LocationWeatherWrapper";

export const Home: FC = () => {
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
	const [selectedDate, setSelectedDate] = useState<YearMonthDate | null>(null);
	const [selectedTime, setSelectedTime] = useState<HourMinute | null>(null);
	const [selectedLocation, setSelectedLocation] = useState<LocationListData | null>(null);
	const [weather, setWeather] = useState<string | null>(null);
	const [trafficCam, setTrafficCam] = useState<ImageData | null>(null);
	const [value, setValue, remove] = useLocalStorage("mostRecentSearch", {
		selectedDate,
		selectedTime,
		selectedLocation
	});

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 768);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

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
			setValue({
				selectedDate,
				selectedTime,
				selectedLocation
			});
		}
	}, [selectedLocation]);

	const { value: recentSearch } = useAsync(async () => {
		const latestFiveRecords = 5;
		try {
			return await getRecentSearch(latestFiveRecords);
		} catch (e) {
			console.error(e);
			return [];
		}
	}, [selectedDate, selectedTime]);

	return (
		<div style={{
			display: "block",
			padding: 20
		}}>

			<div style={{
				display: "flex"
			}}>
				<div style={{
					flex: 1,
					padding: 10,
					margin: 5
				}}>
					<h2>Select a Date:</h2>
					<GenericDatePicker onSelectDate={handleDateChange} />
				</div>

				<div style={{
					flex: 1,
					padding: 10,
					margin: 5
				}}>
					<h2>Select a Time:</h2>
					<GenericTimePicker onSelectTime={handleTimeChange} />
				</div>
				<div style={isMobile ? { display: "none" } : { flex: 1 }} />
			</div>

			<div style={{ display: "flex" }}>
				<div style={{ flex: 1, padding: 10, margin: 5 }}>
					<h3>Most recent search by user:</h3>
					{value ? value.selectedLocation?.locationName : ""}
				</div>

				<div style={{ flex: 1, padding: 10, margin: 5 }}>
					<h3>Most recent search by other people:</h3>
					{recentSearch ? recentSearch.map(item => {
						return <p>{item.location}</p>;
					}) : "No Recent Search by other people"}
				</div>

				<div style={isMobile ? { display: "none" } : { flex: 1 }} />

			</div>

			<LocationWeatherWrapper
				isMobile={isMobile}
				selectedDate={selectedDate}
				selectedTime={selectedTime}
				selectedLocation={selectedLocation}
				onSelectLocation={handleSelectLocation}
				weather={weather}
			/>

			<div style={{ display: "flex" }}>
				<div style={{ flex: 2, padding: 10 }}>
					<h2>Traffic Cam:</h2>
					{
						trafficCam ?
							<img
								src={trafficCam.url}
								style={{ width: "100%" }}
								alt={`Traffic Camera Image ${selectedLocation?.cameraId} at ${selectedLocation?.locationName}`}
							/>
							: ""
					}
				</div>
				<div style={isMobile ? { display: "none" } : { flex: 1 }} />
			</div>


		</div>
	);
};
