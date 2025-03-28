import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
//
type ProductsByServiceItemType = {
	_id: string;
	service_id: string;
	product_id: string;
	status: number;
	usage_instruction: string;
	product: {
		_id: string;
		name: string;
		description: string;
		price: number;
		discount_price: number;
		quantity: number;
		images: string;
		product_status: string;
		product_category: {
			_id: string;
			name: string;
			description: string;
		};
	};
};

type ProductsByServiceState = {
	productsByServiceList: ProductsByServiceItemType[];
	loading: boolean;
	error: string | null;
};

const initialState: ProductsByServiceState = {
	productsByServiceList: [],
	loading: false,
	error: null,
};

// Call API bằng createAsyncThunk
export const fetchProductsByService = createAsyncThunk(
	"productsByService/fetchProductsByService",
	async (service_id: string, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`http://localhost:4000/service-products/recommended/${service_id}`,
			);
			console.log("API response:", response); // Log toàn bộ response
			console.log("productsByService data:", response.data.result?.data); // In phần dữ liệu trả về
			return response.data.result?.data || [];
		} catch (error: any) {
			return rejectWithValue(error.response?.data || "Lỗi không xác định");
		}
	},
);

const productsByServiceSlice = createSlice({
	name: "productsByService",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProductsByService.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(
				fetchProductsByService.fulfilled,
				(state, action: PayloadAction<ProductsByServiceItemType[]>) => {
					state.loading = false;
					state.productsByServiceList = action.payload;
				},
			)
			.addCase(fetchProductsByService.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export const {} = productsByServiceSlice.actions; // bóc tách hàm xử lý action

export default productsByServiceSlice.reducer; // xuất sang file store.ts
