import React, { useEffect } from "react";
import { fetchServices } from "../redux/servicesSlice"; // ✅ Import action
import { RootState, AppDispatch } from "../redux/store"; // ✅ Import RootState để lấy dữ liệu từ Redux

// Dùng hook useSelector để lấy state từ store.ts của Redux về, hook useDispatch đưa dữ liệu lên store.ts của Redux
import { useSelector, useDispatch } from "react-redux";
import CardList from "../templates/CardList";
import CardItem from "../templates/CardItem";
import { useNavigate } from "react-router-dom";
import { addService } from "../redux/bookingSlice";
const ServicesList: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>(); // ✅ Khai báo dispatch kiểu AppDispatch
	const navigate = useNavigate();
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

	const handleSelectService = (service: any) => {
		dispatch(addService(service));
		navigate("/book/select-service");
	};

	return (
		<>
			<CardList
				title="Services"
				items={servicesList}
				renderItem={(service) => (
					<CardItem
						key={service.id}
						// data={service}
						name={service.name}
						address={service.description}
						img={service.images}
						category={service.service_category?.name || "unknown"}
						star={service.view_count}
						vote={service.booking_count}
						ratingComponent={
							<div className="flex items-center gap-4 text-sm my-2">
								<span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
									{service.view_count} 👁
								</span>
								<span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
									{service.booking_count} 📅
								</span>
							</div>
						}
						// onClick={() => handleSelectService(service)}
					/>
				)}
			/>
		</>
	);
};

export default ServicesList;
