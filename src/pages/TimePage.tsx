import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setTime } from "../redux/bookingSlice";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import Calendar from "react-calendar";
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

	const [selectedDate, setSelectedDate] = useState(today.format("YYYY-MM-DD"));
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
		"11:00",
		"11:15",
		"11:30",
		"11:45",
		"12:00",
		"12:15",
		"12:30",
		"12:45",
		"13:00",
		"13:15",
		"13:30",
	];

	// Chọn ngày
	const handleSelectDate = (date: string) => {
		setSelectedDate(date);
		setSelectedTime(null);
	};

	// Chọn giờ
	const handleSelectTime = (time: string) => {
		setSelectedTime(time);
		const selectedTime: BookTime = {
			ServiceBooking_Date: selectedDate,
			ServiceBooking_Time: time,
		};
		dispatch(setTime(selectedTime));
		navigate("/book/confirm");
	};

	const handlePrevWeek = () => {
		// Không cho phép trượt về tuần trước nếu tuần hiện tại đã ở quá khứ
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

	// Xử lý khi người dùng chọn ngày từ calendar
	const handleCalendarChange = (value: Date | Date[]) => {
		const date = Array.isArray(value) ? value[0] : value;
		setSelectedDate(dayjs(date).format("YYYY-MM-DD"));
		// Tính lại ngày đầu tuần mới dựa trên ngày đã chọn
		setCurrentWeekStart(dayjs(date).startOf("week"));
		setShowCalendar(false); // Ẩn calendar sau khi chọn ngày
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
		<div className="p-5">
			<h2 className="text-2xl font-bold mb-4 flex items-center justify-between">
				<span>Select time</span>
				<button
					onClick={() => setShowCalendar(!showCalendar)}
					className="p-2 z-50"
				>
					<i className="fa-solid fa-calendar-minus text-2xl cursor-pointer " />
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
				<h3 className="flex-1 text-center font-bold text-xl">
					{currentWeekStart.format("MMMM YYYY")}
				</h3>
				<button className="p-2" onClick={handleNextWeek}>
					<i className="fa-solid fa-arrow-right cursor-pointer text-xl mx-2"></i>
				</button>
			</div>

			{/* calendar overlay */}
			{showCalendar && (
				<div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-10">
					<Calendar
						onChange={handleCalendarChange}
						value={new Date(selectedDate)}
						className="mx-auto"
						showNeighboringMonth={false}
						minDate={today.toDate()}
						selectRange={false}
						showWeekNumbers={false}
						locale="en"
						next2Label={null}
						prev2Label={null}
						selected={selectedDate}
					/>
				</div>
			)}

			{/* chọn ngày trong tuần */}
			<div className="flex justify-between mb-3 relative overflow-hidden">
				<div
					className={`flex space-x-6 my-2 transition-transform duration-300 ease-in-out ${
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
							className={`p-2 rounded-full w-20 h-20 text-center transition-transform duration-300 ease-in-out ${
								day.isBefore(today, "day")
									? "bg-gray-300 text-gray-400"
									: selectedDate === day.format("YYYY-MM-DD")
										? "bg-purple-600 text-white scale-105"
										: "bg-gray-200 text-gray-700 scale-100"
							}`}
							onClick={() => handleSelectDate(day.format("YYYY-MM-DD"))}
							disabled={day.isBefore(today, "day")}
						>
							<div className="text-center">{day.format("ddd")}</div>
							<div className="text-center font-bold">{day.format("D")}</div>
						</button>
					))}{" "}
				</div>
			</div>

			{/* chọn thời gian */}
			<div className="mt-5 space-y-3">
				{timeSlots.map((time) => (
					<button
						key={time}
						className={`block w-full p-3 rounded text-left ${selectedTime === time ? "bg-purple-600 text-white" : "bg-gray-200"}`}
						onClick={() => handleSelectTime(time)}
					>
						🕒 {time}
					</button>
				))}
			</div>
		</div>
	);
};

export default TimePage;
