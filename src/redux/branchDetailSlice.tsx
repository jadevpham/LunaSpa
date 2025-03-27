import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type BranchDetailType = {
	_id: string;
	name: string;
	description: string;
	rating: number;
	images: string[];
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
	services: {
		_id: string;
		name: string;
		description: string;
		images: string[];
		status: number;
		booking_count: number;
		view_count: number;
		durations: {
			duration_name: string;
			price: number;
			discount_price: number;
			sub_description: string;
			duration_in_minutes: number; // == durationID
		}[];
		service_category: {
			_id: string;
			name: string;
			description: string;
		};
		devices: {
			_id: string;
			name: string;
			description: string;
			status: number;
		}[];
	}[];
	products: {
		_id: string;
		name: string;
		description: string;
		price: number;
		discount_price: number;
		images: string[];
		product_category: {
			_id: string;
			name: string;
			description: string;
		};
	}[];
};
type BranchesState = {
	branch: BranchDetailType | null;
	loading: boolean;
	error: string | null;
};
const initialState: BranchesState = {
	branch: null,
	loading: false,
	error: null,
};

export const fetchBranchDetail = createAsyncThunk(
	"branchDetail/fetchBranchDetail",
	async (branchId: string, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`http://localhost:4000/branches/${branchId}`,
			);
			console.log("branch: ", response.data.result);
			return response.data.result;
		} catch (error: any) {
			console.error("API Error:", error.response?.data);
			return rejectWithValue(error.response?.data || "Lỗi không xác định");
		}
	},
);

const branchDetailSlice = createSlice({
	name: "branchDetail",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchBranchDetail.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(
				fetchBranchDetail.fulfilled,
				(state, action: PayloadAction<BranchDetailType>) => {
					state.loading = false;
					state.branch = action.payload;
				}, // Cập nhật state bằng dữ liệu API
			)
			.addCase(fetchBranchDetail.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export const {} = branchDetailSlice.actions; // bóc tách hàm xử lý action

export default branchDetailSlice.reducer; // xuất sang file store.ts
