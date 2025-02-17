import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type BookingState = {
	selectedBranch: {
		id: string;
		name: string;
		address: string;
		img: string;
		category: string;
		star: number;
		vote: number;
	} | null;
	selectedService: {
		Service_ID: string;
		Service_Name: string;
		Service_Description: string;
		Service_Image: string;
		Service_Price: number;
		Service_Duration: number;
		Service_TypeID: string;
		Service_IncludeProduct_ID: string;
	} | null;
	selectedTime: {
		ServiceBooking_Date: string;
		ServiceBooking_Time: string;
	} | null;
	selectedPaymentMethod: {
		id: string;
		name: string;
	} | null;
};

const initialState: BookingState = {
	selectedBranch: null,
	selectedService: null,
	selectedTime: null,
	selectedPaymentMethod: { id: "VNPay", name: "VNPay" },
};

const bookingSlice = createSlice({
	name: "booking",
	initialState,
	reducers: {
		setBranch: (
			state,
			action: PayloadAction<{
				id: string;
				name: string;
				address: string;
				img: string;
				category: string;
				star: number;
				vote: number;
			}>,
		) => {
			state.selectedBranch = action.payload;
		},
		setService: (
			state,
			action: PayloadAction<{
				Service_ID: string;
				Service_Name: string;
				Service_Description: string;
				Service_Image: string;
				Service_Price: number;
				Service_Duration: number;
				Service_TypeID: string;
				Service_IncludeProduct_ID: string;
			}>,
		) => {
			state.selectedService = action.payload;
		},
		setTime: (
			state,
			action: PayloadAction<{
				ServiceBooking_Date: string;
				ServiceBooking_Time: string;
			}>,
		) => {
			state.selectedTime = action.payload;
		},
		setPaymentMethod: (
			state,
			action: PayloadAction<{
				id: string;
				name: string;
			}>,
		) => {
			state.selectedPaymentMethod = action.payload;
		},
	},
});

export const { setService, setTime, setBranch, setPaymentMethod } =
	bookingSlice.actions;
export default bookingSlice.reducer;
