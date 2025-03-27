import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { removeService, removeProduct } from "../redux/bookingSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";

const BookingCart: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);
	const {
		selectedService,
		selectedTime,
		selectedPaymentMethod,
		selectedProducts,
	} = useSelector((state: RootState) => state.booking);

	const totalServicePrice =
		selectedService?.reduce(
			(total, service) => total + service.selectedDuration.discount_price,
			0,
		) ?? 0;

	const totalProductPrice =
		selectedProducts?.reduce(
			(total, product) => total + product.discount_price * product.quantity,
			0,
		) ?? 0;

	const totalPrice = totalServicePrice + totalProductPrice;

	const isServiceSelected = selectedService && selectedService.length > 0;
	const isTimeSelected = !!selectedTime;
	const isPaymentSelected = !!selectedPaymentMethod;
	const isProductSelected = selectedProducts && selectedProducts.length > 0;

	let buttonLabel = "Next";
	let handleClick = async () => {
		setIsLoading(true);
		await new Promise((resolve) => setTimeout(resolve, 1000));
		navigate("/book/select-time");
		setIsLoading(false);
	};

	const isNextEnabled =
		location.pathname === "/book/select-service"
			? isProductSelected
			: location.pathname === "/book/select-time"
				? isProductSelected && isTimeSelected
				: location.pathname === "/book/confirm"
					? isProductSelected && isTimeSelected && isPaymentSelected
					: true;

	if (location.pathname === "/book/select-time") {
		buttonLabel = "Next";
		handleClick = async () => {
			setIsLoading(true);
			await new Promise((resolve) => setTimeout(resolve, 1000));
			navigate("/book/confirm");
			setIsLoading(false);
		};
	} else if (location.pathname === "/book/confirm") {
		buttonLabel = "Confirm Booking";
		handleClick = async () => {
			if (isProductSelected && isTimeSelected && isPaymentSelected) {
				setIsLoading(true);
				await new Promise((resolve) => setTimeout(resolve, 1000));
				if (selectedPaymentMethod.name === "Bank") {
					navigate("/payment");
					toast.success("Redirecting to payment page...");
				} else if (selectedPaymentMethod.name === "Cash") {
					navigate("/user-profile/booking-history");
					toast.success("Booking confirmed successfully!");
				}
				setIsLoading(false);
			} else {
				toast.error("Please complete all required fields!");
			}
		};
	}

	const handleRemoveService = (serviceId: string) => {
		dispatch(removeService(serviceId));
		toast.warn("Service removed from cart");
	};

	const handleRemoveProduct = (productId: string) => {
		dispatch(removeProduct(productId));
		toast.warn("Product removed from cart");
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="container p-6 rounded-xl bg-white shadow-xl w-fit h-[90vh] mx-auto sticky top-20 overflow-hidden"
		>
			<div className="h-full flex flex-col">
				{/* Shop Info */}
				<motion.div
					whileHover={{ scale: 1.02 }}
					className="flex items-start bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg w-full shadow-xl"
				>
					<div className="relative">
						<img
							src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
							alt="Shop"
							className="w-16 h-24 rounded-md object-cover shadow-md"
						/>
						<div className="absolute -bottom-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
							Open
						</div>
					</div>
					<div className="ml-4">
						<h3 className="font-bold text-lg bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
							The Luxury Salon & Spa
						</h3>
						<div className="flex items-center gap-1 text-yellow-500">
							⭐⭐⭐⭐⭐ <span className="text-gray-600 text-sm">(4.8)</span>
						</div>
						<p className="text-gray-500 text-sm flex items-center gap-1">
							<i className="fas fa-location-dot text-gray-400"></i>
							123 Beauty Street, District 1, HCMC
						</p>
					</div>
				</motion.div>

				{/* Scrollable Content */}
				<div className="flex-1 overflow-auto p-4 hide-scrollbar min-h-32">
					{/* Booking Details */}
					{selectedTime && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-100 shadow-md flex justify-center"
						>
							<div className="flex items-center gap-4">
								<div className="flex items-center space-x-2 text-gray-700">
									<i className="fa-regular fa-calendar text-blue-500"></i>
									<span className="font-medium">
										{format(
											new Date(selectedTime.ServiceBooking_Date),
											"MMMM dd, yyyy",
										)}
									</span>
								</div>
								<div className="flex items-center space-x-2 text-gray-700">
									<i className="fa-regular fa-clock text-green-500"></i>
									<span className="font-medium">
										{selectedTime.ServiceBooking_Time}
									</span>
								</div>
							</div>
						</motion.div>
					)}

					<div className="mt-6">
						{/* Services Section */}
						<h3 className="font-semibold text-gray-700 mb-3">
							Selected Services
						</h3>
						<AnimatePresence>
							{isServiceSelected && selectedService ? (
								<div className="space-y-3">
									{selectedService.map((service) => (
										<motion.div
											key={service._id}
											initial={{ opacity: 0, x: -20 }}
											animate={{ opacity: 1, x: 0 }}
											exit={{ opacity: 0, x: 20 }}
											className="p-3 bg-white rounded-lg border border-gray-100 shadow-sm"
										>
											<div className="flex justify-between items-start">
												<div>
													<p className="font-medium text-gray-800">
														{service.name}
													</p>
													<p className="text-sm text-gray-500">
														{service.selectedDuration.duration_in_minutes} mins
													</p>
												</div>
												<div className="text-right">
													<p className="font-bold text-gray-900">
														$
														{service.selectedDuration.discount_price.toLocaleString(
															"en-US",
														)}
													</p>
													<motion.button
														whileHover={{ scale: 1.05 }}
														whileTap={{ scale: 0.95 }}
														onClick={() => handleRemoveService(service._id)}
														className="text-red-500 text-xs mt-1 hover:text-red-600"
													>
														Remove
													</motion.button>
												</div>
											</div>
										</motion.div>
									))}
								</div>
							) : (
								<p className="text-gray-500 text-center py-4">
									No services selected
								</p>
							)}
						</AnimatePresence>

						{/* Products Section */}
						<h3 className="font-semibold text-gray-700 mt-6 mb-3">
							Selected Products
						</h3>
						<AnimatePresence>
							{isProductSelected && selectedProducts ? (
								<div className="space-y-3">
									{selectedProducts.map((product) => (
										<motion.div
											key={product._id}
											initial={{ opacity: 0, x: -20 }}
											animate={{ opacity: 1, x: 0 }}
											exit={{ opacity: 0, x: 20 }}
											className="p-3 bg-white rounded-lg border border-gray-100 shadow-sm"
										>
											<div className="flex justify-between items-start">
												<div>
													<p className="font-medium text-gray-800">
														{product.name.length > 20
															? `${product.name.substring(0, 20)}...`
															: product.name}
														<span className="ml-2 text-sm text-gray-500">
															x {product.quantity}
														</span>
													</p>
												</div>
												<div className="text-right">
													<p className="font-bold text-gray-900">
														${product.discount_price.toLocaleString("en-US")}
													</p>
													<motion.button
														whileHover={{ scale: 1.05 }}
														whileTap={{ scale: 0.95 }}
														onClick={() => handleRemoveProduct(product._id)}
														className="text-red-500 text-xs mt-1 hover:text-red-600"
													>
														Remove
													</motion.button>
												</div>
											</div>
										</motion.div>
									))}
								</div>
							) : (
								<p className="text-gray-500 text-center py-4">
									No products selected
								</p>
							)}
						</AnimatePresence>
					</div>
				</div>

				{/* Summary Section */}
				{(totalServicePrice > 0 || totalProductPrice > 0) && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="border-t pt-4 mt-4 space-y-2"
					>
						{totalServicePrice > 0 && (
							<div className="flex justify-between text-gray-600">
								<span>Services Total</span>
								<span>${totalServicePrice.toLocaleString("en-US")}</span>
							</div>
						)}
						{totalProductPrice > 0 && (
							<div className="flex justify-between text-gray-600">
								<span>Products Total</span>
								<span>${totalProductPrice.toLocaleString("en-US")}</span>
							</div>
						)}
					</motion.div>
				)}

				{/* Payment Info */}
				<div className="mt-4 pt-4 bg-white">
					<div className="flex justify-between text-gray-900 font-bold border-t pt-4">
						<span>Order Total</span>
						<span>${totalPrice.toLocaleString("en-US")}</span>
					</div>

					{selectedPaymentMethod && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							className="flex justify-between mt-2 text-green-600 font-medium bg-green-50 p-2 rounded-lg"
						>
							<span className="flex items-center gap-2">
								<i className="fas fa-check-circle"></i>
								{selectedPaymentMethod?.name}
							</span>
							<span>${totalPrice.toLocaleString("en-US")}</span>
						</motion.div>
					)}

					{/* Action Button */}
					<motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						className={`w-full py-4 mt-4 rounded-lg text-white font-medium transition-all duration-300 ${
							isNextEnabled
								? "bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600"
								: "bg-gray-400 cursor-not-allowed"
						}`}
						onClick={handleClick}
						disabled={!isNextEnabled || isLoading}
					>
						{isLoading ? (
							<div className="flex items-center justify-center gap-2">
								<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
								<span>Processing...</span>
							</div>
						) : (
							buttonLabel
						)}
					</motion.button>
				</div>
			</div>
		</motion.div>
	);
};

export default BookingCart;
