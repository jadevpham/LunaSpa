import React, { useEffect } from "react";
import axiosInstance from "../../axios/axiosInstance";

const AppointmentPage = () => {
	const user = localStorage.getItem("user");
	const [incomingBooking, setIncomingBooking] = React.useState(null);
	const account_id = JSON.parse(user)._id;

	useEffect(() => {
		const fetchRecentOrder = async () => {
			try {
				const response = await axiosInstance.get(
					`/orders?customer_id=${account_id}&status=confirmed`,
				);

				// Map orders and parse created_at
				const orders = response.data.result.data.map((order) => ({
					...order,
					created_at: new Date(order.created_at),
				}));

				// Sort orders by created_at in descending order
				if (orders && orders.length > 0) {
					const recentOrder = orders.sort(
						(a, b) => b.created_at.getTime() - a.created_at.getTime(),
					)[0];

					// Update state
					if (recentOrder) {
						setIncomingBooking(recentOrder);
					}
				}
			} catch (error) {
				console.error("Error fetching recent order:", error);
			}
		};

		fetchRecentOrder();
	}, [account_id]);
	return (
		<div className="relative container mx-auto p-6">
			{/* Sticker/Banner */}
			<div className="absolute top-20 right-0">
				<svg
					width="150"
					height="150"
					viewBox="0 0 150 150"
					xmlns="http://www.w3.org/2000/svg"
					className="animate-bounce"
				>
					<path d="M0 0 L150 0 L150 100 Q100 150 0 100 Z" fill="#f56565" />
					<text
						x="50%"
						y="50%"
						textAnchor="middle"
						fill="white"
						fontSize="12"
						fontWeight="bold"
						dy=".3em"
					>
						Upcoming!
					</text>
				</svg>
			</div>

			<h1 className="text-3xl font-bold mb-6">Upcoming Appointment</h1>

			{/* Branch Information */}
			<div className="bg-red-50 border-l-4 border-red-400 rounded-lg shadow-md p-6 mb-6">
				<h2 className="text-xl font-semibold text-red-600 mb-4">
					Branch Information
				</h2>
				{incomingBooking?.branch?.name ? (
					<div className="grid grid-cols-2 gap-4">
						<div>
							<img
								src={incomingBooking.branch.images[0]}
								alt={incomingBooking.branch.name}
								className="w-52 h-52 object-cover rounded-lg"
							/>
						</div>
						<div>
							<p className="font-bold text-2xl text-red-700">
								{incomingBooking.branch.name}
							</p>
							<p className="text-gray-600">
								{incomingBooking.branch.contact.address}
							</p>
							<div className="flex items-center mt-2">
								<span className="text-yellow-400">★</span>
								<span className="ml-1">{incomingBooking.branch.rating}</span>
							</div>

							{/* Opening Hours */}
							<div className="mt-4">
								<h3 className="text-lg font-semibold text-red-600">
									Opening Hours
								</h3>
								<ul className="grid grid-cols-2 gap-4 text-gray-600">
									{incomingBooking.branch.opening_hours.map(
										(schedule, index) => (
											<li key={index} className="flex items-center">
												<span className="font-medium w-24">
													{schedule.day}:
												</span>
												<span>
													{schedule.open} - {schedule.close}
												</span>
											</li>
										),
									)}
								</ul>
							</div>
						</div>
					</div>
				) : (
					<p className="text-gray-500">Branch not selected</p>
				)}
			</div>

			{/* Selected Services */}
			<div className="bg-blue-50 border-l-4 border-blue-400 rounded-lg shadow-md p-6 mb-6">
				<h2 className="text-xl font-semibold text-blue-600 mb-4">
					Selected Services
				</h2>
				{incomingBooking?.selectedService &&
				incomingBooking.selectedService.length > 0 ? (
					<div className="space-y-4">
						{incomingBooking.selectedService.map((service) => (
							<div
								key={service._id}
								className="flex justify-between items-center border-b pb-4"
							>
								<div>
									<p className="font-medium text-blue-700">{service.name}</p>
									<p className="text-gray-600">{service.description}</p>
									<p className="text-sm text-gray-500">
										Duration: {service.selectedDuration.duration_in_minutes}{" "}
										minutes
									</p>
								</div>
								<p className="font-semibold text-blue-700">
									{service.selectedDuration.discount_price.toLocaleString()}đ
								</p>
							</div>
						))}
					</div>
				) : (
					<p className="text-gray-500">No services selected</p>
				)}
			</div>

			{/* Selected Products */}
			<div className="bg-green-50 border-l-4 border-green-400 rounded-lg shadow-md p-6 mb-6">
				<h2 className="text-xl font-semibold text-green-600 mb-4">
					Selected Products
				</h2>
				{incomingBooking?.items && incomingBooking.items.length > 0 ? (
					<div className="space-y-4">
						{incomingBooking.items.map((product) => (
							<div
								key={product._id}
								className="flex justify-between items-center border-b pb-4"
							>
								<div>
									<p className="font-medium text-green-700">
										{product.item_name}
									</p>
									<p className="text-gray-600">Type: {product.item_type}</p>
									<p className="text-sm text-gray-500">
										Quantity: {product.quantity}
									</p>
								</div>
								<div className="text-right">
									<p className="font-semibold text-green-700">
										{product.discount_price.toLocaleString()}đ
									</p>
									<p className="text-sm font-semibold text-green-700">
										Total:{" "}
										{(
											product.discount_price * product.quantity
										).toLocaleString()}
										đ
									</p>
								</div>
							</div>
						))}
					</div>
				) : (
					<p className="text-gray-500">No products selected</p>
				)}
			</div>

			{/* Booking Time */}
			<div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-lg shadow-md p-6 mb-6">
				<h2 className="text-xl font-semibold text-yellow-600 mb-4">
					Booking Time
				</h2>
				{incomingBooking?.selectedTime ? (
					<div>
						<p className="font-medium text-yellow-700">
							Date:{" "}
							{new Date(
								incomingBooking.selectedTime.ServiceBooking_Date,
							).toLocaleDateString("en-US")}
						</p>
						<p className="font-medium text-yellow-700">
							Time: {incomingBooking.selectedTime.ServiceBooking_Time}
						</p>
					</div>
				) : (
					<p className="text-gray-500">Time not selected</p>
				)}
			</div>

			{/* Payment Method */}
			<div className="bg-purple-50 border-l-4 border-purple-400 rounded-lg shadow-md p-6">
				<h2 className="text-xl font-semibold text-purple-600 mb-4">
					Payment Method
				</h2>
				{incomingBooking?.payment_method ? (
					<p className="font-medium text-purple-700">
						{incomingBooking.payment_method.toUpperCase()}
					</p>
				) : (
					<p className="text-gray-500">Payment method not selected</p>
				)}
			</div>
		</div>
	);
};

export default AppointmentPage;
