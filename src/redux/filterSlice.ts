import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FilterState = {
	branchId?: string;
	serviceId?: string;
	date?: string;
	startTime?: string;
	endTime?: string;
};

const initialState: FilterState = {
	branchId: undefined,
	serviceId: undefined,
	date: undefined,
	startTime: undefined,
	endTime: undefined,
};

const filterSlice = createSlice({
	name: "filter",
	initialState,
	reducers: {
		setFilterCriteria: (state, action: PayloadAction<Partial<FilterState>>) => {
			return { ...state, ...action.payload };
		},

		resetFilters: () => initialState,
	},
});

export const { setFilterCriteria, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;
export type { FilterState };
