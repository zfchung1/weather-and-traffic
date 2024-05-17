import React, { ComponentProps } from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { LocationListData } from "@weather-and-traffic-shared/types";
import { LocationList } from "./index";
import { List } from "antd";

jest.mock("antd", () => (
	{
		__esModule: true,
		List: ({ dataSource }: ComponentProps<typeof List>) => {
			return (
				<div data-testid="mockItem">
					{dataSource?.map((data, id) => {
						return <div key={id}>{(data as LocationListData).locationName}</div>;
					})}
				</div>
			);
		}
	}));

describe("LocationList", () => {
	const mockData: LocationListData[] = [
		{
			cameraId: "1",
			locationName: "Location 1",
			coordinate: {
				longitude: 1111,
				latitude: 2222
			},
			forecast: "fake forecast",
			image: {
				url: "fake url",
				height: 111,
				width: 222
			}
		},
		{
			cameraId: "2", locationName: "Location 2", coordinate: {
				longitude: 1111,
				latitude: 2222
			},
			forecast: "fake forecast",
			image: {
				url: "fake url",
				height: 111,
				width: 222
			}
		}
	];

	it("renders the list with correct data", () => {
		render(
			<LocationList
				data={mockData}
				selectedLocation={null}
				onSelectLocation={jest.fn()}
			/>
		);

		expect(screen.getByTestId("mockItem")).toBeInTheDocument();

	});


	// test highlights the selected location

	// test calls onSelectLocation with correct data when a location is clicked
});
