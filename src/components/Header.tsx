import React from "react";
import { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from "../redux/store";
import { fetchServices } from "../redux/servicesSlice";
import { useSelector, useDispatch } from "react-redux";
import { fetchBranches } from "../redux/branchesSlice";
import { setFilterCriteria } from "../redux/filterSlice";
import { selectFilterCriteria } from "../redux/selectors";
import { toast } from "react-toastify";

const Header: React.FC = () => {
	const navigate = useNavigate();
	const filterCriteria = useSelector(selectFilterCriteria);

	// I. For Services
	const [isOpenServices, setIsOpenServices] = useState(false);
	const [selectedServicesName, setSelectedServicesName] =
		useState("All services");

	const dispatch = useDispatch<AppDispatch>(); // ✅ Khai báo dispatch kiểu AppDispatch

	// ✅ Lấy dữ liệu từ Redux Store
	const servicesList = useSelector(
		(state: RootState) => state.services.servicesList,
	);

	// ✅ Gọi API của Services khi component mount
	useEffect(() => {
		dispatch(fetchServices());
	}, [dispatch]);

	// ✅ Khi back từ trang Search về Home, giữ lại selectedServicesName
	useEffect(() => {
		if (filterCriteria.serviceId) {
			// ✅ Tìm serviceName từ serviceId nếu có
			const selectedService = servicesList.find(
				(service) => service.id === filterCriteria.serviceId,
			);
			if (selectedService) {
				setSelectedServicesName(selectedService.name);
			}
		} else {
			setSelectedServicesName("All services"); // 🛠 Reset khi không có serviceId
		}
	}, [filterCriteria.serviceId, servicesList]);

	// ✅ Khi chọn service
	const handleSelectService = (serviceId: string, serviceName: string) => {
		setSelectedServicesName(serviceName); // ✅ Cập nhật UI dropdown
		dispatch(setFilterCriteria({ serviceId })); // ❌ Không gửi selectedServicesName vào Redux
		setIsOpenServices(false); // ✅ Đóng dropdown
	};

	// II. For Branches
	const [selectedBranchesName, setSelectedBranchesName] =
		useState(" All Branches");
	const [isOpenBranches, setIsOpenBranches] = useState(false);

	// ✅ Lấy dữ liệu từ Redux Store
	const branchesList = useSelector(
		(state: RootState) => state.branches.branchesList,
	);

	// ✅ Gọi API Branches khi component mount
	useEffect(() => {
		dispatch(fetchBranches());
	}, [dispatch]);

	// ✅ Khi back từ trang Search về Home, giữ lại setSelectedBranchesName
	useEffect(() => {
		if (filterCriteria.branchId) {
			// ✅ Tìm serviceName từ serviceId nếu có
			const selectedBranch = branchesList.find(
				(branch) => branch.id === filterCriteria.branchId,
			);
			if (selectedBranch) {
				setSelectedBranchesName(selectedBranch.name);
			}
		} else {
			setSelectedBranchesName("All Branches"); // 🛠 Reset khi không có branchId
		}
	}, [filterCriteria.branchId, branchesList]);

	const [user, setUser] = useState<{ name: string; avatar: string } | null>(
		null,
	);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	useEffect(() => {
		const storedUser = localStorage.getItem("user");
		if (storedUser) {
			setUser(JSON.parse(storedUser));
		}
	}, []);

	const handleLogout = () => {
		localStorage.removeItem("user");
		localStorage.removeItem("access_token");
		localStorage.removeItem("refresh_token");
		setUser(null);
		toast.success("Logout successfully");
		navigate("/");
	};
	// ✅ Khi chọn branches
	const handleSelectBranch = (branchId: string, branchName: string) => {
		setSelectedBranchesName(branchName); // ✅ Cập nhật UI dropdown
		dispatch(setFilterCriteria({ branchId })); // ❌ Không gửi selectedServicesName vào Redux
		setIsOpenBranches(false); // ✅ Đóng dropdown
	};

	// III. For Date
	const [selectedDate, setSelectedDate] = useState<Date | undefined>();
	const [isOpenDate, setIsOpenDate] = useState(false);
	const dropdownRefDate = useRef<HTMLDivElement>(null);

	// Đóng dropdown Date khi click ra ngoài
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRefDate.current &&
				!dropdownRefDate.current.contains(event.target as Node)
			) {
				setIsOpenDate(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	// IV. For Time
	const [startTime, setStartTime] = useState("");
	const [endTime, setEndTime] = useState("");
	const [availableTimes, setAvailableTimes] = useState<string[]>([]);
	const [isOpenTime, setIsOpenTime] = useState(false);
	const dropdownRefTime = useRef<HTMLDivElement>(null);

	// Hàm tạo danh sách Time theo Date
	useEffect(() => {
		if (selectedDate) {
			const times = generateValidTimeSlots(selectedDate);
			setAvailableTimes(times);

			// Chỉ đặt startTime & endTime nếu chúng chưa được chọn trước đó
			if (!startTime || !endTime) {
				setStartTime("");
				setEndTime("");
			}
		}
	}, [selectedDate]);

	// Hàm tạo mảng thời gian từ 08:00 - 21:00 và không chọn được giờ ở đã qua
	const generateValidTimeSlots = (date: Date) => {
		const times: string[] = [];
		const now = new Date();
		const isToday = format(date, "yyyy-MM-dd") === format(now, "yyyy-MM-dd");
		const currentHour = now.getHours();

		for (let hour = 8; hour <= 21; hour++) {
			// Nếu hôm nay, chỉ cho phép chọn giờ sau giờ hiện tại +1
			if (isToday && hour < currentHour + 1) continue;
			times.push(`${hour.toString().padStart(2, "0")}:00`);
			times.push(`${hour.toString().padStart(2, "0")}:30`);
		}

		return times;
	};

	// Hàm tạo mảng thời gian theo buổi
	const setTimeRange = (range: "any" | "morning" | "afternoon" | "evening") => {
		if (!availableTimes.length) return;

		let newStartTime = "";
		let newEndTime = "";

		switch (range) {
			case "morning":
				newStartTime = availableTimes.find((time) => time >= "08:00") || "";
				newEndTime =
					[...availableTimes]
						.filter((time) => time > newStartTime && time <= "12:00")
						.pop() || newStartTime;
				break;
			case "afternoon":
				newStartTime = availableTimes.find((time) => time >= "12:00") || "";
				newEndTime =
					[...availableTimes]
						.filter((time) => time > newStartTime && time <= "16:00")
						.pop() || newStartTime;
				break;
			case "evening":
				newStartTime = availableTimes.find((time) => time >= "16:00") || "";
				newEndTime =
					[...availableTimes]
						.filter((time) => time > newStartTime && time <= "21:00")
						.pop() || newStartTime;
				break;
			default:
				newStartTime = availableTimes[0];
				newEndTime = availableTimes[1] || availableTimes[0];
		}

		setStartTime(newStartTime);
		setEndTime(newEndTime);

		dispatch(
			setFilterCriteria({ startTime: newStartTime, endTime: newEndTime }),
		);
	};

	// Đóng dropdown Time khi click ra ngoài
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				dropdownRefTime.current &&
				!dropdownRefTime.current.contains(event.target as Node)
			) {
				setIsOpenTime(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	// Xác định thời gian hiện tại để vô hiệu hóa các nút buổi sáng/chiều/tối
	const now = new Date();
	const isToday =
		selectedDate &&
		format(selectedDate, "yyyy-MM-dd") === format(now, "yyyy-MM-dd");
	const isMorningPast = isToday && now.getHours() >= 12;
	const isAfternoonPast = isToday && now.getHours() >= 16;
	const isEveningPast = isToday && now.getHours() >= 21;

	// Dispatch chúng vào Redux khi người dùng chọn giá trị mới
	const handleSelectDate = (selectedDate?: Date | null) => {
		if (!selectedDate) {
			// Nếu không có ngày, reset cả UI và Redux
			setSelectedDate(undefined);
			setStartTime("");
			setEndTime("");
			dispatch(
				setFilterCriteria({ date: undefined, startTime: "", endTime: "" }),
			);
			return;
		}

		// ✅ Tránh lỗi lệch ngày do múi giờ bằng cách tạo một Date UTC
		const utcDate = new Date(
			Date.UTC(
				selectedDate.getFullYear(),
				selectedDate.getMonth(),
				selectedDate.getDate(),
			),
		);

		// ✅ Lưu Redux dưới dạng YYYY-MM-DD mà không bị lệch múi giờ
		const formattedDate = `${utcDate.getFullYear()}-${(utcDate.getMonth() + 1)
			.toString()
			.padStart(2, "0")}-${utcDate.getDate().toString().padStart(2, "0")}`;

		setSelectedDate(utcDate); // ✅ Cập nhật UI với Date

		// ✅ Khi chọn ngày mới, không đặt giờ mặc định
		setStartTime("");
		setEndTime("");
		dispatch(
			setFilterCriteria({ date: formattedDate, startTime: "", endTime: "" }),
		); // ✅ Lưu Redux dưới dạng string chuẩn
	};

	const handleSelectStartTime = (time: string) => {
		setStartTime(time);

		// Tìm giá trị endTime hợp lệ
		const nextValidEndTime = availableTimes.find((t) => t > time) || "";

		// Cập nhật endTime nếu cần
		const newEndTime = endTime && endTime > time ? endTime : nextValidEndTime;
		setEndTime(newEndTime);

		// Đảm bảo Redux nhận giá trị hợp lệ
		dispatch(setFilterCriteria({ startTime: time, endTime: newEndTime }));
	};

	const handleSelectEndTime = (time: string) => {
		setEndTime(time);

		// Đảm bảo Redux nhận giá trị mới ngay lập tức
		dispatch(setFilterCriteria({ startTime, endTime: time }));
	};

	useEffect(() => {
		// Nếu filterCriteria.date có giá trị, chuyển đổi từ string về Date
		if (filterCriteria.date) {
			setSelectedDate(new Date(filterCriteria.date));
		} else {
			setSelectedDate(undefined); // Xóa date nếu không có filter
		}

		// Cập nhật startTime và endTime
		if (filterCriteria.startTime) {
			setStartTime(filterCriteria.startTime);
		} else {
			setStartTime(""); // Xóa giá trị nếu không có filter
		}

		if (filterCriteria.endTime) {
			setEndTime(filterCriteria.endTime);
		} else {
			setEndTime(""); // Xóa giá trị nếu không có filter
		}
	}, [filterCriteria.date, filterCriteria.startTime, filterCriteria.endTime]);

	// For Search: Service, Branch, Date, Time
	const handleSearch = () => {
		const queryParams = new URLSearchParams();

		// ✅ Lấy dữ liệu từ Redux store
		if (filterCriteria.branchId)
			queryParams.set("branchId", filterCriteria.branchId);
		if (filterCriteria.serviceId)
			queryParams.set("serviceId", filterCriteria.serviceId);
		if (filterCriteria.date) queryParams.set("date", filterCriteria.date);
		if (startTime) queryParams.set("startTime", startTime);
		if (endTime) queryParams.set("endTime", endTime);

		// ✅ Chuyển hướng với query mới
		navigate(`/search?${queryParams.toString()}`);
	};

	return (
		<>
			<div className="bg-gradient-to-r from-white to-purple-100">
				{/* Navbar */}
				<div className="container w-full justify-between mx-auto">
					<nav className="flex justify-between items-center py-6">
						{/* Logo */}
						<div className="text-3xl font-extrabold">
							<a href="#">LunaSpa</a>
						</div>
						{/* Nút */}
						{user ? (
							<div className="relative">
								<button
									className="flex items-center justify-between gap-4 bg-white border px-2 py-2 rounded-full w-24 h-12"
									onClick={() => setIsDropdownOpen(!isDropdownOpen)}
								>
									<img
										src={
											user.avatar ||
											"../../public/spa-avatar-flat-cartoon-design-this-illustration-avatar-woman-immersed-spa_198565-9639.avif"
										}
										alt="Avatar"
										className="w-10 h-10 rounded-full border"
									/>
									<i
										className={
											isDropdownOpen
												? "fa-solid fa-chevron-up"
												: "fa-solid fa-chevron-down"
										}
									></i>
								</button>

								{/* Dropdown Menu */}
								<div
									className={`absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg transition-all duration-300 ease-in-out transform 
    ${isDropdownOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-4 scale-95 pointer-events-none"}`}
								>
									<ul className="py-2">
										<li>
											<button
												onClick={() => navigate("/user-profile")}
												className="block w-full text-left px-4 py-2 hover:bg-gray-100"
											>
												👤 Profile
											</button>
										</li>
										<li>
											<button
												onClick={handleLogout}
												className="block w-full text-left px-4 py-2 hover:bg-gray-100"
											>
												🚪 Logout
											</button>
										</li>
									</ul>
								</div>
							</div>
						) : (
							/* Nếu chưa login => Hiển thị nút Login */
							<button
								className="px-6 py-2 border-1.75 border-gray-400 rounded-full hover:bg-gray-200"
								onClick={() => navigate("auth")}
							>
								Login
							</button>
						)}
					</nav>
				</div>
				{/* Hero Section */}
				<div className="text-center py-16">
					{/* Tiêu đề chính */}
					<h1 className="text-5xl md:text-6xl font-bold leading-tight">
						Book local beauty and <br /> wellness services
					</h1>
					{/* Thanh tìm kiếm */}
					<div className="max-w-4xl mx-auto mt-8">
						<div className="flex flex-wrap bg-white rounded-full p-3 shadow-2xl items-center">
							{/* All services */}
							<div className="relative flex-1 flex items-center space-x-2 px-4 border-r">
								{/* Button mở dropdown */}
								<button onClick={() => setIsOpenServices(!isOpenServices)}>
									<div className="flex items-center gap-2">
										<span>🔍</span>
										<span>{selectedServicesName}</span>
									</div>
								</button>
								{/* Dropdown Services */}
								{isOpenServices && (
									<div className="absolute top-14 left-0 w-96 bg-white border border-gray-200 shadow-2xl rounded-lg p-4 max-h-80 overflow-y-auto z-10">
										{/* Danh mục */}
										<ul>
											{servicesList.map((service) => (
												<li
													key={service.id}
													className="flex items-center text-left gap-3 p-3 hover:bg-gray-100 rounded-lg cursor-pointer"
													onClick={() =>
														handleSelectService(service.id, service.name)
													}
												>
													<span>{service.name}</span>
												</li>
											))}
										</ul>
									</div>
								)}
							</div>

							{/* Branches */}
							<div className="relative flex-1 flex items-center space-x-2 px-4 border-r">
								{/* Button mở dropdown */}
								<button onClick={() => setIsOpenBranches(!isOpenBranches)}>
									<div className="flex items-center gap-2">
										<span>🔍</span>
										<span>{selectedBranchesName}</span>
									</div>
								</button>
								{/* Dropdown Branches */}
								{isOpenBranches && (
									<div className="absolute top-14 left-0 w-96 bg-white border border-gray-200 shadow-2xl rounded-lg p-4 max-h-80 overflow-y-auto z-10">
										{/* Danh mục */}
										<ul>
											{branchesList.map((branch) => (
												<li
													key={branch.id}
													className="flex items-center text-left gap-3 p-3 hover:bg-gray-100 rounded-lg cursor-pointer"
													onClick={() =>
														handleSelectBranch(branch.id, branch.name)
													}
												>
													<span>{branch.name}</span>
												</li>
											))}
										</ul>
									</div>
								)}
							</div>

							{/* Date */}
							<div
								ref={dropdownRefDate}
								className="relative flex-1 flex items-center space-x-2 px-4 border-r"
							>
								{/* Button mở dropdown */}
								<button
									onClick={() => setIsOpenDate(!isOpenDate)}
									className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white shadow-sm"
								>
									<span>⏰</span>
									<span>
										{selectedDate ? format(selectedDate, "PPP") : "Any date"}
									</span>
								</button>

								{/* Dropdown nội dung */}
								{isOpenDate && (
									<div className="absolute top-12 left-0 w-[350px] bg-white border shadow-lg rounded-lg p-4 z-10">
										<div className="flex gap-2 mb-4">
											<button
												className={`px-3 py-1 rounded-full ${!selectedDate ? "bg-blue-500 text-white" : "border"}`}
												onClick={() => handleSelectDate(undefined)}
											>
												Any date
											</button>
											<button
												className="border px-3 py-1 rounded-full"
												onClick={() => handleSelectDate(new Date())}
											>
												Today
											</button>
											<button
												className="border px-3 py-1 rounded-full"
												onClick={() => {
													const tomorrow = new Date();
													tomorrow.setDate(tomorrow.getDate() + 1);
													handleSelectDate(tomorrow);
												}}
											>
												Tomorrow
											</button>
										</div>

										{/* Hiển thị lịch */}
										<DayPicker
											mode="single"
											selected={selectedDate}
											onSelect={handleSelectDate}
											disabled={{ before: new Date() }} // Chặn ngày trong quá khứ
										/>
									</div>
								)}
							</div>

							{/* Time */}
							<div
								ref={dropdownRefTime}
								className="relative flex-1 flex items-center space-x-2 px-4 border-r"
							>
								{/* Button mở dropdown */}
								<button
									onClick={() => setIsOpenTime(!isOpenTime)}
									className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white shadow-sm"
								>
									<span>⏱️</span>
									<span>
										{startTime && endTime
											? `${startTime} - ${endTime}`
											: "Any time"}
									</span>
									{startTime && endTime && (
										<button
											onClick={(e) => {
												e.stopPropagation();
												setStartTime("");
												setEndTime("");
											}}
											className="ml-2 text-gray-500 hover:text-black"
										>
											⨉
										</button>
									)}
								</button>

								{/* Dropdown Time */}
								{isOpenTime && (
									<div className="absolute top-12 left-0 w-auto bg-white border shadow-lg rounded-lg p-4 z-10">
										<div className="flex gap-2 mb-4">
											<button
												className="px-4 py-2 border rounded-full whitespace-nowrap"
												onClick={() => setTimeRange("any")}
											>
												Any time
											</button>
											<button
												className={`px-4 py-2 border rounded-full ${isMorningPast ? "opacity-50 cursor-not-allowed" : ""}`}
												onClick={() =>
													!isMorningPast && setTimeRange("morning")
												}
												disabled={isMorningPast}
											>
												Morning
											</button>
											<button
												className={`px-4 py-2 border rounded-full ${isAfternoonPast ? "opacity-50 cursor-not-allowed" : ""}`}
												onClick={() =>
													!isAfternoonPast && setTimeRange("afternoon")
												}
												disabled={isAfternoonPast}
											>
												Afternoon
											</button>
											<button
												className={`px-4 py-2 border rounded-full ${isEveningPast ? "opacity-50 cursor-not-allowed" : ""}`}
												onClick={() =>
													!isEveningPast && setTimeRange("evening")
												}
												disabled={isEveningPast}
											>
												Evening
											</button>
										</div>

										<div className="flex gap-4">
											<select
												className="border rounded-lg p-2 w-32"
												value={startTime || ""} // Nếu null hoặc undefined thì về ""
												onChange={(e) => handleSelectStartTime(e.target.value)}
											>
												{availableTimes.map((time) => (
													<option key={time} value={time}>
														{time}
													</option>
												))}
											</select>

											<select
												className="border rounded-lg p-2 w-32"
												value={endTime || ""}
												onChange={(e) => handleSelectEndTime(e.target.value)}
											>
												{availableTimes
													.filter((time) => !startTime || time > startTime) // Chỉ hiển thị giờ lớn hơn startTime
													.map((time) => (
														<option key={time} value={time}>
															{time}
														</option>
													))}
											</select>
										</div>
									</div>
								)}
							</div>

							{/* Button Search */}
							<button
								className="bg-black text-white px-6 py-2 rounded-full ml-2"
								onClick={handleSearch}
							>
								Search
							</button>
						</div>
					</div>
					{/* Số lượt đặt lịch */}
					<p className="mt-10 text-lg">
						<span className="font-bold">311,908</span> appointments booked today
					</p>
				</div>
			</div>
		</>
	);
};

export default Header;
