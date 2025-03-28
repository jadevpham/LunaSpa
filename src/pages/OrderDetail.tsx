import React, { useEffect, useState } from "react";
import axiosInstance from "../axios/axiosInstance";
import { useParams, useLocation, useNavigate } from "react-router-dom";
// Define the interface for the order data
interface Order {
	customer: {
		name: string;
		email: string;
		phone_number: string;
	};
	branch: {
		contact: {
			address: string;
		};
	};
	status: string;
	total_price: number;
	final_price: number;
	items: Array<{
		_id: string;
		item_name: string;
		quantity: number;
		price: number;
	}>;
	transaction: {
		currency: string;
	};
}

// Utility function to format price
const formatPrice = (
	price: number | undefined,
	currency: string | undefined,
) => {
	if (price === undefined) return "N/A"; // Handle undefined price
	return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ${currency ? currency.toUpperCase() : "N/A"}`; // Convert currency to uppercase or return "N/A"
};

const OrderDetail = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const params = useParams();
	const orderId = params.orderId;
	console.log(orderId);
	const [order, setOrder] = useState<Order | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const fromUserProfile = location.state?.from === "user-profile";
	useEffect(() => {
		const fetchOrder = async () => {
			try {
				const response = await axiosInstance.get(`/orders/${orderId}`);
				setOrder(response.data.result);
			} catch (err) {
				console.error(err); // Log the error for debugging
				setError("Error fetching order. Please try again later.");
			} finally {
				setLoading(false);
			}
		};

		fetchOrder();
	}, []);

	if (loading) {
		return <div className="text-center">Loading...</div>;
	}

	if (error) {
		return <div className="text-center text-red-500">{error}</div>;
	}

	return (
		<div className="container mx-auto p-6">
			<div className="mb-4">
				{fromUserProfile ? (
					<button
						onClick={() => navigate(-1)}
						className="flex items-center text-blue-600 hover:underline"
					>
						← Back to Profile
					</button>
				) : (
					""
				)}
			</div>
			<h1 className="text-4xl font-bold mb-6 text-center">Order Details</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="bg-white shadow-lg rounded-lg p-6">
					<h2 className="text-2xl font-semibold mb-4">Customer Information</h2>
					<p className="flex items-center mb-2">
						<i className="fas fa-user mr-2 text-gray-600"></i>
						<strong className="mr-2">Name:</strong> {order?.customer.name}
					</p>
					<p className="flex items-center mb-2">
						<i className="fas fa-envelope mr-2 text-gray-600"></i>
						<strong className="mr-2">Email:</strong> {order?.customer.email}
					</p>
					<p className="flex items-center mb-2">
						<i className="fas fa-phone mr-2 text-gray-600"></i>
						<strong className="mr-2">Phone Number:</strong>{" "}
						{order?.customer.phone_number}
					</p>
					<p className="flex items-center mb-4">
						<i className="fas fa-map-marker-alt mr-2 text-gray-600"></i>
						<strong className="mr-2">Address:</strong>{" "}
						{order?.branch.contact.address}
					</p>
				</div>

				<div className="bg-white shadow-lg rounded-lg p-6">
					<h2 className="text-2xl font-semibold mb-4">Order Information</h2>
					<p className="mb-2">
						<strong>Status:</strong> {order?.status}
					</p>
					<p className="mb-2">
						<strong>Total Price:</strong>{" "}
						{formatPrice(order?.total_price, order?.transaction.currency)}
					</p>
					<p className="mb-4">
						<strong>Final Price:</strong>{" "}
						{formatPrice(order?.final_price, order?.transaction.currency)}
					</p>
				</div>
			</div>

			{order?.items.length === 0 ? (
				<div className="text-center text-red-500">No items found.</div>
			) : (
				<div>
					<h2 className="text-2xl font-semibold mb-4 mt-6">Products</h2>
					<table className="min-w-full bg-white border border-gray-300">
						<thead>
							<tr className="bg-gray-100">
								<th className="py-2 px-4 border-b text-left">Item Name</th>
								<th className="py-2 px-4 border-b text-left">Quantity</th>
								<th className="py-2 px-4 border-b text-left">
									Price ({order?.transaction.currency?.toUpperCase()})
								</th>
							</tr>
						</thead>
						<tbody>
							{order?.items.map((item, index) => (
								<tr
									key={item._id}
									className={`hover:bg-gray-50 ${index % 2 === 0 ? "bg-gray-50" : ""}`}
								>
									<td className="py-2 px-4 border-b">{item.item_name}</td>
									<td className="py-2 px-4 border-b">{item.quantity}</td>
									<td className="py-2 px-4 border-b">
										{formatPrice(item.price, order?.transaction.currency)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}

			{order?.items.length === 0 ? (
				<div className="text-center text-red-500">No items found.</div>
			) : (
				<div>
					<h2 className="text-2xl font-semibold mb-4 mt-6">Services</h2>
					<table className="min-w-full bg-white border border-gray-300">
						<thead>
							<tr className="bg-gray-100">
								<th className="py-2 px-4 border-b text-left">Item Name</th>
								<th className="py-2 px-4 border-b text-left">Quantity</th>
								<th className="py-2 px-4 border-b text-left">
									Price ({order?.transaction.currency?.toUpperCase()})
								</th>
							</tr>
						</thead>
						<tbody>
							{order?.items.map((item, index) => (
								<tr
									key={item._id}
									className={`hover:bg-gray-50 ${index % 2 === 0 ? "bg-gray-50" : ""}`}
								>
									<td className="py-2 px-4 border-b">{item.item_name}</td>
									<td className="py-2 px-4 border-b">{item.quantity}</td>
									<td className="py-2 px-4 border-b">
										{formatPrice(item.price, order?.transaction.currency)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
					{!fromUserProfile && (
						<div className="flex justify-center mt-4">
							<button
								onClick={() => navigate("/")}
								className="mt-4 px-6 py-3 text-white font-bold rounded-full transition bg-gradient-to-tr from-purple-400 to-pink-300 hover:from-pink-300 hover:to-purple-400"
							>
								Go to Home
							</button>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default OrderDetail;
