import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";

const BookingReviewPage: React.FC = () => {
	const navigate = useNavigate();
	const {
		selectedBranch,
		selectedService,
		selectedTime,
		selectedPaymentMethod,
		selectedProducts,
	} = useSelector((state: RootState) => state.booking);

	const totalServicePrice =
		selectedService?.reduce(
			(total, service) => total + service.Service_Price,
			0,
		) ?? 0;

	const totalProductPrice =
		selectedProducts?.reduce((total, product) => total + product.price, 0) ?? 0;

	const totalPrice = totalServicePrice + totalProductPrice;

	return (
		<div className="container p-8 rounded-2xl bg-white shadow-xl w-full max-w-2xl mx-auto overflow-hidden">
			<h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
				Booking Review
			</h2>

			{/* Branch Info */}
			<div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
				<img
					src={
						selectedBranch?.img ||
						"https://flowertalk.vn/wp-content/uploads/2021/10/y-nghia-hoa-cam-tu-cau-1.jpg"
					}
					alt={selectedBranch?.name}
					className="w-full h-40 object-cover rounded-md mb-4"
				/>
				<h3 className="font-bold text-xl text-gray-900">
					{selectedBranch?.name}
				</h3>
				<p className="text-gray-600">{selectedBranch?.address}</p>
				<p className="text-gray-700">Category: {selectedBranch?.category}</p>
				<p className="text-gray-700">
					⭐ {selectedBranch?.star} ({selectedBranch?.vote} votes)
				</p>
			</div>

			{/* Booking Details */}
			<div className="bg-white p-6 rounded-lg shadow-md mb-6">
				<p className="text-gray-700">
					<strong>Date:</strong> {selectedTime?.ServiceBooking_Date}
				</p>
				<p className="text-gray-700">
					<strong>Time:</strong> {selectedTime?.ServiceBooking_Time}
				</p>
			</div>

			{/* Services */}
			<div className="bg-white p-6 rounded-lg shadow-md mb-6">
				<h3 className="font-bold text-xl text-gray-900 mb-3">Services</h3>
				{selectedService?.map((service) => (
					<div
						key={service.Service_ID}
						className="mb-4 border-b pb-2 border-gray-200"
					>
						<p className="text-gray-800 font-semibold flex justify-between">
							{service.Service_Name}
							<span className="text-gray-700">
								${service.Service_Price.toLocaleString("en-US")}
							</span>
						</p>
						<p className="text-sm text-gray-600">
							Duration: {service.Service_Duration} mins
						</p>
					</div>
				))}
			</div>

			{/* Products */}
			<div className="bg-white p-6 rounded-lg shadow-md mb-6">
				<h3 className="font-bold text-xl text-gray-900 mb-3">Products</h3>
				{selectedProducts?.map((product) => (
					<div key={product.id} className="mb-4 border-b pb-2 border-gray-200">
						<p className="text-gray-800 font-semibold flex justify-between">
							{product.name}
							<span className="text-gray-700">
								${product.price.toLocaleString("en-US")}
							</span>
						</p>
					</div>
				))}
			</div>

			{/* Payment Info */}
			<div className="bg-white p-6 rounded-lg shadow-md mb-6">
				<h3 className="font-bold text-xl text-gray-900 mb-3">Payment Method</h3>
				<p className="text-green-600 font-medium">
					{selectedPaymentMethod?.name}
				</p>
				<div className="flex justify-between text-gray-800 font-semibold text-lg mt-4">
					<span>Total</span>
					<span>${totalPrice.toLocaleString("en-US")}</span>
				</div>
			</div>

			<div className="flex justify-center">
				<button
					onClick={() => navigate("/")}
					className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
				>
					Home
				</button>
			</div>
		</div>
	);
};

export default BookingReviewPage;
