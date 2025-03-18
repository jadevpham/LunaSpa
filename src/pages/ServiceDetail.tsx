import ProductByService from "../components/ProductByService";
import Footer from "../components/Footer";
import React, { useEffect } from "react";
import { RootState, AppDispatch } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchServiceDetail } from "../redux/serviceDetailSlice";
import DetailItem from "../templates/DetailItem";
const ServiceDetail: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>(); // ✅ Khai báo dispatch kiểu AppDispatch
	const navigate = useNavigate();
	// Lấy dữ liệu từ Redux Store
	const serviceDetail = useSelector(
		(state: RootState) => state.serviceDetail.service,
	);
	const loading = useSelector(
		(state: RootState) => state.serviceDetail.loading,
	);
	const error = useSelector((state: RootState) => state.serviceDetail.error);

	// Gọi API khi component mount
	useEffect(() => {
		dispatch(fetchServiceDetail());
	}, [dispatch]);

	if (loading) return <p>Đang tải dữ liệu...</p>;
	if (error) return <p className="text-red-500">{error}</p>;
	return (
		<>
			<DetailItem
				title="Branches"
				namePri={serviceDetail?.name || "N/A"}
				nameSec="Perry O'Conner" //sau thay bằng tên branch
				nameThir={
					serviceDetail?.devices?.map((d) => d.name).join(", ") || "N/A"
				}
				priceMin={
					serviceDetail?.durations?.length
						? serviceDetail.durations.reduce((min, d) =>
								d.price < min.price ? d : min,
							).price
						: 0
				}
				priceMax={
					serviceDetail?.durations?.length
						? serviceDetail.durations.reduce((max, d) =>
								d.price > max.price ? d : max,
							).price
						: 0
				}
				durationsNameMin={
					serviceDetail?.durations?.length
						? serviceDetail.durations.reduce((min, d) =>
								d.duration_in_minutes < min.duration_in_minutes ? d : min,
							).duration_name
						: "N/A"
				}
				durationsNameMax={
					serviceDetail?.durations?.length
						? serviceDetail.durations.reduce((max, d) =>
								d.duration_in_minutes > max.duration_in_minutes ? d : max,
							).duration_name
						: "N/A"
				}
				address="6th Floor, Flemington Building, 182 Le Dai Hanh Street, Ward 15, District 11, Ho Chi Minh City." // sau thay bằng địa chị branch
				image={serviceDetail?.images || "default.jpg"}
				opening_hours="08:00" //sau thay bằng giờ của branch
			/>
			<ProductByService />
			<Footer />
		</>
	);
};

export default ServiceDetail;
