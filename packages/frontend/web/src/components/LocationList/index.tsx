import { List } from "antd";
import { LocationListData } from "@weather-and-traffic-shared/types";

interface IProps {
	data: LocationListData[];
	selectedLocation: LocationListData | null;
	onSelectLocation: (value: LocationListData) => void;
}

export const LocationList = ({ data, selectedLocation, onSelectLocation }: IProps) => {
	return (
		<List
			itemLayout="horizontal"
			dataSource={data}
			style={{
				height: "100%",
				overflowY: "scroll",
				padding: '0 16px',
				border: '1px solid rgba(140, 140, 140, 0.35)',
			}}
			renderItem={(item, index) => (
				<List.Item
					onClick={() => onSelectLocation(item)}
					style={{
						cursor: "pointer",
						border: item.cameraId === selectedLocation?.cameraId ? "2px solid blue" : "none",
						padding: "3px"
					}}
				>
					{`${item.locationName}: ${item.cameraId}`}
				</List.Item>
			)}
		/>
	);
};