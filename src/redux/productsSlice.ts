import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type ProductsItemType = {
	_id: string;
	name: string;
	price: number;
	discount_price: number;
	images: string[];
	quantity: number;
	description: string;
	product_category: {
		_id: string;
		name: string;
		description: string;
	};
};

type ProductsState = {
	productsList: ProductsItemType[];
	loading: boolean;
	error: string | null;
};

const initialState: ProductsState = {
	productsList: [],
	loading: false,
	error: null,
};

// ✅ Call API bằng createAsyncThunk
export const fetchProducts = createAsyncThunk(
	"products/fetchProducts",
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get("http://localhost:4000/products");
			// console.log(response.data.result.data);
			return response.data.result.data;
		} catch (error: any) {
			return rejectWithValue(error.response?.data || "Lỗi không xác định");
		}
	},
);

const productsSlice = createSlice({
	name: "products",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProducts.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(
				fetchProducts.fulfilled,
				(state, action: PayloadAction<ProductsItemType[]>) => {
					state.loading = false;
					state.productsList = action.payload; // Cập nhật state bằng dữ liệu API
				},
			)
			.addCase(fetchProducts.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export const {} = productsSlice.actions; // bóc tách hàm xử lý action

export default productsSlice.reducer; // xuất sang file store.ts
