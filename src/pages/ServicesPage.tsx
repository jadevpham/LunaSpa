import { useDispatch, useSelector } from "react-redux";
import { addProduct, addService, removeService } from "../redux/bookingSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../redux/store";
import CardList from "../templates/CardList";
import CardItem from "../templates/CardItem";
import { fetchProducts } from "../redux/productsSlice";

interface Duration {
	label: string;
	value: number;
	price: number;
}

interface Service {
	Service_ID: string;
	Service_Name: string;
	Service_Description: string;
	Service_Image: string;
	Service_Price: number;
	Service_Duration: Duration[];
	Service_TypeID: string;
	Service_IncludeProduct_ID: string;
}

const ServicesPage = () => {
	const dispatch = useDispatch<AppDispatch>();
	const [selectedService, setSelectedService] = useState<Service | null>(null);
	const selectedServices = useSelector(
		(state: RootState) => state.booking.selectedService,
	);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [services, setServices] = useState<Service[]>([]);
	const [selectedDuration, setSelectedDuration] = useState<Duration | null>(
		null,
	);
	const productsList = useSelector(
		(state: RootState) => state.products.productsList,
	);
	const selectedProducts = useSelector(
		(state: RootState) => state.booking.selectedProducts,
	);

	const loading = useSelector((state: RootState) => state.products.loading);
	const error = useSelector((state: RootState) => state.products.error);

	// ✅ Gọi API khi component mount

	useEffect(() => {
		const fetchServices = async () => {
			try {
				const response = await axios.get(
					"https://67b1f201bc0165def8cc4f1e.mockapi.io/services",
				);
				setServices(response.data);
			} catch (error) {
				console.error("Error fetching services:", error);
			}
		};
		dispatch(fetchProducts());
		fetchServices();
	}, [dispatch]);

	const handleCloseModal = () => setIsModalOpen(false);
	const handleOpenService = (service: Service) => {
		setSelectedService(service);
		setSelectedDuration(service.Service_Duration[0] || null);
		setIsModalOpen(true);
	};
	if (loading) return <p>Đang tải dữ liệu...</p>;
	if (error) return <p className="text-red-500">{error}</p>;
	const handleSelectDuration = (duration: number, price: number) => {
		if (selectedService) {
			const updatedService = {
				...selectedService,
				Service_Duration: duration,
				Service_Price: price,
			};

			const isServiceSelected = selectedServices?.some(
				(service) => service.Service_ID === updatedService.Service_ID,
			);

			if (isServiceSelected) {
				dispatch(removeService(updatedService.Service_ID));
			}

			dispatch(addService(updatedService));

			setIsModalOpen(false);
		}
	};

	const unselectedServices = services.filter(
		(service) =>
			!selectedServices?.some(
				(selectedService) => selectedService.Service_ID === service.Service_ID,
			),
	);

	const unselectedProducts = productsList.filter(
		(product) =>
			!selectedProducts?.some(
				(selectedProduct) => selectedProduct.id === product.id,
			),
	);

	return (
		<div className="container mx-auto">
			<h2 className="text-2xl font-bold mb-4">Selected Services</h2>
			{selectedServices && selectedServices.length > 0 ? (
				<div className="mb-8 ">
					<div className="grid gap-4 ">
						{selectedServices.map((service) => (
							<div
								key={service.Service_ID}
								className="bg-white rounded-lg shadow p-3 flex gap-4"
							>
								<img
									src={service.Service_Image}
									alt={service.Service_Name}
									className="w-24 h-24 object-cover rounded"
								/>
								<div className="flex-1 flex justify-between items-center">
									<div>
										<h3 className="font-semibold">{service.Service_Name}</h3>
										<p className="text-sm text-gray-500">
											Duration: {service.Service_Duration} minutes
										</p>
										<p className="text-sm font-semibold">
											Price: ${service.Service_Price.toLocaleString("en-US")}
										</p>
									</div>
									<button
										onClick={() => dispatch(removeService(service.Service_ID))}
										className="text-red-500 hover:text-red-700"
									>
										<i className="fa-solid fa-trash"></i>
									</button>
								</div>
							</div>
						))}
					</div>
				</div>
			) : (
				<div className="flex flex-col items-center justify-center p-8">
					<img
						src="../../public/box.png"
						className="w-10"
						alt="No services selected"
					></img>
					<p className="mt-4 text-gray-500">No services selected</p>
				</div>
			)}
			<h2 className="text-2xl font-bold mb-4">Related Services</h2>
			<div className="grid gap-4 max-h-[60vh] overflow-y-auto hide-scrollbar">
				{unselectedServices.map((service) => (
					<div
						key={service.Service_ID}
						className="bg-white rounded-lg shadow p-3 flex gap-4"
						onClick={() => handleOpenService(service)}
					>
						<img
							src={service.Service_Image}
							alt={service.Service_Name}
							className="w-24 h-24 object-cover rounded"
						/>
						<div className="flex-1 flex justify-between items-center">
							<div>
								<h3 className="font-semibold">{service.Service_Name}</h3>
								<p className="text-sm text-gray-500">
									{service.Service_Duration.map((d) => d.label).join(", ")}
								</p>
							</div>
						</div>
						<button
							className=""
							onClick={(e) => {
								e.stopPropagation();
								handleOpenService(service);
							}}
						>
							<i className="fa-solid fa-plus text-gray-500 bg-white text-lg border rounded-lg p-1 "></i>
						</button>
					</div>
				))}
			</div>
			{isModalOpen && selectedService && (
				<div className="z-10 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
					<div className="bg-white p-8 rounded-lg shadow-lg w-[600px] relative">
						<button
							onClick={handleCloseModal}
							className="absolute top-2 right-2 text-gray-600 hover:text-black"
						>
							<i className="fa-solid fa-xmark text-2xl mx-2"></i>
						</button>
						<h3 className="text-xl font-bold mb-4">
							{selectedService.Service_Name}
						</h3>
						<p className="text-gray-600">
							{selectedService.Service_Description}
						</p>
						<div className="mt-4">
							<h4 className="font-semibold">Select a duration *</h4>
							{selectedService.Service_Duration.map((option) => (
								<label
									key={option.value}
									className="block p-3 border rounded-lg mt-2 cursor-pointer hover:bg-gray-100"
								>
									<input
										type="radio"
										name="duration"
										value={option.value}
										checked={selectedDuration?.value === option.value}
										onChange={() => setSelectedDuration(option)}
										className="mr-2"
									/>
									{option.label} - ${option.price.toLocaleString("en-US")}
								</label>
							))}
						</div>
						<button
							onClick={() => {
								const selectedOption = selectedService.Service_Duration.find(
									(option) => option.value === selectedDuration?.value,
								);
								if (selectedOption) {
									handleSelectDuration(
										selectedOption.value,
										selectedOption.price,
									);
								}
							}}
							className="mt-4 bg-primary text-black border py-2 px-4 rounded-lg w-full hover:bg-black hover:text-white"
						>
							Choose duration
						</button>
					</div>
				</div>
			)}
			<div className="container mx-auto mt-8 border-t pt-8 pr-6">
				<CardList
					title="Recommended products"
					items={unselectedProducts}
					renderItem={(product) => (
						<CardItem
							key={product.id}
							name={product.name}
							address={product.price.toLocaleString("en-US")}
							img={product.img}
							category={product.category}
							star={product.star}
							vote={product.vote}
							onClick={() => {
								dispatch(addProduct(product));
							}}
						/>
					)}
				/>
			</div>
		</div>
	);
};

export default ServicesPage;
