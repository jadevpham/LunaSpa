import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const BookingCart: React.FC = () => {
	const {
		selectedBranch,
		selectedService,
		selectedTime,
		selectedPaymentMethod,
	} = useSelector((state: RootState) => state.booking);
	return (
		<div className="p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
			{/* Shop Info */}
			<div className="flex items-start space-x-4">
				<img
					src="/shop-image.jpg"
					alt="Shop"
					className="w-16 h-16 rounded-md object-cover"
				/>
				<div>
					<h3 className="font-semibold text-lg">{"shopName"}</h3>
					<p className="text-yellow-500">
						{"⭐".repeat(Math.round(3))} ({4})
					</p>
					<p className="text-gray-500 text-sm">{"location"}</p>
				</div>
			</div>

			{/* Booking Details */}
			<div className="mt-4 text-gray-700">
				<p className="flex items-center space-x-2">
					📅 <span>{selectedTime?.ServiceBooking_Date}</span>
				</p>
				<p className="flex items-center space-x-2 mt-1">
					⏰
					<span>
						{selectedTime?.ServiceBooking_Time} (
						{selectedService?.Service_Duration} mins duration)
					</span>
				</p>
			</div>

			{/* Service & Price */}
			<div className="mt-4 border-t pt-4">
				<p className="text-gray-700 font-medium">
					{selectedService?.Service_Name}
				</p>

				<p className="font-semibold">${selectedService?.Service_Price}</p>
			</div>

			{/* Payment Info */}
			<div className="mt-4 border-t pt-4">
				<div className="flex justify-between text-gray-700">
					<span>Total</span>
					<span className="font-semibold">
						${selectedService?.Service_Price}
					</span>
				</div>
				<div className="flex justify-between mt-1 text-green-600 font-medium">
					<span>{selectedPaymentMethod?.name}</span>
					<span>${selectedService?.Service_Price}</span>
				</div>
				{/* <p className="text-gray-500 text-sm">Pay at venue from HK${100}</p> */}
			</div>

			{/* Confirm Button */}
			<button className="w-full bg-black text-white py-3 mt-4 rounded-md">
				Confirm
			</button>
		</div>
	);
};

export default BookingCart;
