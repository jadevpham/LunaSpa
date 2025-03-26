import React, { useState } from "react";

type Appointment = {
	id: string;
	branchName: string;
	serviceName: string;
	date: string;
	time: string;
	status: "completed" | "cancelled" | "upcoming";
	price: number;
};

const HistoryPage = () => {
	const [activeTab, setActiveTab] = useState<
		"upcoming" | "completed" | "cancelled"
	>("upcoming");
	const [appointments] = useState<{
		completed: Appointment[];
		cancelled: Appointment[];
		upcoming: Appointment[];
	}>({
		completed: [
			{
				id: "1",
				branchName: "Downtown Branch",
				serviceName: "Hair Cut & Styling",
				date: "2024-03-20",
				time: "10:00 AM",
				status: "completed",
				price: 350000,
			},
		],
		cancelled: [
			{
				id: "2",
				branchName: "City Center Branch",
				serviceName: "Massage Therapy",
				date: "2024-03-15",
				time: "2:00 PM",
				status: "cancelled",
				price: 500000,
			},
		],
		upcoming: [
			{
				id: "3",
				branchName: "Riverside Branch",
				serviceName: "Facial Treatment",
				date: "2024-03-25",
				time: "3:30 PM",
				status: "upcoming",
				price: 450000,
			},
		],
	});

	const AppointmentCard = ({ appointment }: { appointment: Appointment }) => (
		<div className="bg-white rounded-lg shadow-md p-4 mb-4">
			<div className="flex justify-between items-start">
				<div>
					<h3 className="font-semibold text-lg">{appointment.branchName}</h3>
					<p className="text-gray-600">{appointment.serviceName}</p>
					<div className="mt-2">
						<p className="text-sm text-gray-500">
							Date: {new Date(appointment.date).toLocaleDateString("en-US")}
						</p>
						<p className="text-sm text-gray-500">Time: {appointment.time}</p>
					</div>
				</div>
				<div className="text-right">
					<p className="font-semibold">${appointment.price.toLocaleString()}</p>
					<span
						className={`inline-block px-2 py-1 rounded-full text-xs mt-2 
							${appointment.status === "completed" ? "bg-green-100 text-green-800" : ""}
							${appointment.status === "cancelled" ? "bg-red-100 text-red-800" : ""}
							${appointment.status === "upcoming" ? "bg-blue-100 text-blue-800" : ""}`}
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
					onClick={() => setActiveTab("upcoming")}
					className={`flex-1 rounded-lg py-2.5 text-sm font-medium leading-5 
						${
							activeTab === "upcoming"
								? "bg-white shadow text-blue-700"
								: "text-gray-600 hover:text-blue-700"
						}`}
				>
					Upcoming Appointments
				</button>
				<button
					onClick={() => setActiveTab("completed")}
					className={`flex-1 rounded-lg py-2.5 text-sm font-medium leading-5 
						${
							activeTab === "completed"
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
				{activeTab === "upcoming" && (
					<div>
						{appointments.upcoming.length > 0 ? (
							appointments.upcoming.map((appointment) => (
								<AppointmentCard
									key={appointment.id}
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
				{activeTab === "completed" && (
					<div>
						{appointments.completed.length > 0 ? (
							appointments.completed.map((appointment) => (
								<AppointmentCard
									key={appointment.id}
									appointment={appointment}
								/>
							))
						) : (
							<p className="text-gray-500 text-center py-4">
								No completed appointments
							</p>
						)}
					</div>
				)}

				{/* Cancelled Appointments */}
				{activeTab === "cancelled" && (
					<div>
						{appointments.cancelled.length > 0 ? (
							appointments.cancelled.map((appointment) => (
								<AppointmentCard
									key={appointment.id}
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
