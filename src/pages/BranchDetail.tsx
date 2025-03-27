import Footer from "../components/Footer";
import React, { useEffect } from "react";
import { RootState, AppDispatch } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { fetchBranchDetail } from "../redux/branchDetailSlice";
import DetailItem from "../templates/DetailItem";
console.log("🔥 Branchetail.tsx đã được import!"); // Kiểm tra import
const BranchDetail: React.FC = () => {
	console.log("BranchDetail.tsx loaded");
	const dispatch = useDispatch<AppDispatch>(); // ✅ Khai báo dispatch kiểu AppDispatch
	const location = useLocation();
	console.log("📍useLocation():", location); // Kiểm tra location
	const params = new URLSearchParams(location.search);
	const branchId = params.get("id"); // 🔹 Lấy serviceId từ query string (?id=xyz)
	console.log("BranchDetail.tsx loaded"); // Kiểm tra xem file có render không
	console.log("Branch ID từ query:", branchId); // Kiểm tra serviceId
	// const navigate = useNavigate();
	// Lấy dữ liệu từ Redux Store
	const branchDetail = useSelector(
		(state: RootState) => state.branchDetail.branch,
	);
	const loading = useSelector((state: RootState) => state.branchDetail.loading);
	const error = useSelector((state: RootState) => state.branchDetail.error);

	// Gọi API khi component mount
	useEffect(() => {
		if (!branchId) return;

		console.log("Fetching branch detail for ID:", branchId);
		dispatch(fetchBranchDetail(branchId)); //Dispatch action lấy dữ liệu
	}, [branchId, dispatch]);

	if (loading) return <p>Đang tải dữ liệu...</p>;
	if (error) return <p className="text-red-500">{error}</p>;

	const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
	const highestBooking_countService =
		branchDetail?.services && Array.isArray(branchDetail.services)
			? branchDetail.services.reduce(
					(max, service) =>
						service.booking_count > max.booking_count ? service : max,
					branchDetail.services[0],
				)
			: null;
	// const todayOpeningHours = highestRatedBranch?.opening_hours?.find(
	// 	(day) => day.day === today,
	// );
	// const todayDay = todayOpeningHours?.day ?? "N/A";
	// const todayOpening = todayOpeningHours?.open ?? "Closed";
	// const todayClosing = todayOpeningHours?.close ?? "Closed";
	return (
		<>
			{/* <DetailItem
				title="Services"
				namePri={branchDetail?.name || "N/A"}
				nameSec={branchDetail?.contact.address || "N/A"}
				//sau thay bằng tên branch
				nameSec2={branchDetail?.services?.map((service) => service.name) || []}
				items={
					branchDetail?.services?.map((service) => ({
						id: service._id,
						name: service.name,
						address: service.description,
					})) || []
				}
				items2={
					branchDetail?.services?.flatMap((service) =>
						service.opening_hours?.map((dayInfo) => ({
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
				nameSec3={highestBooking_countService?.name || "Không có dịch vụ nào"}
				nameThir={
					branchDetail?.services
						?.flatMap(
							(service) => service.devices?.map((device) => device.name) ?? [],
						)
						.join(", ") || "N/A"
				}
				priceMin={
					highestBooking_countService?.durations && highestBooking_countService.durations.length > 0
					? Math.min(...highestBooking_countService.durations.map((d) => d.discount_price))
					: 0
				} // hiện tại duration mới chỉ có 1
				priceMax={
					highestBooking_countService?.durations && highestBooking_countService.durations.length > 0
					? Math.max(...highestBooking_countService.durations.map((d) => d.discount_price))
					: 0
				}
				durationsNameMin={
					highestBooking_countService?.durations &&
					highestBooking_countService.durations.length > 0
					  ? highestBooking_countService.durations.reduce(
						  (min, duration) =>
							duration.duration_in_minutes < min.duration_in_minutes
							  ? duration
							  : min,
							  highestBooking_countService.durations[0]
						).duration_name
					  : "N/A"
				}
				durationsNameMax={
					highestBooking_countService?.durations &&
					highestBooking_countService.durations.length > 0
					  ? highestBooking_countService.durations.reduce(
						  (max, duration) =>
							duration.duration_in_minutes > max.duration_in_minutes
							  ? duration
							  : max,
							  highestBooking_countService.durations[0]
						).duration_name
					  : "N/A"
				}
				address={branchDetail?.contact?.address ?? "N/A"} // sau thay bằng địa chị branch
				image1={branchDetail?.images[0] || "default.jpg"}
				image2={branchDetail?.images[1] || "default.jpg"}
				image3={branchDetail?.images[2] || "default.jpg"}
				day={todayDay}
				opening_hours={todayOpening} //sau thay bằng giờ của branch
				close_hours={todayClosing}
			/> */}
			{/* // <ProductByService /> */}
			<Footer />
		</>
	);
};

export default BranchDetail;
