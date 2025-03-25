import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPaymentMethod } from "../redux/bookingSlice";
import { RootState } from "../redux/store";
import { toast } from "react-toastify";

const ConfirmBookingPage = () => {
	const dispatch = useDispatch();
	const paymentMethod = useSelector(
		(state: RootState) => state.booking.selectedPaymentMethod,
	);
	const [discountCode, setDiscountCode] = useState("");

	const handlePaymentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch(setPaymentMethod({ _id: e.target.value, name: e.target.value }));
		toast.info(`Payment method changed to ${e.target.value}`);
	};

	const handleDiscountApply = () => {
		const validCodes = ["DISCOUNT10", "SAVE20"];
		if (validCodes.includes(discountCode)) {
			toast.success("Discount code applied successfully!");
		} else {
			toast.error("Invalid discount code.");
		}
	};

	return (
		<div className="container mx-auto shadow-xl p-8 rounded-2xl bg-white">
			<h2 className="text-5xl font-bold mb-6">Review and Confirm</h2>

			{/* payment method */}
			<div className="bg-gray-100 p-6 rounded-lg mb-4">
				<h3 className="font-semibold text-lg mb-2">Payment Method</h3>
				<select
					className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					value={paymentMethod?._id || ""}
					onChange={handlePaymentChange}
				>
					<option value="" disabled>
						Select your payment method
					</option>
					<option value="Bank">Bank</option>
					<option value="Cash">Cash on Arrival</option>
				</select>
			</div>

			<div className="bg-gray-100 p-6 rounded-lg mb-4">
				<h3 className="font-semibold text-lg mb-2">Discount Code</h3>
				<div className="flex">
					<input
						type="text"
						placeholder="Enter your discount code"
						className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						value={discountCode}
						onChange={(e) => setDiscountCode(e.target.value)}
					/>
					<button
						className="ml-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
						onClick={handleDiscountApply}
					>
						Apply
					</button>
				</div>
			</div>

			<div className="bg-gray-100 p-6 rounded-lg">
				<h3 className="font-semibold text-lg mb-2">Booking Notes</h3>
				<textarea
					placeholder="Add any notes for your booking..."
					className="w-full p-3 border rounded-lg h-20 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
				></textarea>
			</div>
		</div>
	);
};
export default ConfirmBookingPage;
