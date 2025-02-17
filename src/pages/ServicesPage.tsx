// import { useQuery } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";
// import { axiosInstance } from "../config/axios";
import axios from "axios";
import { useEffect, useState } from "react";
const ServicesPage = () => {
	const navigate = useNavigate();

	// const { data: services, isLoading } = useQuery({
	// 	queryKey: ["services"],
	// 	queryFn: async () => {
	// 		const response = await axios.get("/services");
	// 		return response.data;
	// 	},
	// });

	// if (isLoading) {
	// 	return <div>Loading...</div>;
	// }
	const [services, setServices] = useState([]);
	const getServices = async () => {
		try {
			const response = await axios.get(
				"https://67b1f201bc0165def8cc4f1e.mockapi.io/services",
			);
			return response.data;
		} catch (error) {
			console.error("Error fetching services:", error);
			throw error;
		}
	};

	useEffect(() => {
		getServices().then((data) => setServices(data));
	}, []);

	return (
		<div className="p-5">
			{/* <BookingHeader /> */}
			<h2 className="text-2xl font-bold">Chọn dịch vụ</h2>
			<div className="mt-4 space-y-3">
				{services?.map(
					(service: { id: string; icon: string; name: string }) => (
						<button
							key={service.id}
							className="block bg-gray-200 p-3 rounded w-full text-left"
							onClick={() =>
								navigate("/book/professional", {
									state: { selectedService: service },
								})
							}
						>
							{service.icon} {service.name}
						</button>
					),
				)}
			</div>
		</div>
	);
};

export default ServicesPage;
