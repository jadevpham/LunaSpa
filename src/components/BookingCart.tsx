import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { removeService, removeProduct } from "../redux/bookingSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const BookingCart: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
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

	const isServiceSelected = selectedService && selectedService.length > 0;
	const isTimeSelected = !!selectedTime;
	const isPaymentSelected = !!selectedPaymentMethod;
	const isProductSelected = selectedProducts && selectedProducts.length > 0;

	let buttonLabel = "Next";
	let handleClick = () => navigate("/book/select-time");
	const isNextEnabled =
		location.pathname === "/book/select-service"
			? isServiceSelected
			: location.pathname === "/book/select-time"
				? isServiceSelected && isTimeSelected
				: location.pathname === "/book/confirm"
					? isServiceSelected && isTimeSelected && isPaymentSelected
					: true;

	if (location.pathname === "/book/select-time") {
		buttonLabel = "Next";
		handleClick = () => navigate("/book/confirm");
	} else if (location.pathname === "/book/confirm") {
		buttonLabel = "Confirm";
		handleClick = () => {
			if (isServiceSelected && isTimeSelected && isPaymentSelected) {
				navigate("/review-booking");
				toast.success("Booking successful!");
			} else {
				toast.error("Booking failed!");
			}
		};
	}

	const handleRemoveService = (serviceId: string) => {
		dispatch(removeService(serviceId));
		toast.warn("Service removed successfully");
	};
	const handleRemoveProduct = (productId: string) => {
		dispatch(removeProduct(productId));
		toast.warn("Product removed successfully");
	};

	return (
		<div className="container p-6 rounded-xl bg-white shadow-2xl w-full h-[74vh] mx-auto sticky top-20 overflow-hidden">
			<div className="h-full flex flex-col">
				{/* Shop Info */}
				<div className="flex items-start bg-gray-100 p-4 rounded-lg w-full">
					<img
						src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
						alt="Shop"
						className="w-16 h-24 rounded-md object-cover"
					/>
					<div className="ml-4">
						<h3 className="font-bold text-lg">The Luxury Salon & Spa</h3>
						<p className="text-yellow-500">⭐⭐⭐⭐⭐ (4.8)</p>
						<p className="text-gray-500 text-sm">
							123 Beauty Street, District 1, HCMC
						</p>
					</div>
				</div>
				{/* Scrollable Content */}
				<div className="flex-1 overflow-auto p-4 hide-scrollbar">
					{/* Booking Details */}
					{selectedTime && (
						<div className="mt-4 text-gray-700">
							<p className="flex items-center space-x-2">
								<i className="fa-regular fa-calendar"></i>
								<span>{selectedTime.ServiceBooking_Date}</span>
							</p>
							<p className="flex items-center space-x-2 mt-1">
								<i className="fa-regular fa-clock"></i>
								<span>{selectedTime.ServiceBooking_Time}</span>
							</p>
						</div>
					)}
					<hr className="w-full my-2 border-gray-200" />

					<div className="">
						{/* Service & Price */}
						{isServiceSelected && selectedService ? (
							<div className="mt-4  pt-4">
								{selectedService.map((service) => (
									<div key={service.Service_ID} className="mb-2">
										<p className="text-gray-700 font-bold flex">
											{service.Service_Name}
											<span className="ml-auto">
												${service.Service_Price.toLocaleString("en-US")}
											</span>
										</p>
										<p className="text-3">{service.Service_Duration} mins</p>
										<button
											onClick={() => handleRemoveService(service.Service_ID)}
											className="text-red-500 text-xs"
										>
											Remove
										</button>
									</div>
								))}
							</div>
						) : (
							<span className="text-gray-500 flex justify-center">
								No services selected
							</span>
						)}
						{/* Product & Price */}
						<hr className="w-full my-2 border-gray-200" />
						{isProductSelected && selectedProducts ? (
							<div className="mt-4 pt-4">
								{selectedProducts.map((product) => (
									<div key={product.id} className="mb-2">
										<p className="text-gray-700 font-bold flex">
											{product.name}
											<span className="ml-auto">
												${product.price.toLocaleString("en-US")}
											</span>
										</p>
										<button
											onClick={() => handleRemoveProduct(product.id)}
											className="text-red-500 text-xs"
										>
											Remove
										</button>
									</div>
								))}
							</div>
						) : (
							<span className="text-gray-500 flex justify-center">
								No product selected
							</span>
						)}
					</div>
				</div>

				{/* Payment Info - Fixed at bottom */}
				<div className="mt-4 border-t pt-4 bg-white">
					<div className="flex justify-between text-gray-700">
						<span className="font-bold">Total</span>
						<span className="font-bold">
							${totalPrice.toLocaleString("en-US")}
						</span>
					</div>
					{selectedPaymentMethod && (
						<div className="flex justify-between mt-1 text-green-600 font-medium">
							<span>{selectedPaymentMethod?.name}</span>
							<span>${totalPrice.toLocaleString("en-US")}</span>
						</div>
					)}

					{/* Confirm Button */}
					<button
						className={`w-full py-3 mt-4 rounded-md text-white ${
							isNextEnabled
								? "bg-black transition-all duration-300 hover:bg-gray-800"
								: "bg-gray-400 cursor-not-allowed"
						}`}
						onClick={handleClick}
						disabled={!isNextEnabled}
					>
						{buttonLabel}
					</button>
				</div>
			</div>
		</div>
	);
};
export default BookingCart;
