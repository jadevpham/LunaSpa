import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type ServiceDetailType = {
	id: string;
	name: string;
	description: string;
	images: string[];
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
	branches: {
		id: string;
		name: string;
		description: string;
		rating: number;
		images: string;
		opening_hours: {
			day: string;
			open: string;
			close: string;
		}[];
		contact: {
			phone: string;
			email: string;
			address: string;
		};
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
	async (serviceId: string, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`http://localhost:4000/services/${serviceId}`,
			);
			console.log(response.data.result);
			return response.data.result; // API trả về danh sách services
		} catch (error: any) {
			console.error("API Error:", error.response?.data); // Log lỗi chi tiết
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
					state.service = {
						...action.payload,
						branches: action.payload.branches.map((branch) => ({
							...branch,
							id: (branch as any)._id, // Chuyển _id thành id
						})),
					};
				}, // Cập nhật state bằng dữ liệu API
			)
			.addCase(fetchServiceDetail.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export const {} = serviceDetailSlice.actions; // bóc tách hàm xử lý action

export default serviceDetailSlice.reducer; // xuất sang file store.ts
