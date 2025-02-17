import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPaymentMethod } from "../redux/bookingSlice";
import { RootState } from "../redux/store";

const ConfirmPage = () => {
	// const location = useLocation();
	// const navigate = useNavigate();
	// const selectedService = location.state?.selectedService;
	// const selectedTime = location.state?.selectedTime;

	const dispatch = useDispatch();
	const paymentMethod = useSelector(
		(state: RootState) => state.booking.selectedPaymentMethod,
	);
	// useEffect(() => {
	// 	if (!selectedService || !selectedTime) {
	// 		navigate(-2);
	// 	}
	// }, [selectedService, selectedTime, navigate]);
	const handlePaymentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch(setPaymentMethod({ id: e.target.value, name: e.target.value }));
	};

	return (
		<div className="p-5 space-y-6">
			<h2 className="text-4xl font-bold">Review and Confirm</h2>

			{/* Phương thức thanh toán */}
			<div className="bg-gray-100 p-4 rounded-lg">
				<h3 className="font-semibold text-lg mb-2">Payment Method</h3>
				<select
					className="w-full p-2 border rounded"
					value={paymentMethod?.id || ""}
					onChange={handlePaymentChange}
				>
					<option value="VNPay">VNPay</option>
					<option value="Momo">Momo</option>
					<option value="Cash">Cash on Arrival</option>
				</select>
			</div>

			<div className="bg-gray-100 p-4 rounded-lg">
				<h3 className="font-semibold text-lg mb-2">Discount Code</h3>
				<input
					type="text"
					placeholder="Enter your discount code"
					className="w-full p-2 border rounded"
				/>
			</div>

			<div className="bg-gray-100 p-4 rounded-lg">
				<h3 className="font-semibold text-lg mb-2">Booking Notes</h3>
				<textarea
					placeholder="Add any notes for your booking..."
					className="w-full p-2 border rounded h-20 resize-none"
				></textarea>
			</div>
		</div>
	);
};
export default ConfirmPage;
