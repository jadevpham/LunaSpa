import { RootState } from "./store";

// Lấy toàn bộ danh sách từ Redux Store
export const selectBranches = (state: RootState) => state.branches.branchesList;
export const selectServices = (state: RootState) => state.services.servicesList;
export const selectFilterCriteria = (state: RootState) => state.filter;

// Lọc dữ liệu theo branchId và serviceId
export const selectFilteredBranches = (state: RootState) => {
	const { branchId } = state.filter;
	const branchesList = state.branches.branchesList;
	// Nếu không có filter thì trả về toàn bộ danh sách
	if (!branchId) return branchesList;

	// Lọc danh sách nếu có branchId
	return state.branches.branchesList.filter(
		(branch) => !branchId || branch.id === branchId,
	);
};

export const selectFilteredServices = (state: RootState) => {
	const { serviceId } = state.filter;
	const servicesList = state.services.servicesList;
	// Nếu không có filter thì trả về toàn bộ danh sách
	if (!serviceId) return servicesList;

	// Lọc danh sách nếu có branchId
	return state.services.servicesList.filter(
		(service) => !serviceId || service.id === serviceId,
	);
};
