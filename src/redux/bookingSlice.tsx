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
	selectedService: Array<{
		Service_ID: string;
		Service_Name: string;
		Service_Description: string;
		Service_Image: string;
		Service_Price: number;
		Service_Duration: number;
		Service_TypeID: string;
		Service_IncludeProduct_ID: string;
	}> | null;
	selectedProducts: Array<{
		id: string;
		name: string;
		price: number;
		img: string;
		category: string;
		star: number;
		vote: number;
	}> | null;
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
	selectedService: [],
	selectedProducts: [],
	selectedTime: null,
	selectedPaymentMethod: null,
};

const bookingSlice = createSlice({
	name: "booking",
	initialState,
	reducers: {
		setBranch: (
			state,
			action: PayloadAction<BookingState["selectedBranch"]>,
		) => {
			state.selectedBranch = action.payload;
		},
		addService: (
			state,
			action: PayloadAction<
				NonNullable<BookingState["selectedService"]>[number]
			>,
		) => {
			if (!state.selectedService) {
				state.selectedService = [];
			}
			state.selectedService.push(action.payload);
		},
		removeService: (state, action: PayloadAction<string>) => {
			if (state.selectedService) {
				state.selectedService = state.selectedService.filter(
					(service) => service.Service_ID !== action.payload,
				);
			}
		},
		updateSelectedService: (
			state,
			action: PayloadAction<BookingState["selectedService"]>,
		) => {
			if (action.payload) {
				state.selectedService = action.payload;
			}
		},
		setTime: (state, action: PayloadAction<BookingState["selectedTime"]>) => {
			state.selectedTime = action.payload;
		},
		setPaymentMethod: (
			state,
			action: PayloadAction<BookingState["selectedPaymentMethod"]>,
		) => {
			state.selectedPaymentMethod = action.payload;
		},
		addProduct: (
			state,
			action: PayloadAction<
				NonNullable<BookingState["selectedProducts"]>[number]
			>,
		) => {
			if (!state.selectedProducts) {
				state.selectedProducts = [];
			}
			state.selectedProducts.push(action.payload);
		},
		removeProduct: (state, action: PayloadAction<string>) => {
			if (state.selectedProducts) {
				state.selectedProducts = state.selectedProducts.filter(
					(product) => product.id !== action.payload,
				);
			}
		},
	},
});

export const {
	addService,
	removeService,
	setTime,
	setBranch,
	setPaymentMethod,
	updateSelectedService,
	addProduct,
	removeProduct,
} = bookingSlice.actions;
export default bookingSlice.reducer;
