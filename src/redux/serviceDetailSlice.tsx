import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type ServiceDetailType = {
	id: string;
	name: string;
	description: string;
	images: string;
	service_category: {
		name: string;
	};
	view_count: number;
	booking_count: number;
	price: number;
	durations: {
		duration_name: string;
		price: number;
		discount_price: number;
		duration_in_minutes: number; // == durationID
	}[];
	devices: {
		name: string;
		description: string;
		status: number;
	}[];
};
type ServicesState = {
	service: ServiceDetailType | null;
	loading: boolean;
	error: string | null;
};
const initialState: ServicesState = {
	service: null,
	loading: false,
	error: null,
};

export const fetchServiceDetail = createAsyncThunk(
	"serviceDetail/fetchServiceDetail",
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				"http://localhost:4000/services/67d3c8f8e299109b8d7f93a4",
			);
			return response.data.result; // API trả về danh sách services
		} catch (error: any) {
			return rejectWithValue(error.response?.data || "Lỗi không xác định");
		}
	},
);

const serviceDetailSlice = createSlice({
	name: "serviceDetail",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchServiceDetail.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(
				fetchServiceDetail.fulfilled,
				(state, action: PayloadAction<ServiceDetailType>) => {
					state.loading = false;
					state.service = action.payload; // Cập nhật state bằng dữ liệu API
				},
			)
			.addCase(fetchServiceDetail.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export const {} = serviceDetailSlice.actions; // bóc tách hàm xử lý action

export default serviceDetailSlice.reducer; // xuất sang file store.ts
