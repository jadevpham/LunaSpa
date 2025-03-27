import {
	PaymentElement,
	useElements,
	useStripe,
} from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios/axiosInstance";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
// Define the props type for CheckoutForm
interface CheckoutFormProps {
	orderId: string;
	clientSecret: string;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
	orderId,
	clientSecret,
}) => {
	const { t } = useTranslation();
	const stripe = useStripe();
	const elements = useElements();
	const navigate = useNavigate();

	const [isProcessing, setIsProcessing] = useState<boolean>(false);
	const [saveCard, setSaveCard] = useState<boolean>(false);

	useEffect(() => {
		if (!stripe || !clientSecret) {
			return;
		}

		// Check payment intent status
		stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
			console.log("Payment Intent Status:", paymentIntent.status);
			switch (paymentIntent.status) {
				case "succeeded":
					toast.success("Payment completed successfully!");
					// Handle order status update after successful payment
					if (typeof paymentIntent.payment_method === "string") {
						confirmPaymentSuccess(
							paymentIntent.id,
							paymentIntent.payment_method,
						);
					} else {
						console.error(
							"Payment method is not a string:",
							paymentIntent.payment_method,
						);
						toast.error("Invalid payment method. Please try again.");
					}
					break;
				case "processing":
					toast.info("Your payment is being processed.");
					break;
				case "requires_payment_method":
					toast.warn('Please enter your card information and click "Pay Now"');
					break;
				default:
					toast.error("An error occurred.");
					break;
			}
		});
	}, [stripe, clientSecret]);

	// Confirm payment when payment is successful
	const confirmPaymentSuccess = async (
		paymentIntentId: string,
		paymentMethodId: string,
	) => {
		try {
			console.log("Confirming payment with:", {
				paymentIntentId,
				paymentMethodId,
				orderId,
			});
			const response = await axiosInstance.post(
				`/orders/${orderId}/payment/confirm`,
				{
					payment_intent_id: paymentIntentId,
					payment_method_id: paymentMethodId,
					payment_method: "stripe",
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("access_token")}`,
					},
				},
			);

			console.log("Payment confirmation result:", response.data);

			if (response.data && response.data.result) {
				toast.success("Payment successful! Redirecting...");
				// Redirect to order status page
				setTimeout(() => {
					navigate(`/order-detail/${orderId}`);
				}, 3000); // Increase time to 3 seconds
			} else {
				console.error("Response error:", response.data);
				toast.error("Order update failed. Please contact support.");
			}
		} catch (error) {
			console.error(
				"Error confirming payment:",
				error.response?.data || error.message,
			);
			toast.error(
				"Payment succeeded but order update failed. Please contact support.",
			);
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!stripe || !elements) {
			return;
		}

		setIsProcessing(true);

		// Confirm payment
		const { error } = await stripe.confirmPayment({
			elements,
			redirect: "always",
			confirmParams: {
				return_url: `${window.location.origin}/payment-success`, // Add a valid return URL
				payment_method_data: {
					billing_details: {
						name: "Customer Luna Spa",
					},
					// save_payment_method: saveCard, // Removed as it's not a valid property
				},
			},
		});

		// Retrieve the payment intent status separately
		const paymentIntent = await stripe.retrievePaymentIntent(clientSecret);

		if (error) {
			if (error.type === "card_error" || error.type === "validation_error") {
				toast.error(error.message);
			} else {
				toast.error("An unexpected error occurred");
			}
		} else if (
			paymentIntent?.paymentIntent &&
			paymentIntent.paymentIntent.status === "succeeded"
		) {
			toast.success("Payment successful! Updating order...");
			// Call function to update order
			await confirmPaymentSuccess(
				paymentIntent.paymentIntent?.id,
				paymentIntent.paymentIntent?.payment_method as string,
			);
		}

		setIsProcessing(false);
	};

	const handleSaveCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSaveCard(e.target.checked);
	};

	return (
		<form
			className="p-5 md:p-6 bg-white rounded-xl shadow-xl h-full  flex justify-center flex-col"
			onSubmit={handleSubmit}
		>
			<div className="mb-6">
				<h3 className="text-[#32325d] mb-2">{t("Card Information")}</h3>
				<p className="text-[#6b7c93] mt-0">
					{t("Please enter your card information")}
				</p>
			</div>

			<div className="mb-5">
				<PaymentElement />
			</div>

			<div className="my-5 flex items-center">
				<input
					type="checkbox"
					id="save-card"
					checked={saveCard}
					onChange={handleSaveCardChange}
					className="mr-2"
				/>
				<label htmlFor="save-card" className="text-[#32325d] cursor-pointer">
					{t("Save this card information for next time")}
				</label>
			</div>

			<button
				className="bg-[#6772e5] text-white py-3 px-4 rounded font-semibold cursor-pointer transition-all duration-200 ease-in-out w-full text-center text-lg"
				disabled={isProcessing || !stripe || !elements}
			>
				{isProcessing ? (
					<span className="flex items-center justify-center">
						<div className="mr-2 w-5 h-5 border-3 border-white border-opacity-30 rounded-full border-t-white animate-spin"></div>
						{t("Processing...")}
					</span>
				) : (
					`Pay Now`
				)}
			</button>
		</form>
	);
};

export default CheckoutForm;
