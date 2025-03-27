import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPaymentMethod } from "../redux/bookingSlice";
import { RootState } from "../redux/store";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const ConfirmBookingPage = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const paymentMethod = useSelector(
		(state: RootState) => state.booking.selectedPaymentMethod,
	);
	const selectedTime = useSelector(
		(state: RootState) => state.booking.selectedTime,
	);
	const selectedService = useSelector(
		(state: RootState) => state.booking.selectedService,
	);
	const [bookingNotes, setBookingNotes] = useState("");
	const [method, setMethod] = useState("");
	if (!selectedService) {
		navigate("/book/service");
		return null;
	}

	if (!selectedTime) {
		navigate("/book/select-time");
		return null;
	}

	const handlePaymentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedMethod = e.target.value;
		setMethod(selectedMethod);
		dispatch(
			setPaymentMethod({
				_id: selectedMethod,
				name: selectedMethod,
				notes: bookingNotes,
			}),
		);
		toast.info(`Payment method changed to ${selectedMethod}`);
	};

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setBookingNotes(e.target.value);
		dispatch(
			setPaymentMethod({
				_id: method,
				name: method,
				notes: bookingNotes,
			}),
		);
	};
	// const handleDiscountApply = () => {
	// 	const validCodes = ["DISCOUNT10", "SAVE20"];
	// 	if (validCodes.includes(discountCode)) {
	// 		toast.success("Discount code applied successfully!");
	// 	} else {
	// 		toast.error("Invalid discount code.");
	// 	}
	// };

	return (
		<div className="container mx-auto shadow-xl p-8 rounded-2xl bg-white">
			<h2 className="text-5xl font-bold mb-6">{t("Review and Confirm")}</h2>

			{/* payment method */}
			<div className="bg-gray-100 p-6 rounded-lg mb-4">
				<h3 className="font-semibold text-lg mb-2">{t("Payment Method")}</h3>
				<select
					className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					value={paymentMethod?._id || ""}
					onChange={handlePaymentChange}
				>
					<option value="" disabled>
						{t("Select your payment method")}
					</option>
					<option value="Bank">{t("Bank")}</option>
					<option value="Cash">{t("Cash on Arrival")}</option>
				</select>
			</div>

			{/* <div className="bg-gray-100 p-6 rounded-lg mb-4">
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
			</div> */}

			<div className="bg-gray-100 p-6 rounded-lg">
				<h3 className="font-semibold text-lg mb-2">{t("Booking Notes")}</h3>
				<textarea
					placeholder="Add any notes for your booking..."
					className="w-full p-3 border rounded-lg h-20 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
					value={bookingNotes}
					onChange={(e) => handleInputChange(e)}
				></textarea>
			</div>
		</div>
	);
};
export default ConfirmBookingPage;
