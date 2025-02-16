// Chứa toàn bộ state của ứng dụng
import { configureStore } from "@reduxjs/toolkit";
// phải import reducer từ file Slice.ts
import branchesReducer from "./branchesSlice";
import servicesReducer from "./servicesSlice";
export const store = configureStore({
	reducer: {
		// hàm này sẽ return state (trong redux thì state ~~~ reducer)
		numberReducer: (number = 1) => number, // tất cả các reducer đều chạy lần đầu tiên khi web mới khởi tạo, ở đây number là 1 state
		// reducer: có 2 vai trò trả về state và thay đổi state
		branches: branchesReducer,
		// quy tắc đặt tên: tênnamekhaibáotrongcreateSlicetrongfileSlice.ts: tênnamekhaibáotrongcreateSlicetrongfileSliceReducer
		// keys: keysReducer
		// khi sang component, trong useSelector thì state.key.tênObjectTronginitialStateCủaFileSlice
		services: servicesReducer,
	},
});
// ✅ Export RootState (Kiểu của Redux Store)
export type RootState = ReturnType<typeof store.getState>;

// ✅ Export AppDispatch (Kiểu của dispatch)
export type AppDispatch = typeof store.dispatch;
