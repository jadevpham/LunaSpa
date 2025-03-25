import { useDispatch, useSelector } from "react-redux";
import { addService, removeService } from "../redux/bookingSlice";
import { useCallback, useEffect, useState } from "react";
import { AppDispatch, RootState } from "../redux/store";
import { fetchProducts } from "../redux/productsSlice";
import { toast } from "react-toastify";
import LoadingAnimation from "../components/LoadingAnimation";
import { fetchServices } from "../redux/servicesSlice";

interface Duration {
	duration_name: string;
	price: number;
	discount_price: number;
	duration_in_minutes: number;
	sub_description: string;
}

interface Service {
	_id: string;
	name: string;
	description: string;
	images: string[];
	service_category: {
		name: string;
		_id: string;
	};
	view_count: number;
	booking_count: number;
	status: number;
	durations: Duration[];
	devices: {
		name: string;
		description: string;
		status: number;
	}[];
}

const SelectServicePage = () => {
	const dispatch = useDispatch<AppDispatch>();
	const [selectedService, setSelectedService] = useState<Service | null>(null);
	const selectedServices = useSelector(
		(state: RootState) => state.booking.selectedService,
	);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const services = useSelector(
		(state: RootState) => state.services.servicesList,
	);

	console.log(selectedServices);
	const [selectedDuration, setSelectedDuration] = useState<Duration | null>(
		null,
	);

	const loading = useSelector((state: RootState) => state.products.loading);
	const error = useSelector((state: RootState) => state.products.error);
	const handleCloseModal = useCallback(() => setIsModalOpen(false), []);
	useEffect(() => {
		dispatch(fetchProducts());
		dispatch(fetchServices());
	}, [dispatch]);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				handleCloseModal();
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [handleCloseModal]);

	const handleOpenService = (service: Service) => {
		setSelectedService(service);
		setSelectedDuration(
			service.durations.length > 0 ? service.durations[0] : null,
		);
		setIsModalOpen(true);
	};

	if (loading) return <LoadingAnimation />;
	if (error) return <p className="text-red-500">{error}</p>;

	const handleSelectDuration = (duration: Duration) => {
		if (selectedService) {
			const updatedService = {
				...selectedService,
				selectedDuration: duration,
			};

			const isServiceSelected = selectedServices?.some(
				(service) => service._id === updatedService._id,
			);

			if (isServiceSelected) {
				dispatch(removeService(updatedService._id));
			}

			dispatch(addService(updatedService));
			toast.success("Service added successfully");
			setIsModalOpen(false);
		}
	};

	const handleRemoveService = (serviceId: string) => {
		dispatch(removeService(serviceId));
		toast.warn("Service removed successfully");
	};

	const unselectedServices = services.filter((service) => {
		const isSelected = !selectedServices?.some(
			(selectedService) => selectedService._id === service._id,
		);
		return isSelected;
	});

	return (
		<div className="container mx-auto shadow-xl p-8 rounded-2xl bg-white">
			<h2 className="text-2xl font-bold mb-4">Selected Services</h2>
			{selectedServices && selectedServices.length > 0 ? (
				<div className="mb-8 ">
					<div className="grid gap-4 ">
						{selectedServices.map((service) => (
							<div
								key={service._id}
								className="bg-white rounded-lg shadow p-3 flex gap-4"
							>
								<img
									src={
										Array.isArray(service.images)
											? service.images[0]
											: service.images
									}
									alt={service.name}
									className="w-24 h-24 object-cover rounded"
								/>
								<div className="flex-1 flex justify-between items-center">
									<div>
										<h3 className="font-semibold">{service.name}</h3>
										<p className="text-sm text-gray-500">
											Duration: {service.selectedDuration.duration_in_minutes}{" "}
											minutes
										</p>
										<div className="flex items-center gap-1">
											<p className="text-sm font-semibold">
												Price: $
												{service.selectedDuration.discount_price.toLocaleString(
													"en-US",
												)}
											</p>
											<p className="text-xs line-through text-gray-500">
												{service.selectedDuration.price.toLocaleString("en-US")}
											</p>
										</div>
										{service.selectedDuration.sub_description && (
											<p className="text-sm text-gray-600">
												{service.selectedDuration.sub_description}
											</p>
										)}
									</div>
									<button
										onClick={() => handleRemoveService(service._id)}
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
			<div className="grid gap-4 max-h-[76vh] overflow-y-auto hide-scrollbar">
				{unselectedServices.map((service) => (
					<div
						key={service._id}
						className="bg-white rounded-lg shadow p-3 flex gap-4"
						onClick={() => handleOpenService(service)}
					>
						<img
							src={
								Array.isArray(service.images)
									? service.images[0]
									: service.images
							}
							alt={service.name}
							className="w-24 h-24 object-cover rounded"
						/>
						<div className="flex-1 flex justify-between items-center">
							<div>
								<h3 className="font-semibold">{service.name}</h3>
								<p className="text-sm text-gray-500">
									{service.durations
										.filter((duration) => duration.duration_in_minutes > 0)
										.map(
											(duration) => `${duration.duration_in_minutes} minutes`,
										)
										.join(", ")}
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
						<h3 className="text-xl font-bold mb-4">{selectedService.name}</h3>
						<p className="text-gray-600">{selectedService.description}</p>

						{/* Service Images Gallery */}
						{Array.isArray(selectedService.images) &&
							selectedService.images.length > 0 && (
								<div className="mt-4 flex gap-2 overflow-x-auto">
									{selectedService.images.map((img, index) => (
										<img
											key={index}
											src={img}
											alt={`${selectedService.name} image ${index + 1}`}
											className="w-20 h-20 object-cover rounded"
										/>
									))}
								</div>
							)}

						<div className="mt-4">
							<h4 className="font-semibold">Select a duration *</h4>
							{selectedService.durations &&
								selectedService.durations.map((duration) => (
									<label
										key={duration.duration_in_minutes}
										className="block p-3 border rounded-lg mt-2 cursor-pointer hover:bg-gray-100"
									>
										<input
											type="radio"
											name="duration"
											value={duration.duration_in_minutes}
											checked={
												selectedDuration?.duration_in_minutes ===
												duration.duration_in_minutes
											}
											onChange={() => setSelectedDuration(duration)}
											className="mr-2"
										/>
										{duration.duration_name} - $
										{duration.discount_price.toLocaleString("en-US")}
										<span className="ml-1 text-gray-500 line-through text-sm">
											{duration.price.toLocaleString("en-US")}
										</span>
										{duration.discount_price < duration.price && (
											<span className="ml-2 text-green-600">
												(Save $
												{(
													duration.price - duration.discount_price
												).toLocaleString("en-US")}
												)
											</span>
										)}
										{duration.sub_description && (
											<p className="text-sm text-gray-500 ml-6 mt-1">
												{duration.sub_description}
											</p>
										)}
									</label>
								))}
						</div>
						<button
							onClick={() => {
								if (selectedDuration) {
									handleSelectDuration(selectedDuration);
								}
							}}
							disabled={!selectedDuration}
							className={`mt-4 ${
								selectedDuration
									? "bg-primary text-black hover:bg-black hover:text-white"
									: "bg-gray-200 text-gray-500 cursor-not-allowed"
							} border py-2 px-4 rounded-lg w-full transition-all duration-300`}
						>
							Choose duration
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default SelectServicePage;
