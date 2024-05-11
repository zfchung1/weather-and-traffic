import { TimePicker } from "antd";
import type { Dayjs } from "dayjs";

const format = "HH:mm";

interface IProps {
	onSelectTime: (time: Dayjs) => void;
	selectedTime?: Dayjs;
}

export const GenericTimePicker = ({ onSelectTime, selectedTime }: IProps) => {


	return <TimePicker value={selectedTime} onChange={onSelectTime} format={format} />;
};
