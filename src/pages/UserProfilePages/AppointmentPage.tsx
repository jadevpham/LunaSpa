import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useTranslation } from "react-i18next";
const AppointmentPage = () => {
	const { t } = useTranslation();
	const booking = useSelector((state: RootState) => state.booking);

	return (
		<div className="container mx-auto p-6">
			<h1 className="text-3xl font-bold mb-6">{t("Appointment Details")}</h1>

			{/* Branch Information */}
			<div className="bg-white rounded-lg shadow-md p-6 mb-6">
				<h2 className="text-xl font-semibold mb-4">{t("Branch Information")}</h2>
				{booking.selectedBranch ? (
					<div className="grid grid-cols-2 gap-4">
						<div>
							<img
								src={booking.selectedBranch.img}
								alt={booking.selectedBranch.name}
								className="w-full h-48 object-cover rounded-lg"
							/>
						</div>
						<div>
							<p className="font-medium">{booking.selectedBranch.name}</p>
							<p className="text-gray-600">{booking.selectedBranch.address}</p>
							<div className="flex items-center mt-2">
								<span className="text-yellow-400">★</span>
								<span className="ml-1">{booking.selectedBranch.star}</span>
								<span className="ml-2 text-gray-500">
									({booking.selectedBranch.vote} {t("reviews")})
								</span>
							</div>
						</div>
					</div>
				) : (
					<p className="text-gray-500">{t("Branch not selected")}</p>
				)}
			</div>

			{/* Selected Services */}
			<div className="bg-white rounded-lg shadow-md p-6 mb-6">
				<h2 className="text-xl font-semibold mb-4">{t("Selected Services")}</h2>
				{booking.selectedService && booking.selectedService.length > 0 ? (
					<div className="space-y-4">
						{booking.selectedService.map((service) => (
							<div
								key={service._id}
								className="flex justify-between items-center border-b pb-4"
							>
								<div>
									<p className="font-medium">{service.name}</p>
									<p className="text-gray-600">{service.description}</p>
									<p className="text-sm text-gray-500">
										{t("Duration:")} {service.selectedDuration.duration_in_minutes}{" "}
										{t("minutes")}
									</p>
								</div>
								<p className="font-semibold">
									{service.selectedDuration.discount_price.toLocaleString()}đ
								</p>
							</div>
						))}
					</div>
				) : (
					<p className="text-gray-500">{t("No services selected")}</p>
				)}
			</div>

			{/* Booking Time */}
			<div className="bg-white rounded-lg shadow-md p-6 mb-6">
				<h2 className="text-xl font-semibold mb-4">{t("Booking Time")}</h2>
				{booking.selectedTime ? (
					<div>
						<p className="font-medium">
							{t("Date:")}{" "}
							{new Date(
								booking.selectedTime.ServiceBooking_Date,
							).toLocaleDateString("en-US")}
						</p>
						<p className="font-medium">
							{t("Time:")} {booking.selectedTime.ServiceBooking_Time}
						</p>
					</div>
				) : (
					<p className="text-gray-500">{t("Time not selected")}</p>
				)}
			</div>

			{/* Payment Method */}
			<div className="bg-white rounded-lg shadow-md p-6">
				<h2 className="text-xl font-semibold mb-4">{t("Payment Method")}</h2>
				{booking.selectedPaymentMethod ? (
					<p className="font-medium">{booking.selectedPaymentMethod.name}</p>
				) : (
					<p className="text-gray-500">{t("Payment method not selected")}</p>
				)}
			</div>
		</div>
	);
};

export default AppointmentPage;
