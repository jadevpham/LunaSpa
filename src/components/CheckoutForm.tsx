import {
	PaymentElement,
	useElements,
	useStripe,
} from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios/axiosInstance";

// Define the props type for CheckoutForm
interface CheckoutFormProps {
	orderId: string;
	clientSecret: string;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
	orderId,
	clientSecret,
}) => {
	const stripe = useStripe();
	const elements = useElements();
	const navigate = useNavigate();

	const [message, setMessage] = useState<string | null>(null);
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
					setMessage("Payment completed successfully!");
					// Handle order status update after successful payment
					confirmPaymentSuccess(paymentIntent.id, paymentIntent.payment_method);
					break;
				case "processing":
					setMessage("Your payment is being processed.");
					break;
				case "requires_payment_method":
					setMessage('Please enter your card information and click "Pay Now"');
					break;
				default:
					setMessage("An error occurred.");
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
			const response = await axios.post(
				`http://localhost:4000/orders/${orderId}/payment/confirm`,
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
				setMessage("Payment successful! Redirecting...");
				// Redirect to order status page
				setTimeout(() => {
					navigate(`/order/status/${orderId}`);
				}, 3000); // Increase time to 3 seconds
			} else {
				console.error("Response error:", response.data);
				setMessage("Order update failed. Please contact support.");
			}
		} catch (error) {
			console.error(
				"Error confirming payment:",
				error.response?.data || error.message,
			);
			setMessage(
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
		const { error, paymentIntent } = await stripe.confirmPayment({
			elements,
			redirect: "if_required",
			confirmParams: {
				payment_method_data: {
					billing_details: {
						name: "Customer Luna Spa",
					},
					save_payment_method: saveCard,
				},
			},
		});

		if (error) {
			if (error.type === "card_error" || error.type === "validation_error") {
				setMessage(error.message);
			} else {
				setMessage("An unexpected error occurred");
			}
		} else if (paymentIntent && paymentIntent.status === "succeeded") {
			setMessage("Payment successful! Updating order...");
			// Call function to update order
			await confirmPaymentSuccess(
				paymentIntent.id,
				paymentIntent.payment_method,
			);
		}

		setIsProcessing(false);
	};

	const handleSaveCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSaveCard(e.target.checked);
	};

	return (
		<form className="checkout-form" onSubmit={handleSubmit}>
			<div className="form-header">
				<h3>Card Information</h3>
				<p>Please enter your card information</p>
			</div>

			<div className="payment-element-container">
				<PaymentElement />
			</div>

			{message && (
				<div
					className={`payment-message ${message.includes("successful") ? "success" : message.includes("processing") ? "processing" : "error"}`}
				>
					{message}
				</div>
			)}

			<div className="save-card-option">
				<input
					type="checkbox"
					id="save-card"
					checked={saveCard}
					onChange={handleSaveCardChange}
				/>
				<label htmlFor="save-card">
					Save this card information for next time
				</label>
			</div>

			<button
				className="pay-button"
				disabled={isProcessing || !stripe || !elements}
			>
				{isProcessing ? (
					<span className="button-text">
						<div className="spinner"></div>
						Processing...
					</span>
				) : (
					`Pay Now`
				)}
			</button>
		</form>
	);
};

export default CheckoutForm;
