// import { useQuery } from "@tanstack/react-query";

// import { axiosInstance } from "../config/axios";
import { useDispatch, useSelector } from "react-redux";
import { addService, removeService } from "../redux/bookingSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { RootState } from "../redux/store";

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
	const dispatch = useDispatch();
	const [selectedService, setSelectedService] = useState<Service | null>(null);
	const selectedServices = useSelector(
		(state: RootState) => state.booking.selectedService,
	);
	const [isModalOpen, setIsModalOpen] = useState(false);
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

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};
	const handleOpenService = (service: Service) => {
		setSelectedService(service);
		setIsModalOpen(true);
	};
	const handleToggleService = (service: Service) => {
		if (isServiceSelected(service)) {
			dispatch(removeService(service.Service_ID));
		} else {
			dispatch(addService(service));
		}
	};
	const isServiceSelected = (service: Service) => {
		return (
			Array.isArray(selectedServices) &&
			selectedServices.some((s: Service) => s.Service_ID === service.Service_ID)
		);
	};

	useEffect(() => {
		getServices().then((data) => setServices(data));
	}, []);

	return (
		<div className="p-4	">
			<h2 className="text-5xl font-bold mb-6">Select service</h2>
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
							onClick={() => handleOpenService(service)}
						>
							<img
								src={service.Service_Image}
								alt={service.Service_Name}
								className="w-full h-48 object-cover"
							/>
							<div className="p-4 flex justify-between items-center">
								<div>
									<h3 className="text-lg font-semibold mb-2">
										{service.Service_Name}
									</h3>
									<div className="text-sm text-3">
										<p className="text-gray-500">
											{service.Service_Duration} mins
										</p>
										<p className="text-gray-600 mb-2">
											{service.Service_Description}
										</p>
									</div>

									<p className="text-primary font-bold">
										${service.Service_Price}
									</p>
								</div>

								<div className="p-4 flex justify-end">
									<button
										onClick={(e) => {
											e.stopPropagation(); // Ngăn chặn event click vào div cha (không mở modal)
											handleToggleService(service);
										}}
										className={`z-10 w-8 h-8 mt-auto text-black font-bold rounded-lg border border-primary transition-colors duration-300 ${
											isServiceSelected(service)
												? "bg-red-500 text-white hover:bg-red-600"
												: "bg-gray-100 hover:bg-white hover:text-primary"
										}`}
									>
										<i
											className={`fa-solid ${isServiceSelected(service) ? "fa-minus" : "fa-plus"}`}
										></i>
									</button>
								</div>
							</div>
						</div>
					),
				)}
			</div>
			{/* Modal hiển thị chi tiết dịch vụ */}
			{isModalOpen && selectedService && (
				<div className="z-10 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
					<div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
						<button
							onClick={handleCloseModal}
							className="absolute top-2 right-2 text-gray-600 hover:text-black"
						>
							<i className="fa-solid fa-xmark text-2xl"></i>
						</button>
						<img
							src={selectedService.Service_Image}
							alt={selectedService.Service_Name}
							className="w-full h-48 object-cover rounded-md mb-4"
						/>
						<h3 className="text-xl font-bold">
							{selectedService.Service_Name}
						</h3>
						<p className="text-gray-500">
							{selectedService.Service_Duration} mins
						</p>
						<p className="text-gray-600 mb-4">
							{selectedService.Service_Description}
						</p>
						<p className="text-primary font-bold mb-4">
							${selectedService.Service_Price}
						</p>
						<button
							onClick={() => handleToggleService(selectedService)}
							className={`w-full py-2 rounded-lg text-white font-bold transition-colors duration-300 ${
								isServiceSelected(selectedService)
									? "bg-red-600 hover:bg-red-500"
									: "bg-blue-600 hover:bg-blue-500"
							}`}
						>
							{isServiceSelected(selectedService)
								? "Remove Service"
								: "Add Service"}
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default ServicesPage;
