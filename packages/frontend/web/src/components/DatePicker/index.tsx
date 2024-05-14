import { DatePicker } from "antd";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import { useCallback, useMemo } from "react";

interface IProps {
	onSelectDate: (value: Dayjs) => void;
	selectedDate?: Dayjs;
}

export function formatDate(date: Date): string {
	const [dd, mm, yyyy] = date.toLocaleDateString("en-GB").split("/");
	return (yyyy + "-" + mm + "-" + dd);
}

export const GenericDatePicker = ({ selectedDate, onSelectDate }: IProps) => {

	//
	// const handleOnChange = useCallback(
	// 	(dateDayjs: dayjs.Dayjs) => {
	// 		const convertDayjsToYearMonthDate = formatDate(dateDayjs.toDate());
	// 		onSelectDate(convertDayjsToYearMonthDate);
	// 	},
	// 	[onSelectDate]
	// );
	//
	// const dayjsValue = useMemo(
	// 	() => selectedDate ? dayjs(new Date(selectedDate)): undefined,
	// 	[selectedDate]
	// );

	return (
		<DatePicker
			value={selectedDate}
			onChange={onSelectDate}
		/>
	);
};