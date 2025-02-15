import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const Header: React.FC = () => {
	// For Services
	const [isOpenServices, setIsOpenServices] = useState(false);
	const [selectedServices, setSelectedServices] = useState("All services");
	const [categoriesServices, setCategoriesServices] = useState<
		{ id: number; name: string }[]
	>([]);

	// For Branches
	const [selectedBranches, setSelectedBranches] = useState("Branches");
	const [isOpenBranches, setIsOpenBranches] = useState(false);
	const [categoriesBranches, setCategoriesBranches] = useState<
		{ id: number; name: string }[]
	>([]);

	// For Date
	const [selectedDate, setSelectedDate] = useState<Date | undefined>();
	const [isOpenDate, setIsOpenDate] = useState(false);
	const dropdownRefDate = useRef<HTMLDivElement>(null);

	// For Time
	const [startTime, setStartTime] = useState("");
	const [endTime, setEndTime] = useState("");
	const [availableTimes, setAvailableTimes] = useState<string[]>([]);
	const [isOpenTime, setIsOpenTime] = useState(false);
	const dropdownRefTime = useRef<HTMLDivElement>(null);

	// Gọi API để lấy danh mục Services từ backend
	useEffect(() => {
		const fetchCategoriesServices = async () => {
			try {
				const response = await axios.get(
					"https://678511531ec630ca33a70f2e.mockapi.io/fgh/categoriesServices",
				); // Thay bằng API BE
				setCategoriesServices(response.data); // Giả sử API trả về [{ id: 1, name: "Hair & styling" }, { id: 2, name: "Massage" }]
			} catch (error) {
				console.error("Error fetching categories:", error);
			}
		};

		fetchCategoriesServices();
	}, []);

	// Gọi API để lấy danh mục Branches từ backend
	useEffect(() => {
		const fetchCategoriesBranches = async () => {
			try {
				const response = await axios.get(
					"https://678511531ec630ca33a70f2e.mockapi.io/fgh/categoriesServices",
				); // Thay bằng API BE
				setCategoriesBranches(response.data); // Giả sử API trả về [{ id: 1, name: "Hair & styling" }, { id: 2, name: "Massage" }]
			} catch (error) {
				console.error("Error fetching categories:", error);
			}
		};

		fetchCategoriesBranches();
	}, []);

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

	// Hàm tạo danh sách Time theo Date
	useEffect(() => {
		if (selectedDate) {
			const times = generateValidTimeSlots(selectedDate);
			setAvailableTimes(generateValidTimeSlots(selectedDate));
			setStartTime(times[0]);
			setEndTime(times[1]);
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
		switch (range) {
			case "morning":
				setStartTime("08:00");
				setEndTime("12:00");
				break;
			case "afternoon":
				setStartTime("12:00");
				setEndTime("16:00");
				break;
			case "evening":
				setStartTime("16:00");
				setEndTime("21:00");
				break;
			default:
				setStartTime(availableTimes[0]);
				setEndTime(availableTimes[1]);
		}
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
						<div className="flex space-x-4">
							<button className="px-6 py-2 border-1.75 border-gray-400 rounded-full ml-2">
								Login
							</button>
						</div>
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
										<span>{selectedServices}</span>
									</div>
								</button>
								{/* Dropdown Services */}
								{isOpenServices && (
									<div className="absolute top-14 left-0 w-96 bg-white border border-gray-200 shadow-2xl rounded-lg p-4 max-h-80 overflow-y-auto z-10">
										{/* Danh mục */}
										<h3 className="text-lg font-semibold mb-2">
											Top categories
										</h3>
										<ul>
											{categoriesServices.map((categoriesServices, index) => (
												<li
													key={index}
													className="flex items-center text-left gap-3 p-3 hover:bg-gray-100 rounded-lg cursor-pointer"
													onClick={() => {
														setSelectedServices(categoriesServices.name);
														setIsOpenServices(false); // Ẩn dropdown sau khi chọn
													}}
												>
													<span>{categoriesServices.name}</span>
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
										<span>{selectedBranches}</span>
									</div>
								</button>
								{/* Dropdown Branches */}
								{isOpenBranches && (
									<div className="absolute top-14 left-0 w-96 bg-white border border-gray-200 shadow-2xl rounded-lg p-4 max-h-80 overflow-y-auto z-10">
										{/* Danh mục */}
										<ul>
											{categoriesBranches.map((categoryBranches, index) => (
												<li
													key={index}
													className="flex items-center text-left gap-3 p-3 hover:bg-gray-100 rounded-lg cursor-pointer"
													onClick={() => {
														setSelectedBranches(categoryBranches.name);
														setIsOpenBranches(false); // Ẩn dropdown sau khi chọn
													}}
												>
													<span>{categoryBranches.name}</span>
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
												onClick={() => setSelectedDate(undefined)}
											>
												Any date
											</button>
											<button
												className="border px-3 py-1 rounded-full"
												onClick={() => setSelectedDate(new Date())}
											>
												Today
											</button>
											<button
												className="border px-3 py-1 rounded-full"
												onClick={() => {
													const tomorrow = new Date();
													tomorrow.setDate(tomorrow.getDate() + 1);
													setSelectedDate(tomorrow);
												}}
											>
												Tomorrow
											</button>
										</div>

										{/* Hiển thị lịch */}
										<DayPicker
											mode="single"
											selected={selectedDate}
											onSelect={setSelectedDate}
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
												onClick={() => {
													if (!isMorningPast) {
														setStartTime("08:00");
														setEndTime("12:00");
													}
												}}
												disabled={isMorningPast}
											>
												Morning
											</button>
											<button
												className={`px-4 py-2 border rounded-full ${isAfternoonPast ? "opacity-50 cursor-not-allowed" : ""}`}
												onClick={() => {
													if (!isAfternoonPast) {
														setStartTime("12:00");
														setEndTime("16:00");
													}
												}}
												disabled={isAfternoonPast}
											>
												Afternoon
											</button>
											<button
												className={`px-4 py-2 border rounded-lg ${isEveningPast ? "opacity-50 cursor-not-allowed" : ""}`}
												onClick={() => {
													if (!isEveningPast) {
														setStartTime("16:00");
														setEndTime("21:00");
													}
												}}
												disabled={isEveningPast}
											>
												Evening
											</button>
										</div>

										<div className="flex gap-4">
											<select
												className="border rounded-lg p-2 w-32"
												value={startTime}
												onChange={(e) => setStartTime(e.target.value)}
											>
												{availableTimes.map((time) => (
													<option key={time} value={time}>
														{time}
													</option>
												))}
											</select>

											<select
												className="border rounded-lg p-2 w-32"
												value={endTime}
												onChange={(e) => setEndTime(e.target.value)}
											>
												{availableTimes
													.filter((time) => time > startTime)
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
							<button className="bg-black text-white px-6 py-2 rounded-full ml-2">
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
