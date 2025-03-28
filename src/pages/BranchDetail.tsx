import Footer from "../components/Footer";
import React, { useEffect, useState } from "react";
import { RootState, AppDispatch } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { fetchBranchDetail } from "../redux/branchDetailSlice";
import { fetchSlotService } from "../redux/slotServiceSlice";

import DetailItem from "../templates/DetailItem";
import ProductsByBranch from "../components/ProductsByBranch";
console.log("🔥 Branchetail.tsx đã được import!"); // Kiểm tra import
const BranchDetail: React.FC = () => {
	console.log("BranchDetail.tsx loaded");
	const dispatch = useDispatch<AppDispatch>(); // ✅ Khai báo dispatch kiểu AppDispatch
	const location = useLocation();
	console.log("📍useLocation():", location); // Kiểm tra location
	const params = new URLSearchParams(location.search);
	const branchId = params.get("id") ?? ""; // 🔹 Lấy serviceId từ query string (?id=xyz)
	console.log("BranchDetail.tsx loaded"); // Kiểm tra xem file có render không
	console.log("Branch ID từ query:", branchId); // Kiểm tra serviceId
	// Lấy dữ liệu từ Redux Store
	const branchDetail = useSelector(
		(state: RootState) => state.branchDetail.branch,
	);
	const loading = useSelector((state: RootState) => state.branchDetail.loading);
	const error = useSelector((state: RootState) => state.branchDetail.error);

	// Gọi API khi component mount
	useEffect(() => {
		if (!branchDetail && branchId) {
			console.log("Fetching branch detail for ID:", branchId);
			dispatch(fetchBranchDetail(branchId));
		}
	}, [branchId, branchDetail, dispatch]);

	if (loading) return <p>Đang tải dữ liệu...</p>;
	if (error) return <p className="text-red-500">{error}</p>;

	////
	const slotService = useSelector(
		(state: RootState) => state.slotService.slotServiceList,
	);
	console.log("Redux slotService state:", slotService);

	const loadingSlot = useSelector(
		(state: RootState) => state.slotService.loading,
	);
	const errorSlot = useSelector((state: RootState) => state.slotService.error);
	useEffect(() => {
		if (slotService.length === 0) {
			console.log("Slot Service Data BranchDetail.tsx:", slotService);
			dispatch(fetchSlotService());
		}
	}, [dispatch, slotService]);

	if (loadingSlot) return <p>Đang tải dữ liệu...</p>;
	if (errorSlot) return <p className="text-red-500">{errorSlot}</p>;

	const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
	const highestBooking_countService =
		branchDetail?.services && Array.isArray(branchDetail.services)
			? branchDetail.services.reduce(
					(max, service) =>
						service.booking_count > max.booking_count ? service : max,
					branchDetail.services[0],
				)
			: null;
	const todayOpeningHours = branchDetail?.opening_hours?.find(
		(day) => day.day === today,
	);
	const todayDay = todayOpeningHours?.day ?? "N/A";
	const todayOpening = todayOpeningHours?.open ?? "Closed";
	const todayClosing = todayOpeningHours?.close ?? "Closed";
	const productList = branchDetail?.products || [];
	const slotTime = slotService?.map((slot) => {
		const date = new Date(slot.start_time);
		const hours = String(date.getHours()).padStart(2, "0"); // Định dạng 2 chữ số
		const minutes = String(date.getMinutes()).padStart(2, "0");
		return `${hours}:${minutes}`;
	});
	console.log(slotTime);

	return (
		<>
			<DetailItem
				title="Services"
				namePri={branchDetail?.name || "N/A"}
				nameSec={branchDetail?.contact.address || "N/A"}
				//sau thay bằng tên branch
				nameSec2={branchDetail?.services?.map((service) => service.name) || []}
				items={
					branchDetail?.services?.map((service) => {
						const minDuration = service.durations.reduce(
							(min, duration) =>
								duration.duration_in_minutes < min.duration_in_minutes
									? duration
									: min,
							service.durations[0], // Giá trị khởi tạo là phần tử đầu tiên
						);

						const maxDuration = service.durations.reduce(
							(max, duration) =>
								duration.duration_in_minutes > max.duration_in_minutes
									? duration
									: max,
							service.durations[0],
						);
						// Lấy thông tin từ slotService
						// const slot = Array.isArray(slotService)
						// ? slotService.find((slot) => slot.serviceId === service._id)
						// : null;

						return {
							id: service._id,
							name: service.name,
							address: service.description,

							durationMin: minDuration.duration_name || "", // ✅ Thêm tên của duration nhỏ nhất

							durationMax: maxDuration.duration_name || "", // ✅ Thêm tên của duration lớn nhất
							priceMin: minDuration.discount_price || 0, // ✅ Lấy giá thấp nhất tương ứng
							// slot: slot
						};
					}) || []
				}
				nameSec3={highestBooking_countService?.name || "Không có dịch vụ nào"}
				nameThir={
					branchDetail?.services
						?.flatMap(
							(service) => service.devices?.map((device) => device.name) ?? [],
						)
						.slice(0, 4) // ✅ Lấy tối đa 4 phần tử
						.join("\n") +
						(branchDetail?.services?.flatMap((service) => service.devices ?? [])
							.length > 4
							? "\n..."
							: "") || // ✅ Nếu > 4 thì thêm "..."
					"N/A"
				}
				priceMin={
					highestBooking_countService?.durations &&
					highestBooking_countService.durations.length > 0
						? Math.min(
								...highestBooking_countService.durations.map(
									(d) => d.discount_price,
								),
							)
						: 0
				} // hiện tại duration mới chỉ có 1
				priceMin1={Math.min(
					...(branchDetail?.services?.flatMap((service) =>
						service.durations.map((duration) => duration.discount_price),
					) || [Infinity]),
				)}
				priceMax={
					highestBooking_countService?.durations &&
					highestBooking_countService.durations.length > 0
						? Math.max(
								...highestBooking_countService.durations.map(
									(d) => d.discount_price,
								),
							)
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
								highestBooking_countService.durations[0],
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
								highestBooking_countService.durations[0],
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
				slotTime={slotTime}
			/>
			<ProductsByBranch productList={productList ?? []} />
			<Footer />
		</>
	);
};

export default BranchDetail;
