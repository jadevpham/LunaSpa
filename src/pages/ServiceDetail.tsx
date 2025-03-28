import ProductsByService from "../components/ProductsByService";
import Footer from "../components/Footer";
import React, { useEffect } from "react";
import { RootState, AppDispatch } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { fetchServiceDetail } from "../redux/serviceDetailSlice";
import DetailItem from "../templates/DetailItem";
import ProductsByServiceList from "../components/ProductsByService";
console.log("🔥 ServiceDetail.tsx đã được import!"); // Kiểm tra import
const ServiceDetail: React.FC = () => {
	console.log("ServiceDetail.tsx loaded");
	const dispatch = useDispatch<AppDispatch>(); // ✅ Khai báo dispatch kiểu AppDispatch
	const location = useLocation();
	console.log("📍 useLocation():", location); // Kiểm tra location
	const params = new URLSearchParams(location.search);
	const serviceId = params.get("id"); // 🔹 Lấy serviceId từ query string (?id=xyz)
	console.log("ServiceDetail.tsx loaded"); // Kiểm tra xem file có render không
	console.log("Service ID từ query:", serviceId); // Kiểm tra serviceId
	// const navigate = useNavigate();
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
		if (!serviceId) return;

		console.log("Fetching service detail for ID:", serviceId);
		dispatch(fetchServiceDetail(serviceId)); //Dispatch action lấy dữ liệu
	}, [serviceId, dispatch]);

	if (loading) return <p>Đang tải dữ liệu...</p>;
	if (error) return <p className="text-red-500">{error}</p>;
	const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
	// console.log("Today: ", today);
	const highestRatedBranch =
		serviceDetail?.branches && Array.isArray(serviceDetail.branches)
			? serviceDetail.branches.reduce(
					(max, branch) => (branch.rating > max.rating ? branch : max),
					serviceDetail.branches[0],
				)
			: null;
	const todayOpeningHours = highestRatedBranch?.opening_hours?.find(
		(day) => day.day === today,
	);
	const todayDay = todayOpeningHours?.day ?? "N/A";
	const todayOpening = todayOpeningHours?.open ?? "Closed";
	const todayClosing = todayOpeningHours?.close ?? "Closed";
	return (
		<>
			<DetailItem
				title="Branches"
				namePri={serviceDetail?.name || "N/A"}
				nameSec={
					<>
						{highestRatedBranch?.name || "Không có chi nhánh nào"} -{" "}
						<span className="bg-gradient-to-r from-green-500 to-yellow-400 bg-clip-text text-transparent font-semibold">
							Best rating branch with {highestRatedBranch?.rating} ⭐
						</span>
					</>
				}
				//sau thay bằng tên branch
				nameSec2={serviceDetail?.branches?.map((branch) => branch.name) || []}
				items={
					serviceDetail?.branches?.map((branch) => ({
						id: branch.id,
						name: branch.name,
						address: branch.contact.address,
						durationMin: "",
						durationMax: "",
						priceMin: 0,
					})) || []
				}
				items2={
					serviceDetail?.branches?.flatMap((branch) =>
						branch.opening_hours?.map((dayInfo) => ({
							id: branch.id, // ID của branch
							name: branch.name,
							day: dayInfo.day, // Ngày trong tuần
							open: dayInfo.open, // Giờ mở cửa
							close: dayInfo.close, // Giờ đóng cửa
							isOpen: dayInfo.day === todayDay,
							isBold: dayInfo.day === todayDay, // Đánh dấu ngày hiện tại
						})),
					) ?? [] //Dùng `?? []` để đảm bảo `items2` luôn là mảng
				}
				nameSec3={highestRatedBranch?.name || "Không có chi nhánh nào"}
				nameThir={
					serviceDetail?.devices?.map((d) => d.name).join("\n") || "N/A"
				}
				priceMin={
					serviceDetail?.durations?.length
						? serviceDetail.durations.reduce((min, d) =>
								d.discount_price < min.discount_price ? d : min,
							).discount_price
						: 0
				} // hiện tại duration mới chỉ có 1
				priceMin1={0}
				priceMax={
					serviceDetail?.durations?.length
						? serviceDetail.durations.reduce((max, d) =>
								d.discount_price > max.discount_price ? d : max,
							).discount_price
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
				address={highestRatedBranch?.contact?.address ?? "N/A"} // sau thay bằng địa chị branch
				image1={serviceDetail?.images[0] || "default.jpg"}
				image2={serviceDetail?.images[1] || "default.jpg"}
				image3={serviceDetail?.images[2] || "default.jpg"}
				day={todayDay}
				opening_hours={todayOpening} //sau thay bằng giờ của branch
				close_hours={todayClosing}
				slotTime={["s1", "2", "3"]}
			/>
			<ProductsByServiceList serviceId={serviceId} />
			<Footer />
		</>
	);
};

export default ServiceDetail;
