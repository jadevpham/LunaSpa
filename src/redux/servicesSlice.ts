import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type ServicesItemType = {
	id: string;
	name: string;
	address: string;
	img: string;
	category: string;
	star: number;
	vote: number;
	price: number;
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
			const response = await axios.get(
				"https://678511531ec630ca33a70f2e.mockapi.io/fgh/categoriesServices",
			);
			return response.data; // ✅ API trả về danh sách categories
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
