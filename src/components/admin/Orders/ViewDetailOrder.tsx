import React from "react";

interface ViewDetailOrderModalProps {
	order: {
		customer: {
			name: string;
			email: string;
			phone_number: string;
			address: string;
		};
		branch: {
			name: string;
			rating: number;
			contact: {
				address: string;
				phone: string;
				email: string;
			};
		};
		_id: string;
		status: string;
		booking_time?: string;
		start_time?: string;
		end_time?: string;
		total_price: number;
		discount_amount: number;
		final_price: number;
		payment_method: string;
		transaction_id?: string;
		items: {
			item_name: string;
			price: number;
			discount_price: number;
			quantity: number;
			slot_id?: string;
			staff_profile_id?: string;
			start_time?: string;
			end_time?: string;
			note?: string;
		}[];
	};
	isOpen: boolean;
	onClose: () => void;
}

const ViewDetailOrderModal: React.FC<ViewDetailOrderModalProps> = ({
	order,
	isOpen,
	onClose,
}) => {
	if (!isOpen || !order) return null;

	return (
		<div className="z-10 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
			<div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-[50rem] max-h-screen overflow-y-auto">
				<h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
					Order Details
				</h2>

				{/* Customer and Branch Information */}
				<div className="mb-6">
					<h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
						Customer & Branch Information
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Customer Information */}
						<div>
							<h4 className="text-md font-semibold text-gray-600 mb-2">
								Customer Information
							</h4>
							<p>
								<strong>Name:</strong> {order.customer.name}
							</p>
							<p>
								<strong>Email:</strong> {order.customer.email}
							</p>
							<p>
								<strong>Phone:</strong> {order.customer.phone_number}
							</p>
							<p>
								<strong>Address:</strong> {order.customer.address}
							</p>
						</div>

						{/* Branch Information */}
						<div>
							<h4 className="text-md font-semibold text-gray-600 mb-2">
								Branch Information
							</h4>
							<p>
								<strong>Name:</strong> {order.branch.name}
							</p>
							<p>
								<strong>Rating:</strong> {order.branch.rating}
							</p>
							<p>
								<strong>Address:</strong> {order.branch.contact.address}
							</p>
							<p>
								<strong>Contact:</strong>
							</p>
							<ul className="ml-4 list-disc">
								<li>
									<strong>Phone:</strong> {order.branch.contact.phone}
								</li>
								<li>
									<strong>Email:</strong> {order.branch.contact.email}
								</li>
							</ul>
						</div>
					</div>
				</div>

				{/* Order Information */}
				<div className="mb-6">
					<h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
						Order Information
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<p>
								<strong>Order ID:</strong> {order._id}
							</p>
							<p>
								<strong>Status:</strong>{" "}
								<span
									className={`px-2 py-1 rounded ${
										order.status === "Completed"
											? "bg-green-100 text-green-700"
											: "bg-yellow-100 text-yellow-700"
									}`}
								>
									{order.status}
								</span>
							</p>
							<p>
								<strong>Booking Time:</strong> {order.booking_time || "N/A"}
							</p>
							<p>
								<strong>Start Time:</strong> {order.start_time || "N/A"}
							</p>
							<p>
								<strong>End Time:</strong> {order.end_time || "N/A"}
							</p>
						</div>
						<div>
							<p>
								<strong>Total Price:</strong>{" "}
								<span className="text-gray-800 font-semibold">
									${order.total_price.toLocaleString()}
								</span>
							</p>
							<p>
								<strong>Discount Amount:</strong>{" "}
								<span className="text-gray-800 font-semibold">
									${order.discount_amount.toLocaleString()}
								</span>
							</p>
							<p>
								<strong>Final Price:</strong>{" "}
								<span className="text-green-600 font-semibold">
									${order.final_price.toLocaleString()}
								</span>
							</p>
							<p>
								<strong>Payment Method:</strong> {order.payment_method}
							</p>
							<p>
								<strong>Transaction ID:</strong> {order.transaction_id || "N/A"}
							</p>
						</div>
					</div>
				</div>

				{/* Items Information */}
				<div className="mb-6">
					<h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
						Items
					</h3>
					<div className="max-h-60 overflow-y-auto">
						{order.items.map((item, index) => (
							<div
								key={index}
								className="border p-4 rounded mb-4 bg-gray-50 hover:shadow-md transition"
							>
								<p>
									<strong>Item Name:</strong> {item.item_name}
								</p>
								<p>
									<strong>Price:</strong>{" "}
									<span className="text-gray-800 font-semibold">
										${item.price.toFixed(2)}
									</span>
								</p>
								<p>
									<strong>Discount Price:</strong>{" "}
									<span className="text-gray-800 font-semibold">
										${item.discount_price.toFixed(2)}
									</span>
								</p>
								<p>
									<strong>Quantity:</strong> {item.quantity}
								</p>
								<p>
									<strong>Slot ID:</strong> {item.slot_id || "N/A"}
								</p>
								<p>
									<strong>Staff Profile ID:</strong>{" "}
									{item.staff_profile_id || "N/A"}
								</p>
								<p>
									<strong>Start Time:</strong> {item.start_time || "N/A"}
								</p>
								<p>
									<strong>End Time:</strong> {item.end_time || "N/A"}
								</p>
								<p>
									<strong>Note:</strong> {item.note || "N/A"}
								</p>
							</div>
						))}
					</div>
				</div>

				{/* Close Button */}
				<div className="flex justify-end">
					<button
						onClick={onClose}
						className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
					>
						Close
					</button>
				</div>
			</div>
		</div>
	);
};

export default ViewDetailOrderModal;
