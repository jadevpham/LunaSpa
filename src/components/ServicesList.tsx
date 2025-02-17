import React, { useEffect } from "react";
import { fetchServices } from "../redux/servicesSlice"; // ✅ Import action
import { RootState, AppDispatch } from "../redux/store"; // ✅ Import RootState để lấy dữ liệu từ Redux

// Dùng hook useSelector để lấy state từ store.ts của Redux về, hook useDispatch đưa dữ liệu lên store.ts của Redux
import { useSelector, useDispatch } from "react-redux";
import CardList from "../templates/CardList";
import CardItem from "../templates/CardItem";
const ServicesList: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>(); // ✅ Khai báo dispatch kiểu AppDispatch

	// ✅ Lấy dữ liệu từ Redux Store
	const servicesList = useSelector(
		(state: RootState) => state.services.servicesList,
	);
	const loading = useSelector((state: RootState) => state.services.loading);
	const error = useSelector((state: RootState) => state.services.error);

	// ✅ Gọi API khi component mount
	useEffect(() => {
		dispatch(fetchServices());
	}, [dispatch]);

	if (loading) return <p>Đang tải dữ liệu...</p>;
	if (error) return <p className="text-red-500">{error}</p>;

	return (
		<>
			<CardList
				title="Services"
				items={servicesList}
				renderItem={(service) => (
					<CardItem
						key={service.id}
						data={service}
						name={service.name}
						address={service.address}
						img={service.img}
						category={service.category}
						star={service.star}
						vote={service.vote}
					/>
				)}
			/>
		</>
	);
};

export default ServicesList;
