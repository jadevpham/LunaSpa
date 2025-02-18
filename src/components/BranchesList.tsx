import React, { useEffect } from "react";
import { fetchBranches } from "../redux/branchesSlice"; // ✅ Import action
import { AppDispatch, RootState } from "../redux/store"; // ✅ Import RootState để lấy dữ liệu từ Redux

// Dùng hook useSelector để lấy state từ store.ts của Redux về, hook useDispatch đưa dữ liệu lên store.ts của Redux
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CardItem from "../templates/CardItem";
import CardList from "../templates/CardList";
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
					<Link to={`/branches/${branch.id}`} key={branch.id}>
						<CardItem
							key={branch.id}
							data={branch}
							name={branch.name}
							address={branch.address}
							img={branch.img}
							category={branch.category}
							star={branch.star}
							vote={branch.vote}
						/>
					</Link>
				)}
			/>
		</>
	);
};

export default BranchesList;
