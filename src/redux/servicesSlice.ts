import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type ServicesItemType = {
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
	durations: {
		duration_name: string;
		price: number;
		discount_price: number;
		duration_in_minutes: number;
		sub_description: string;
	}[];
	devices: {
		name: string;
		description: string;
		status: number;
	}[];
	created_at: string;
	updated_at: string;
};

type ServicesState = {
	servicesList: ServicesItemType[];
	loading: boolean;
	error: string | null;
};

const initialState: ServicesState = {
	servicesList: [],
	loading: false,
	error: null,
};

// ✅ Call API bằng createAsyncThunk
export const fetchServices = createAsyncThunk(
	"services/fetchServices",
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get("http://localhost:4000/services");
			return response.data.result.data; // API trả về danh sách services
		} catch (error: any) {
			return rejectWithValue(error.response?.data || "Lỗi không xác định");
		}
	},
);

const servicesSlice = createSlice({
	name: "services",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchServices.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(
				fetchServices.fulfilled,
				(state, action: PayloadAction<ServicesItemType[]>) => {
					state.loading = false;
					state.servicesList = action.payload; // ✅ Cập nhật state bằng dữ liệu API
				},
			)
			.addCase(fetchServices.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export const {} = servicesSlice.actions; // bóc tách hàm xử lý action

export default servicesSlice.reducer; // xuất sang file store.ts
