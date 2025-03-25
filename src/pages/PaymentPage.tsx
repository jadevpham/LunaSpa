import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import axiosInstance from "../axios/axiosInstance";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PaymentPage: React.FC = () => {
	const [clientSecret, setClientSecret] = useState<string>("");
	const [orderId, setOrderId] = useState<string>("");
	const [orderCreated, setOrderCreated] = useState(false);

	const { selectedBranch, selectedService, selectedTime, selectedProducts } =
		useSelector((state: RootState) => state.booking);

	// Tính tổng giá dịch vụ bằng useMemo
	const totalServicePrice = useMemo(() => {
		return (
			selectedService?.reduce(
				(total, service) => total + service.selectedDuration.discount_price,
				0,
			) ?? 0
		);
	}, [selectedService]);

	// Tính tổng giá sản phẩm bằng useMemo
	const totalProductPrice = useMemo(() => {
		return (
			selectedProducts?.reduce(
				(total, product) => total + product.discount_price * product.quantity,
				0,
			) ?? 0
		);
	}, [selectedProducts]);

	// Tổng giá trị cần thanh toán
	const totalPrice = useMemo(
		() => totalServicePrice + totalProductPrice,
		[totalServicePrice, totalProductPrice],
	);

	// Tạo danh sách sản phẩm để gửi API
	const items = useMemo(() => {
		return (
			selectedProducts?.map((product) => ({
				item_id: product._id,
				item_type: "product",
				quantity: product.quantity,
			})) ?? []
		);
	}, [selectedProducts]);

	useEffect(() => {
		if (orderCreated || !items.length || clientSecret) return; // Ngăn gọi API nếu đã có clientSecret

		const createOrder = async () => {
			try {
				// 1. Get product information from API
				// if (!selectedProducts || selectedProducts.length === 0) return;

				// const productIds = selectedProducts.map((p) => p._id); // Get list of IDs
				// const productResponse = await axiosInstance.post("/products/check", {
				// 	productIds,
				// });
				// if (!productResponse.data || !productResponse.data.result) {
				// 	setError("Product not found");
				// 	setLoading(false);
				// 	return;
				// }

				// const productData = productResponse.data.result;
				// setUpdatedProducts(productData);

				const orderResponse = await axiosInstance.post("/orders/products", {
					branch_id: selectedBranch?._id,
					items,
					payment_method: "stripe",
					note: "Order for products via Stripe",
				});

				if (orderResponse.data?.result) {
					const orderId = orderResponse.data.result.order._id;
					setOrderId(orderId);

					const paymentResponse = await axiosInstance.post(
						`/orders/${orderId}/payment`,
						{ payment_method: "stripe" },
					);

					if (paymentResponse.data?.result) {
						setClientSecret(paymentResponse.data.result.client_secret);
					}

					setOrderCreated(true);
					return;
				}
			} catch (err) {
				console.error("Error during processing:", err);
			}
		};

		createOrder();
	}, [orderCreated, selectedBranch, items, clientSecret]);

	const appearance = {
		theme: "stripe",
		variables: {
			colorPrimary: "#6772e5",
			colorBackground: "#ffffff",
			colorText: "#32325d",
			colorDanger: "#df1b41",
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			borderRadius: "4px",
		},
	};

	const options = useMemo(
		() => ({
			clientSecret,
			appearance,
		}),
		[clientSecret],
	);

	return (
		<div className="p-6 bg-gray-100">
			<h1 className="text-3xl font-bold mb-6 text-center">Booking Review</h1>

			<div className="mb-6 p-4 border rounded-lg shadow-lg bg-white">
				<h2 className="text-2xl font-semibold mb-2">Branch Information</h2>
				{selectedBranch ? (
					<div>
						<p className="text-lg">Name: {selectedBranch.name}</p>
						<p>Address: {selectedBranch.address}</p>
					</div>
				) : (
					<p>No branch selected.</p>
				)}
			</div>

			<div className="mb-6 p-4 border rounded-lg shadow-lg bg-white">
				<h2 className="text-2xl font-semibold mb-2">Date and Time</h2>
				{selectedTime ? (
					<div>
						<p>Date: {selectedTime.ServiceBooking_Date}</p>
						<p>Time: {selectedTime.ServiceBooking_Time}</p>
					</div>
				) : (
					<p>No time selected.</p>
				)}
			</div>

			<div className="mb-6 p-4 border rounded-lg shadow-lg bg-white">
				<h2 className="text-2xl font-semibold mb-2">Selected Services</h2>
				{selectedService && selectedService.length > 0 ? (
					selectedService.map((service) => (
						<div key={service._id} className="mb-2 border-b pb-2">
							<p className="text-lg">Name: {service.name}</p>
							<p>Price: {service.selectedDuration.discount_price}</p>
						</div>
					))
				) : (
					<p>No services selected.</p>
				)}
			</div>

			<div className="mb-6 p-4 border rounded-lg shadow-lg bg-white">
				<h2 className="text-2xl font-semibold mb-2">Selected Products</h2>
				{selectedProducts && selectedProducts.length > 0 ? (
					selectedProducts.map((product) => (
						<div key={product._id} className="mb-2 border-b pb-2">
							<p className="text-lg">Name: {product.name}</p>
							<p>Price: {product.discount_price}</p>
							<p>Quantity: {product.quantity}</p>
						</div>
					))
				) : (
					<p>No products selected.</p>
				)}
			</div>

			<h2 className="text-2xl font-bold mt-4 text-center">
				Total Price: {totalPrice}
			</h2>
			{clientSecret && (
				<Elements stripe={stripePromise} options={options}>
					<CheckoutForm orderId={orderId} clientSecret={clientSecret} />
				</Elements>
			)}
		</div>
	);
};

export default PaymentPage;
