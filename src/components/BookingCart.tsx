import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { removeService } from "../redux/bookingSlice";
import { useNavigate } from "react-router-dom";

const BookingCart: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {
		selectedBranch,
		selectedService,
		selectedTime,
		selectedPaymentMethod,
	} = useSelector((state: RootState) => state.booking);

	const totalPrice =
		selectedService?.reduce(
			(total, service) => total + service.Service_Price,
			0,
		) ?? 0;

	const isServiceSelected = selectedService && selectedService.length > 0;
	const isTimeSelected = !!selectedTime;
	const isPaymentSelected = !!selectedPaymentMethod;

	let buttonLabel = "Next";
	let handleClick = () => navigate("/book/time");

	if (
		isServiceSelected &&
		isTimeSelected &&
		window.location.pathname === "/book/confirm"
	) {
		buttonLabel = "Confirm";
		handleClick = () => {
			if (isServiceSelected && isTimeSelected && isPaymentSelected) {
				alert("Booking confirmed!");
			} else {
				alert("Please select all required details.");
			}
		};
	} else if (isServiceSelected && window.location.pathname === "/book/time") {
		buttonLabel = "Next";
		handleClick = () => navigate("/book/confirm");
	}

	return (
		<div className="p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
			{/* Shop Info */}
			<div className="flex items-start space-x-4">
				<img
					src={selectedBranch?.img}
					alt="Shop"
					className="w-16 h-16 rounded-md object-cover"
				/>
				<div>
					<h3 className="font-bold text-lg">{selectedBranch?.name}</h3>
					{selectedBranch?.star && (
						<p className="text-yellow-500">
							{"⭐".repeat(Math.round(selectedBranch?.star))} (
							{selectedBranch?.star})
						</p>
					)}
					<p className="text-gray-500 text-sm">{selectedBranch?.address}</p>
				</div>
			</div>

			{/* Booking Details */}
			{selectedTime && (
				<div className="mt-4 text-gray-700">
					<p className="flex items-center space-x-2">
						📅 <span>{selectedTime.ServiceBooking_Date}</span>
					</p>
					<p className="flex items-center space-x-2 mt-1">
						⏰ <span>{selectedTime.ServiceBooking_Time}</span>
					</p>
				</div>
			)}

			{/* Service & Price */}
			{isServiceSelected && selectedService ? (
				<div className="mt-4 border-t pt-4">
					{selectedService.map((service) => (
						<div key={service.Service_ID} className="mb-2">
							<p className="text-gray-700 font-bold flex">
								{service.Service_Name}
								<span className="ml-auto">${service.Service_Price}</span>
							</p>
							<p className="text-sm">{service.Service_Duration} mins</p>
							<button
								onClick={() => dispatch(removeService(service.Service_ID))}
								className="text-red-500 text-xs"
							>
								Remove
							</button>
						</div>
					))}
				</div>
			) : (
				<span className="text-gray-500">No services selected</span>
			)}

			{/* Payment Info */}
			<div className="mt-40 border-t pt-4">
				<div className="flex justify-between text-gray-700">
					<span className="font-bold">Total</span>
					<span className="font-bold">${totalPrice}</span>
				</div>
				{selectedPaymentMethod && (
					<div className="flex justify-between mt-1 text-green-600 font-medium">
						<span>{selectedPaymentMethod?.name}</span>
						<span>${totalPrice}</span>
					</div>
				)}
			</div>

			{/* Confirm Button */}
			<button
				className={`w-full py-3 mt-4 rounded-md text-white ${
					isServiceSelected
						? "bg-black hover:bg-gray-800"
						: "bg-gray-400 cursor-not-allowed"
				}`}
				onClick={handleClick}
				disabled={!isServiceSelected}
			>
				{buttonLabel}
			</button>
		</div>
	);
};
export default BookingCart;
