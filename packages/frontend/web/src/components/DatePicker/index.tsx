import { DatePicker } from "antd";
import type { Dayjs } from "dayjs";

interface IProps {
	onSelectDate: (value: Dayjs) => void;
	selectedDate?: Dayjs;
}


export const GenericDatePicker = ({ selectedDate, onSelectDate }: IProps) => {

	return (
		<DatePicker
			value={selectedDate}
			onChange={onSelectDate}
		/>
	);
};