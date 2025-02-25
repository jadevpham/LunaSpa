import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setTime } from "../redux/bookingSlice";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { DayPicker } from "react-day-picker";
import "react-calendar/dist/Calendar.css";

interface BookTime {
	ServiceBooking_Date: string;
	ServiceBooking_Time: string;
}

const TimePage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const selectedService = useSelector(
		(state: RootState) => state.booking.selectedService,
	);
	const today = dayjs();

	const [selectedDate, setSelectedDate] = useState<Date | undefined>(
		today.toDate(),
	);
	const [selectedTime, setSelectedTime] = useState<string | null>(null);
	const [currentWeekStart, setCurrentWeekStart] = useState(
		today.startOf("week"),
	);
	const [slideDirection, setSlideDirection] = useState<"left" | "right" | null>(
		null,
	);
	const [isSliding, setIsSliding] = useState(false);

	// Tạo danh sách các ngày trong tuần hiện tại
	const daysInWeek = Array.from({ length: 7 }, (_, i) =>
		currentWeekStart.add(i, "day"),
	);

	const [showCalendar, setShowCalendar] = useState(false);

	// Danh sách thời gian đang fake fixed
	const timeSlots = [
		{ time: "11:00", price: 150000 },
		{ time: "11:15", price: 150000 },
		{ time: "11:30", price: 150000 },
		{ time: "11:45", price: 150000 },
		{ time: "12:00", price: 180000 },
		{ time: "12:15", price: 180000 },
		{ time: "12:30", price: 180000 },
		{ time: "12:45", price: 180000 },
		{ time: "13:00", price: 150000 },
		{ time: "13:15", price: 150000 },
		{ time: "13:30", price: 150000 },
	];

	// Giả lập ngày không có slot (ví dụ: thứ 7 và chủ nhật không có slot)
	const hasTimeSlots = (date: Date) => {
		const dayOfWeek = dayjs(date).day();
		return dayOfWeek !== 0 && dayOfWeek !== 6;
	};

	// Chọn ngày
	const handleSelectDate = (date: Date) => {
		setSelectedDate(date);
		setSelectedTime(null);
	};

	// Chọn giờ
	const handleSelectTime = (time: string) => {
		setSelectedTime(time);
		const selectedTime: BookTime = {
			ServiceBooking_Date: selectedDate
				? dayjs(selectedDate).format("YYYY-MM-DD")
				: "",
			ServiceBooking_Time: time,
		};
		dispatch(setTime(selectedTime));
	};

	const handlePrevWeek = () => {
		if (currentWeekStart.isAfter(today.startOf("week"))) {
			setSlideDirection("left");
			setIsSliding(true);
			setCurrentWeekStart(currentWeekStart.subtract(1, "week"));
		}
	};

	const handleNextWeek = () => {
		setSlideDirection("right");
		setIsSliding(true);
		setCurrentWeekStart(currentWeekStart.add(1, "week"));
	};

	const handleCalendarChange = (value: Date | undefined) => {
		if (value) {
			setSelectedDate(value);
			// Tính lại ngày đầu tuần mới dựa trên ngày đã chọn
			setCurrentWeekStart(dayjs(value).startOf("week"));
			setShowCalendar(false); // Ẩn calendar sau khi chọn ngày
		}
	};

	const getNextAvailableDate = () => {
		let nextDate = dayjs(selectedDate).add(1, "day");
		while (!hasTimeSlots(nextDate.toDate())) {
			nextDate = nextDate.add(1, "day");
		}
		return nextDate;
	};

	useEffect(() => {
		if (isSliding) {
			const timer = setTimeout(() => setIsSliding(false), 300); // Reset trạng thái sau 300ms (thời gian transition)
			return () => clearTimeout(timer);
		}
	}, [isSliding]);

	useEffect(() => {
		if (!selectedService) {
			navigate(-1);
		}
	}, [selectedService, navigate]);
	return (
		<div className="container mx-auto">
			<h2 className="text-5xl font-bold mb-4 flex items-center justify-between">
				<span>Select time</span>
				<button
					onClick={() => setShowCalendar(!showCalendar)}
					className="p-2 z-20 border border-gray-300 w-12 flex items-center justify-center rounded-full hover:bg-gray-300 transition-colors duration-300"
				>
					<i className="fa-regular fa-calendar-minus text-xl cursor-pointer " />
				</button>
			</h2>

			{/* icon và điều hướng tuần */}
			<div className="flex items-center mb-4">
				<button
					className={`p-2 ${currentWeekStart.isBefore(today.startOf("week")) ? "cursor-not-allowed" : ""}`}
					onClick={handlePrevWeek}
					disabled={currentWeekStart.isBefore(today.startOf("week"))}
				>
					<i
						className={`fa-solid fa-arrow-left cursor-pointer text-xl mx-2  ${currentWeekStart.isBefore(today.startOf("week")) ? "cursor-not-allowed" : ""}`}
					></i>
				</button>
				<h3 className="flex-1 text-center font-bold text-2xl">
					{currentWeekStart.format("MMMM YYYY")}
				</h3>
				<button className="p-2" onClick={handleNextWeek}>
					<i className="fa-solid fa-arrow-right cursor-pointer text-xl mx-2"></i>
				</button>
			</div>

			{/* calendar overlay */}
			{showCalendar && (
				<div className="absolute top-12 left-2/3 transform -translate-x-2/3 mt-2 w-[350px] bg-white border shadow-lg rounded-lg p-4 z-10">
					<div className="flex gap-2 mb-4">
						<button
							className={`px-3 py-1 rounded-full ${!selectedDate ? "bg-blue-500 text-white" : "border"}`}
							onClick={() => setSelectedDate(undefined)}
						>
							Any date
						</button>
						<button
							className={`px-3 py-1 rounded-full ${selectedDate?.toDateString() === new Date().toDateString() ? "bg-blue-500 text-white" : "border"}`}
							onClick={() => setSelectedDate(new Date())}
						>
							Today
						</button>
						<button
							className={`px-3 py-1 rounded-full ${selectedDate?.toDateString() === new Date(new Date().setDate(new Date().getDate() + 1)).toDateString() ? "bg-blue-500 text-white" : "border"}`}
							onClick={() => {
								const tomorrow = new Date();
								tomorrow.setDate(tomorrow.getDate() + 1);
								setSelectedDate(tomorrow);
							}}
						>
							Tomorrow
						</button>{" "}
					</div>

					{/* Hiển thị lịch */}
					<DayPicker
						mode="single"
						selected={selectedDate}
						onSelect={handleCalendarChange}
						disabled={{ before: new Date() }}
						defaultMonth={selectedDate}
						// month={selectedDate}
						classNames={{
							selected: `bg-gradient-to-tr from-purple-400 to-pink-300 text-black rounded-full`,
							chevron: "text-gray-500",
						}}
					/>
				</div>
			)}

			{/* chọn ngày trong tuần */}
			<div className="flex justify-between mb-3 relative overflow-hidden">
				<div
					className={`grid grid-cols-7 gap-2 w-full transition-transform duration-300 ease-in-out ${
						isSliding
							? slideDirection === "right"
								? "transform translate-x-[-100%]"
								: "transform translate-x-[100%]"
							: ""
					}`}
				>
					{daysInWeek.map((day) => (
						<button
							key={day.format("YYYY-MM-DD")}
							className={`container w-full max-w-[45px] my-2 mx-auto md:max-w-[55px] lg:max-w-[65px] aspect-square flex flex-col items-center justify-center rounded-full transition-all duration-300 ease-in-out ${
								day.isBefore(today, "day")
									? "bg-gray-300 text-gray-400 cursor-not-allowed"
									: selectedDate && day.isSame(selectedDate, "day")
										? "bg-gradient-to-tr from-purple-400 to-pink-300 text-white scale-105 shadow-md"
										: "bg-gray-200 text-gray-700 hover:scale-105"
							}`}
							onClick={() => handleSelectDate(day.toDate())}
							disabled={day.isBefore(today, "day")}
						>
							<div className="text-center text-xs md:text-sm lg:text-base">
								{day.format("ddd")}
							</div>
							<div className="text-center text-sm font-bold">
								{day.format("D")}
							</div>
						</button>
					))}
				</div>
			</div>

			{/* chọn thời gian */}
			<div className="mt-5 space-y-3">
				{selectedDate && !hasTimeSlots(selectedDate) ? (
					<div className="text-center p-4 bg-gray-100 rounded">
						<img
							src="https://www.fresha.com/assets/_next/static/images/illustration-calendar-dbfb10b915454fc731f372684f3afbdf.png"
							alt="Not available time slot icon"
							className="mx-auto mt-4 w-20"
							loading="eager"
						></img>
						<p className="text-gray-500">
							Available from: {getNextAvailableDate().format("MMM D, YYYY")}
						</p>
						<button
							className="px-3 py-1 mt-2 rounded-full bg-gradient-to-tr from-purple-400 to-pink-300 text-white hover:opacity-90"
							onClick={() => {
								const nextDate = getNextAvailableDate();
								setSelectedDate(nextDate.toDate());
								handleCalendarChange(nextDate.toDate()); //
							}}
						>
							Go to next available day
						</button>
					</div>
				) : (
					timeSlots.map((slot) => (
						<button
							key={slot.time}
							className={`block w-full p-3 transition-all duration-300 rounded text-left ${selectedTime === slot.time ? "border-2 border-purple-300  bg-white  text-black rounded-xl" : "bg-white  text-black border rounded-xl"}`}
							onClick={() => handleSelectTime(slot.time)}
						>
							<div className="flex justify-between items-center">
								<span>🕒 {slot.time}</span>
								<span>${slot.price.toLocaleString("en-US")}</span>
							</div>
						</button>
					))
				)}
			</div>
		</div>
	);
};
export default TimePage;
