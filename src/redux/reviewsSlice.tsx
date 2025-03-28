import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type ReviewItemType = {
	_id: string;
	name: string;
	rating: number;
	comment: string;
	created_at: string;
	updated_at: string;
};

type ReviewsState = {
	reviewsList: ReviewItemType[];
	loading: boolean;
	error: string | null;
};

const initialState: ReviewsState = {
	reviewsList: [],
	loading: false,
	error: null,
};

// Call API bằng createAsyncThunk
export const fetchReviews = createAsyncThunk(
	"reviews/fetchReviews",
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get("http://localhost:4000/reviews/");
			console.log(response.data.result.data);
			return response.data.result.data; // API trả về danh sách services
		} catch (error: any) {
			return rejectWithValue(error.response?.data || "Lỗi không xác định");
		}
	},
);

const reviewsSlice = createSlice({
	name: "reviews",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchReviews.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(
				fetchReviews.fulfilled,
				(state, action: PayloadAction<ReviewItemType[]>) => {
					state.loading = false;
					state.reviewsList = action.payload; // ✅ Cập nhật state bằng dữ liệu API
				},
			)
			.addCase(fetchReviews.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export const {} = reviewsSlice.actions; // bóc tách hàm xử lý action

export default reviewsSlice.reducer; // xuất sang file store.ts
