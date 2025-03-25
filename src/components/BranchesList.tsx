import React, { useEffect } from "react";
import { fetchBranches } from "../redux/branchesSlice"; // ✅ Import action
import { RootState, AppDispatch } from "../redux/store"; // ✅ Import RootState để lấy dữ liệu từ Redux

// Dùng hook useSelector để lấy state từ store.ts của Redux về, hook useDispatch đưa dữ liệu lên store.ts của Redux
import { useSelector, useDispatch } from "react-redux";
import CardList from "../templates/CardList";
import CardItem from "../templates/CardItem";
import { Star, Phone } from "lucide-react";
const BranchesList: React.FC = () => {
	// state cần quan tâm ở đây là mảng các Branches lấy từ api
	// Tuy nhiên đối với Branches (lấy data từ call api theo redux) thì dùng nhiều ở components ở các cấp khác nhau, phải truyền props xuống nên phải dùng hooks useSelector
	// Thay vì dùng hook useState để quản lý state thì dùng useSelector của redux để lấy dữ liệu/quản lý state về từ store.ts của Redux
	// const branches = useSelector(state => state.branchesReducer);

	// useDispatch ~~~ setState trong useState,
	// const dispatch = useDispatch();
	const dispatch = useDispatch<AppDispatch>(); // ✅ Khai báo dispatch kiểu AppDispatch

	// ✅ Lấy dữ liệu từ Redux Store
	const branchesList = useSelector(
		(state: RootState) => state.branches.branchesList,
	);
	const loading = useSelector((state: RootState) => state.branches.loading);
	const error = useSelector((state: RootState) => state.branches.error);

	// ✅ Gọi API khi component mount
	useEffect(() => {
		dispatch(fetchBranches());
	}, [dispatch]);

	if (loading) return <p>Đang tải dữ liệu...</p>;
	if (error) return <p className="text-red-500">{error}</p>;

	return (
		<>
			<CardList
				title="Branches"
				items={branchesList}
				renderItem={(branch) => (
					<CardItem
						key={branch.id}
						// data={branch}
						name={branch.name}
						address={branch.contact.address}
						img={branch.images}
						category={(() => {
							const today = new Date().toLocaleDateString("en-US", {
								weekday: "long",
							});
							const todayHours = branch.opening_hours.find(
								(item) => item.day === today,
							);
							return todayHours
								? `${today}: ${todayHours.open} - ${todayHours.close}`
								: "Closed";
						})()}
						star={branch.rating}
						vote={branch.rating}
						ratingComponent={
							// <div className="flex items-center gap-4 text-sm my-2">
							// 	<span className=" py-1 rounded-full text-sm">
							// 		{branch.rating} ⭐
							// 	</span>
							// 	<span className="py-1 rounded-full text-sm">
							// 		{branch.contact.phone} 📞
							// 	</span>
							// </div>
							<div className="flex items-center gap-4 text-sm my-2">
								{/* Rating */}
								<div className="flex items-center gap-1 bg-yellow-200 text-yellow-600 px-3 py-1 rounded-full">
									<Star className="w-4 h-4" />
									<span className="font-medium">{branch.rating}</span>
								</div>

								{/* Phone Number */}
								<div className="flex items-center gap-1 bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
									<Phone className="w-4 h-4" />
									<span className="font-medium">{branch.contact.phone}</span>
								</div>
							</div>
						}
					/>
				)}
			/>
		</>
	);
};

export default BranchesList;
