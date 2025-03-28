import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type SlotServiceItemType = {
	_id: string;
	staff_profile_id: string;
	date: string;
	start_time: string;
	end_time: string;
	status: string;
	available_minutes: number;
	used_minutes: number;
};

type SlotServiceState = {
	slotServiceList: SlotServiceItemType[];
	loading: boolean;
	error: string | null;
};

const initialState: SlotServiceState = {
	slotServiceList: [],
	loading: false,
	error: null,
};

// Call API bằng createAsyncThunk
export const fetchSlotService = createAsyncThunk(
	"slotService/fetchSlotService",
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get("http://localhost:4000/staff-slots/");
			console.log("slotServicenew: ", response.data.result.data);
			return response.data.result.data; // API trả về danh sách services
		} catch (error: any) {
			console.error("API Error:", error.response?.data);
			return rejectWithValue(error.response?.data || "Lỗi không xác định");
		}
	},
);

const slotServiceSlice = createSlice({
	name: "slotService",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchSlotService.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(
				fetchSlotService.fulfilled,
				(state, action: PayloadAction<SlotServiceItemType[]>) => {
					state.loading = false;
					// state.slotServiceList = action.payload; // Cập nhật state bằng dữ liệu API
					state.slotServiceList = action.payload;
				},
			)
			.addCase(fetchSlotService.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export const {} = slotServiceSlice.actions; // bóc tách hàm xử lý action

export default slotServiceSlice.reducer; // xuất sang file store.ts
