// Slice chuẩn mới của Redux , tích hợp Reducer (state) và action chung 1 file
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// dùng Type để xđ kiểu dữ liệu của properties trong object trong initialState
type BranchesItemType = {
	_id: string;
	name: string;
	description: string;
	rating: number;
	images: string[];
	status: number;
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
		booking_count: number;
		view_count: number;
		durations: {
			duration_name: string;
			price: number;
			discount_price: number;
			duration_in_minutes: number;
		}[];
		devices: {
			_id: string;
			name: string;
			description: string;
		}[];
	}[];
};

type BranchesState = {
	branchesList: BranchesItemType[]; // ✅ Là một mảng các object
	loading: boolean;
	error: string | null;
};

const initialState: BranchesState = {
	// initialState xác định tất cả reducer (state) dù là mảng, object, number, string... đều là object
	// initialState như là giá trị mặc định ban đầu trong useState

	// phải khai báo kiểu dữ liệu của properties trong object đúng kiểu của TypeScript
	// vd: TypeScript không thể hiểu string trong object vì đây là giá trị chứ không phải khai báo kiểu dữ liệu.
	// id: string, -> Sai
	// => dùng Type để xđ kiểu dữ liệu của properties trong object trong initialState
	branchesList: [],
	loading: false,
	error: null,
};

// ✅ Call API bằng createAsyncThunk
export const fetchBranches = createAsyncThunk(
	"branches/fetchBranches",
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get("http://localhost:4000/branches");
			// console.log(response.data.result.data);
			return response.data.result.data;
		} catch (error: any) {
			return rejectWithValue(error.response?.data || "Lỗi không xác định");
		}
	},
);

const branchesSlice = createSlice({
	// name trong createSlice là một chuỗi string, không phải một biến.
	name: "branches", // tên của slice thường đặt trùng tên file Slice luôn, Dùng camelCase hoặc snake_case, nhưng không nên dùng PascalCase.
	initialState,
	reducers: {
		// nơi viết CRUD
		// tạo action tương ứng với reducer
		// tên action: addBranch, removeBranch, updateBranch,...
		// addBranch: (state, action) => {
		//     // thêm branch vào mảng
		//     state.branchesItemType.push(action.payload);
		// },
		// removeBranch: (state, action) => {
		//     // xóa branch ra kh��i mảng
		//     state.branchesItemType = state.branchesItemType.filter(
		//         (branch) => branch.id!== action.payload
		//     );
		// },
		// //... các action khác
	}, // hàm xử lý action, export sang store.ts dùng, sang store.ts sẽ có tên là tênnamekhaibáotrongcreateSliceReducer

	// Nếu chỉ có method GET thì không cần viết nội dung action trong reducers, nhưng phải viết extraReducers vì
	// Khi gọi API, ta cần trạng thái loading để hiển thị "Đang tải..." trên UI.
	// Nếu API lỗi, ta cần trạng thái error để hiển thị lỗi.
	extraReducers: (builder) => {
		builder
			.addCase(fetchBranches.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(
				fetchBranches.fulfilled,
				(state, action: PayloadAction<BranchesItemType[]>) => {
					state.loading = false;
					state.branchesList = action.payload; // ✅ Cập nhật state bằng dữ liệu API
				},
			)
			.addCase(fetchBranches.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export const {} = branchesSlice.actions; // bóc tách hàm xử lý action

export default branchesSlice.reducer; // xuất sang file store.ts
