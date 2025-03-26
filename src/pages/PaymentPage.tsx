import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import axiosInstance from "../axios/axiosInstance";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const formatPrice = (price: number) => {
	return price
		.toLocaleString("en-US", { style: "currency", currency: "VND" })
		.replace("₫", "");
};

const PaymentPage: React.FC = () => {
	const [clientSecret, setClientSecret] = useState<string>("");
	const [orderId, setOrderId] = useState<string>("");
	const [orderCreated, setOrderCreated] = useState(false);

	const {
		selectedBranch,
		selectedService,
		selectedTime,
		selectedProducts,
		selectedPaymentMethod,
	} = useSelector((state: RootState) => state.booking);

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
					note: selectedPaymentMethod?.notes,
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
		<div className="p-6 bg-gray-100 flex justify-center gap-6">
			<div className="w-2/3 bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
				<h1 className="text-3xl font-bold mb-6 text-center">Booking Review</h1>

				<div className="mb-6 p-4 border rounded-lg w-full max-w-[800px] bg-white shadow-md flex flex-col items-start">
					<h2 className="text-2xl font-semibold mb-2 text-blue-600">
						Branch Information
					</h2>
					{selectedBranch && selectedTime ? (
						<div className="flex justify-between w-full">
							<div className="flex flex-col">
								<p className="text-lg font-medium">
									Name:
									<span className="font-normal">{selectedBranch?.name}</span>
								</p>
								<p className="text-lg font-medium">
									Address:
									<span className="font-normal">{selectedBranch?.address}</span>
								</p>
							</div>
							<div className="flex flex-col items-end">
								<p className="text-lg font-medium">
									Date:
									<span className="font-normal">
										{selectedTime?.ServiceBooking_Date}
									</span>
								</p>
								<p className="text-lg font-medium">
									Time:
									<span className="font-normal">
										{selectedTime?.ServiceBooking_Time}
									</span>
								</p>
							</div>
						</div>
					) : (
						<p className="text-red-500">No branch selected.</p>
					)}
				</div>

				<div className="mb-6 p-4 border rounded-lg w-full max-w-[800px] bg-white shadow-md flex flex-col items-start">
					<h2 className="text-2xl font-semibold mb-2 text-blue-600">
						Selected Services
					</h2>
					{selectedService && selectedService.length > 0 ? (
						selectedService.map((service) => (
							<div key={service._id} className="mb-2 border-b pb-2">
								<p className="text-lg font-medium">
									Name: <span className="font-normal">{service.name}</span>
								</p>
								<p className="text-lg font-medium">
									Price:{" "}
									<span className="font-normal">
										{formatPrice(service.selectedDuration.discount_price)} -{" "}
										{""}
										{service.selectedDuration.duration_in_minutes} minutes
									</span>
								</p>
							</div>
						))
					) : (
						<p className="text-red-500">No services selected.</p>
					)}
				</div>

				<div className="mb-6 p-4 border rounded-lg w-full max-w-[800px] bg-white shadow-md flex flex-col items-start">
					<h2 className="text-2xl font-semibold mb-2 text-blue-600">
						Selected Products
					</h2>

					{selectedProducts && selectedProducts.length > 0 ? (
						selectedProducts.map((product) => (
							<div key={product._id} className="mb-2 border-b pb-2 w-full">
								<div className="flex justify-between relative">
									<div className="">
										<p className="text-lg font-medium">
											Name: <span className="font-normal">{product.name}</span>
										</p>
										<p className="text-lg font-medium">
											Price:
											<span className="font-normal">
												{formatPrice(product.discount_price)}
											</span>
										</p>
										<p className="text-lg font-medium">
											Quantity:{" "}
											<span className="font-normal">{product.quantity}</span>
										</p>
									</div>
									<div className="flex justify-end">
										<p className="text-lg font-medium absolute right-0 bottom-0">
											Total Price:
											<span className="font-normal">
												{formatPrice(product.discount_price * product.quantity)}
											</span>
										</p>
									</div>
								</div>
							</div>
						))
					) : (
						<p className="text-red-500">No products selected.</p>
					)}
				</div>

				<h2 className="text-2xl font-bold mt-4 text-right w-full absolute bottom-6 right-6 text-green-500">
					Total Price: {formatPrice(totalPrice)}
				</h2>
			</div>
			<div className="w-1/3">
				{clientSecret && (
					<Elements stripe={stripePromise} options={options}>
						<CheckoutForm orderId={orderId} clientSecret={clientSecret} />
					</Elements>
				)}
			</div>
		</div>
	);
};

export default PaymentPage;
