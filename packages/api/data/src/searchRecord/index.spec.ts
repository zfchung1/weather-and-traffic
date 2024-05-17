import { getDBClient } from "../db/client";
import { getSearchRecord } from "./index";

// mock the getDBClient function
jest.mock("../db/client");

describe("getSearchRecord", () => {
	it("should return the latest records with the correct format", async () => {
		const mockRecords = [
			{
				search_date: new Date("2023-05-17T00:00:00Z"),
				location: "Location1",
				camera_id: "Camera1",
				created_at: new Date("2023-05-17T01:00:00Z"),
				updated_at: new Date("2023-05-17T01:00:00Z"),
				id: "1"
			},
			{
				search_date: new Date("2023-05-16T00:00:00Z"),
				location: "Location2",
				camera_id: "Camera2",
				created_at: new Date("2023-05-16T01:00:00Z"),
				updated_at: new Date("2023-05-16T01:00:00Z"),
				id: "2"
			}
		];

		const mockSelect = jest.fn().mockReturnValue({
			orderBy: jest.fn().mockReturnValue({
				limit: jest.fn().mockResolvedValue(mockRecords)
			})
		});

		(getDBClient as jest.Mock).mockReturnValue({
			select: mockSelect
		});

		const result = await getSearchRecord(2);

		expect(result).toEqual([
			{
				searchDate: new Date("2023-05-17T00:00:00Z"),
				location: "Location1",
				cameraId: "Camera1"
			},
			{
				searchDate: new Date("2023-05-16T00:00:00Z"),
				location: "Location2",
				cameraId: "Camera2"
			}
		]);

		expect(getDBClient).toHaveBeenCalledWith("search_record");
		expect(mockSelect).toHaveBeenCalled();
	});

	it("should throw an error if the query fails", async () => {
		(getDBClient as jest.Mock).mockReturnValue({
			select: jest.fn().mockReturnValue({
				orderBy: jest.fn().mockReturnValue({
					limit: jest.fn().mockRejectedValue(new Error("Query failed"))
				})
			})
		});

		await expect(getSearchRecord(2)).rejects.toThrow("Query failed");
	});
});
