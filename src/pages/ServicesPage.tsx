// import { useQuery } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";
// import { axiosInstance } from "../config/axios";
import { useDispatch } from "react-redux";
import { setService } from "../redux/bookingSlice";
import axios from "axios";
import { useEffect, useState } from "react";

interface Service {
	Service_ID: string;
	Service_Name: string;
	Service_Description: string;
	Service_Image: string;
	Service_Price: number;
	Service_Duration: number;
	Service_TypeID: string;
	Service_IncludeProduct_ID: string;
}

const ServicesPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

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
	const handleSelectService = (service: Service) => {
		dispatch(setService(service));
		navigate("/book/time");
	};

	useEffect(() => {
		getServices().then((data) => setServices(data));
	}, []);

	return (
		<div className="p-5">
			<h2 className="text-2xl font-bold mb-6">Select service</h2>
			<div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
				{services?.map(
					(service: {
						Service_ID: string;
						Service_Name: string;
						Service_Description: string;
						Service_Image: string;
						Service_Price: number;
						Service_Duration: number;
						Service_TypeID: string;
						Service_IncludeProduct_ID: string;
					}) => (
						<div
							key={service.Service_ID}
							className="cursor-pointer bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
							onClick={() => handleSelectService(service)}
						>
							<img
								src={service.Service_Image}
								alt={service.Service_Name}
								className="w-full h-48 object-cover"
							/>
							<div className="p-4">
								<h3 className="text-lg font-semibold mb-2">
									{service.Service_Name}
								</h3>
								<p className="text-gray-600 mb-2">
									{service.Service_Description}
								</p>
								<div className="flex justify-between items-center">
									<span className="text-primary font-bold">
										${service.Service_Price}
									</span>
									<span className="text-gray-500">
										{service.Service_Duration} mins
									</span>
								</div>
							</div>
						</div>
					),
				)}
			</div>
		</div>
	);
};

export default ServicesPage;
