import { Card, List } from "antd";
import { LocationData } from "@weather-and-traffic/services/dist/LocationService";

interface IProps {
	data: LocationData[];
	selectedLocation: string | null;
	onSelectLocation: (value: string) => void;
}

export const NewLocationList = ({ data, selectedLocation, onSelectLocation }: IProps) => {
	return (
		<List
			itemLayout="horizontal"
			dataSource={data}
			renderItem={(item, index) => (
				<List.Item>
					<Card
						onClick={() => onSelectLocation(item.key)}
						hoverable
						style={{ cursor: "pointer", border: item.key === selectedLocation ? "2px solid blue" : "none" }}
					>
						{item.name}
					</Card>
				</List.Item>
			)}
		/>
	);
};