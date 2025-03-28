import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Duration {
	duration_name: string;
	price: number;
	discount_price: number;
	duration_in_minutes: number;
	sub_description: string;
	index: number;
}

type BookingState = {
	selectedBranch: {
		_id: string;
		name: string;
		address: string;
		img: string;
		category: string;
		star: number;
		vote: number;
	} | null;
	selectedService: Array<{
		_id: string;
		name: string;
		description: string;
		images: string[];
		service_category: {
			name: string;
			_id: string;
		};
		view_count: number;
		booking_count: number;
		status: number;
		durations: Duration[];
		selectedDuration: Duration;
		devices: {
			name: string;
			description: string;
			status: number;
		}[];
	}> | null;
	selectedProducts: Array<{
		_id: string;
		name: string;
		price: number;
		discount_price: number;
		quantity: number;
		images: string[];
		description: string;
		category_id: string;
		star: number;
		vote: number;
	}> | null;
	selectedTime: {
		ServiceBooking_Date: string;
		ServiceBooking_Time: string;
	} | null;
	selectedPaymentMethod: {
		_id: string;
		name: string;
		notes: string;
	} | null;
};

const initialState: BookingState = {
	selectedBranch: {
		_id: "67cd31c685b65937c44884b6",
		name: "Luna Spa Hải Phòng",
		address: "abcdxyz",
		img: "https://lunaspa.s3.ap-southeast-1.amazonaws.com/7e6b535b5afdff403c91d1b02.jpg",
		category: "",
		star: 0,
		vote: 0,
	},
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
					(service) => service._id !== action.payload,
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
					(product) => product._id !== action.payload,
				);
			}
		},
		setProducts: (
			state,
			action: PayloadAction<BookingState["selectedProducts"]>,
		) => {
			state.selectedProducts = action.payload;
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
	setProducts,
} = bookingSlice.actions;
export default bookingSlice.reducer;
