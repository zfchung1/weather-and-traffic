import { List } from "antd";
import { LocationListData } from "@weather-and-traffic-shared/types";

interface IProps {
	data: LocationListData[];
	selectedLocation: LocationListData | null;
	onSelectLocation: (value: LocationListData) => void;
}

export const NewLocationList = ({ data, selectedLocation, onSelectLocation }: IProps) => {
	return (
		<List
			itemLayout="horizontal"
			dataSource={data}
			style={{
				height: "100%",
				overflowY: "scroll"
			}}
			renderItem={(item, index) => (
				<List.Item
					onClick={() => onSelectLocation(item)}
					style={{
						cursor: "pointer",
						border: item.cameraId === selectedLocation?.cameraId ? "2px solid blue" : "none"
					}}
				>
					{item.locationName}
				</List.Item>
			)}
		/>
	);
};