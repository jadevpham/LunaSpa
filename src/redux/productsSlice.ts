import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type ProductsItemType = {
	id: string;
	name: string;
	price: number;
	img: string;
	category: string;
	star: number;
	vote: number;
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
				"https://678511531ec630ca33a70f2e.mockapi.io/fgh/categoriesServices",
			);
			return response.data; // ✅ API trả về danh sách categories
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
					state.productsList = action.payload; // ✅ Cập nhật state bằng dữ liệu API
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
