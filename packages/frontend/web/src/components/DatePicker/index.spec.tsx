import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react";
import type { Dayjs } from "dayjs";
import { GenericDatePicker } from "./index";

jest.mock("antd", () => ({
	__esModule: true,
	DatePicker: ({ value, onChange }: { value?: Dayjs, onChange: (value: Dayjs) => void }) => (
		<input
			data-testid="date-picker"
			type="text"
			value={value ? value.toString() : ""}
			onChange={e => onChange(e.target.value as unknown as Dayjs)}
		/>
	)
}));

describe("GenericDatePicker", () => {
	it("renders with selectedDate and triggers onSelectDate on change", () => {
		const onSelectDateMock = jest.fn();
		const selectedDateMock: Dayjs = "2023-05-17" as unknown as Dayjs; // Mocked date value

		const { getByTestId } = render(
			<GenericDatePicker selectedDate={selectedDateMock} onSelectDate={onSelectDateMock} />
		);

		const datePicker = getByTestId("date-picker") as HTMLInputElement;
		expect(datePicker.value).toBe("2023-05-17");

		fireEvent.change(datePicker, { target: { value: "2023-06-18" } });

		expect(onSelectDateMock).toHaveBeenCalledTimes(1);
		expect(onSelectDateMock).toHaveBeenCalledWith("2023-06-18");
	});

	it("triggers onSelectDate with no initial selectedDate", () => {
		const onSelectDateMock = jest.fn();

		const { getByTestId } = render(
			<GenericDatePicker onSelectDate={onSelectDateMock} />
		);

		const datePicker = getByTestId("date-picker") as HTMLInputElement;
		expect(datePicker.value).toBe("");

		// Simulate date change
		fireEvent.change(datePicker, { target: { value: "2023-07-19" } });

		expect(onSelectDateMock).toHaveBeenCalledTimes(1);
		expect(onSelectDateMock).toHaveBeenCalledWith("2023-07-19");
	});
});
