import React, { useEffect, useState } from "react";
import axiosInstance from "../../axios/axiosInstance";

type Contact = {
	phone: string;
	email: string;
	address: string;
};
type Branch = {
	_id: string;
	name: string;
	contact: Contact;
	phone_number: string;
	email: string;
	rating: number;
};

type Item = {
	discount_price: number;
	end_time: string | null;
	item_id: string;
	item_name: string;
	item_type: string;
	note: string;
	order_id: string;
	price: number;
	quantity: number;
	slot_id: string | null;
	staff_profile_id: string | null;
	start_time: string | null;
	_id: string;
};

type Appointment = {
	_id: string;
	branch: Branch;
	serviceName: string;
	time: string;
	status: "confirmed" | "cancelled" | "pending";
	total_price: number;
	created_at: string;
	updated_at: string;
	items: Item[];
};

const HistoryPage = () => {
	const [activeTab, setActiveTab] = useState<
		"confirmed" | "pending" | "cancelled"
	>("confirmed");
	const [appointments, setAppointments] = useState<Appointment[]>([]);

	useEffect(() => {
		const user = localStorage.getItem("user");

		const account_id = JSON.parse(user)._id;
		const getOrdersHistory = async () => {
			try {
				const response = await axiosInstance.get(
					`/orders?customer_id=${account_id}&status=${activeTab}`,
				);
				if (response.data.result.data) {
					setAppointments(response.data.result.data);
				} else {
					setAppointments([]);
				}
			} catch (error) {
				console.error("Error fetching orders:", error);
				setAppointments([]);
			}
		};
		getOrdersHistory();
	}, [activeTab]);
	console.log(appointments);
	const AppointmentCard = ({ appointment }: { appointment: Appointment }) => (
		<div className="bg-white rounded-lg shadow-md p-4 mb-4">
			<div className="flex justify-between items-start">
				<div>
					<h3 className="font-semibold text-lg">{appointment.branch.name}</h3>
					<p className="text-gray-600">{appointment.serviceName}</p>
					<div className="mt-2">
						<p className="text-sm text-gray-500">
							Date: {new Date(appointment.created_at).toLocaleDateString()}
						</p>
						<p className="text-sm text-gray-500">Time: {appointment.time}</p>
						<p className="text-sm text-gray-500">
							{appointment.items.map((item) => item.item_name).join(", ")}
						</p>
					</div>
				</div>
				<div className="text-right">
					<p className="font-semibold">
						${appointment.total_price.toLocaleString()}
					</p>
					<span
						className={`inline-block px-2 py-1 rounded-full text-xs mt-2 
							${appointment.status === "confirmed" ? "bg-green-100 text-green-800" : ""}
							${appointment.status === "cancelled" ? "bg-red-100 text-red-800" : ""}
							${appointment.status === "pending" ? "bg-blue-100 text-blue-800" : ""}`}
					>
						{appointment.status.charAt(0).toUpperCase() +
							appointment.status.slice(1)}
					</span>
				</div>
			</div>
		</div>
	);

	return (
		<div className="container mx-auto p-6">
			<h1 className="text-3xl font-bold mb-6">Booking History</h1>

			{/* Custom Tabs */}
			<div className="flex space-x-1 rounded-xl bg-gray-100 p-1 mb-6">
				<button
					onClick={() => setActiveTab("pending")}
					className={`flex-1 rounded-lg py-2.5 text-sm font-medium leading-5 
						${
							activeTab === "pending"
								? "bg-white shadow text-blue-700"
								: "text-gray-600 hover:text-blue-700"
						}`}
				>
					Upcoming Appointments
				</button>
				<button
					onClick={() => setActiveTab("confirmed")}
					className={`flex-1 rounded-lg py-2.5 text-sm font-medium leading-5 
						${
							activeTab === "confirmed"
								? "bg-white shadow text-blue-700"
								: "text-gray-600 hover:text-blue-700"
						}`}
				>
					Completed
				</button>
				<button
					onClick={() => setActiveTab("cancelled")}
					className={`flex-1 rounded-lg py-2.5 text-sm font-medium leading-5 
						${
							activeTab === "cancelled"
								? "bg-white shadow text-blue-700"
								: "text-gray-600 hover:text-blue-700"
						}`}
				>
					Cancelled
				</button>
			</div>

			{/* Tab Content */}
			<div className="mt-4">
				{/* Upcoming Appointments */}
				{activeTab === "confirmed" && (
					<div>
						{appointments.length > 0 ? (
							appointments.map((appointment) => (
								<AppointmentCard
									key={appointment._id}
									appointment={appointment}
								/>
							))
						) : (
							<p className="text-gray-500 text-center py-4">
								No upcoming appointments
							</p>
						)}
					</div>
				)}

				{/* Completed Appointments */}
				{activeTab === "pending" && (
					<div>
						{appointments.length > 0 ? (
							appointments.map((appointment) => (
								<AppointmentCard
									key={appointment._id}
									appointment={appointment}
								/>
							))
						) : (
							<p className="text-gray-500 text-center py-4">
								No pending appointments
							</p>
						)}
					</div>
				)}

				{/* Cancelled Appointments */}
				{activeTab === "cancelled" && (
					<div>
						{appointments.length > 0 ? (
							appointments.map((appointment) => (
								<AppointmentCard
									key={appointment._id}
									appointment={appointment}
								/>
							))
						) : (
							<p className="text-gray-500 text-center py-4">
								No cancelled appointments
							</p>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default HistoryPage;
