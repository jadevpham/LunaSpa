import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type ProductsItemType = {
	id: string;
	name: string;
	price: number;
	discount_price: number;
	images: string;
	quantity: number;
	description: string;
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
			const response = await axios.get(
				"http://localhost:4000/products?limit=10&page=1&sort=&search=&order=&max_price=2500000&min_price=0&category_id=67cd73028d84f38f7341a07e&discount_price=10000000&quantity=1000",
			);
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
