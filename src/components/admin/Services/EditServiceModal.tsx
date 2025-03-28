import React, { useState, useEffect } from "react";
import axiosInstance from "../../../axios/axiosInstance";
import { toast } from "react-toastify";

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
	durations: {
		duration_name: string;
		price: number;
		discount_price: number;
		duration_in_minutes: number;
		sub_description: string;
	}[];
	devices: {
		name: string;
		description: string;
		status: number;
	}[];
	created_at: string;
	updated_at: string;
}

interface EditServiceModalProps {
	service: Service | null;
	isOpen: boolean;
	onClose: () => void;
	onSave: (updatedService: Service) => void;
}

const EditServiceModal: React.FC<EditServiceModalProps> = ({
	service,
	isOpen,
	onClose,
	onSave,
}) => {
	const [editedService, setEditedService] = useState<Service | null>(service);
	const [isAccordionOpen, setIsAccordionOpen] = useState(false);
	const [isDevicesOpen, setIsDevicesOpen] = useState(false);

	useEffect(() => {
		setEditedService(service); // Update data when opening modal
	}, [service]);

	if (!isOpen || !editedService) return null;

	const handleChange = (
		e: React.ChangeEvent<
			HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
		>,
	) => {
		const { name, value } = e.target;
		if (name === "images") {
			setEditedService({
				...editedService,
				[name]: value.split(",").map((img) => img.trim()),
			}); // Handle images as an array
		} else {
			setEditedService({ ...editedService, [name]: value });
		}
	};

	const handleDurationChange = (
		index: number,
		field: keyof Service["durations"][number],
		value: string | number,
	) => {
		const updatedDurations = [...editedService.durations];
		updatedDurations[index] = {
			...updatedDurations[index],
			[field]: value,
		};
		setEditedService({ ...editedService, durations: updatedDurations });
	};

	const addDuration = () => {
		setEditedService({
			...editedService,
			durations: [
				...editedService.durations,
				{
					duration_name: "",
					price: 0,
					discount_price: 0,
					duration_in_minutes: 0,
					sub_description: "",
				},
			],
		});
	};

	const removeDuration = (index: number) => {
		const updatedDurations = editedService.durations.filter(
			(_, i) => i !== index,
		);
		setEditedService({ ...editedService, durations: updatedDurations });
	};

	const handleSave = async () => {
		if (editedService) {
			try {
				const { _id, created_at, updated_at, ...serviceToUpdate } =
					editedService; // Loại bỏ created_at và updated_at
				const response = await axiosInstance.patch(
					`/services/${editedService._id}`,
					serviceToUpdate, // Gửi đối tượng đã loại bỏ
				);
				if (response.status !== 200) {
					throw new Error("Failed to update service");
				}
				toast.success("Updated successfully");
				onSave(response.data.result);
			} catch (error) {
				console.log(error);
			}
			// onSave(editedService);
		}
		onClose();
	};

	const toggleAccordion = () => {
		setIsAccordionOpen(!isAccordionOpen);
	};

	const toggleDevicesAccordion = () => {
		setIsDevicesOpen(!isDevicesOpen);
	};

	const handleDeviceChange = (
		index: number,
		field: keyof Service["devices"][number],
		value: string | number,
	) => {
		const updatedDevices = [...editedService.devices];
		(updatedDevices[index] as unknown)[field] = value;
		setEditedService({ ...editedService, devices: updatedDevices });
	};

	const addDevice = () => {
		setEditedService({
			...editedService,
			devices: [
				...editedService.devices,
				{
					name: "",
					description: "",
					status: 1,
				},
			],
		});
	};

	const removeDevice = (index: number) => {
		const updatedDevices = editedService.devices.filter((_, i) => i !== index);
		setEditedService({ ...editedService, devices: updatedDevices });
	};

	return (
		<div className="z-10 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
			<div className="bg-white p-3 rounded-lg shadow-lg w-full max-w-[40rem]">
				<h2 className="text-lg font-bold mb-2 text-center">Edit Service</h2>
				<label className="block mb-1" htmlFor="name">
					<span className="font-semibold">Service Name</span>
				</label>
				<input
					type="text"
					name="name"
					value={editedService.name}
					onChange={handleChange}
					className="border p-2 w-full mb-2 rounded"
				/>

				<label className="block mb-1" htmlFor="description">
					<span className="font-semibold">Service Description</span>
				</label>
				<textarea
					name="description"
					value={editedService.description}
					onChange={handleChange}
					className="border p-2 w-full mb-2 rounded"
				/>
				<label className="block mb-1" htmlFor="images">
					<span className="font-semibold">Images (URLs)</span>
				</label>
				<input
					type="text"
					name="images"
					value={editedService.images.join(", ")}
					onChange={handleChange}
					className="border p-2 w-full mb-2 rounded"
				/>
				<label className="block mb-1" htmlFor="status">
					<span className="font-semibold">Status</span>
				</label>
				<select
					name="status"
					value={editedService.status}
					onChange={handleChange}
					className="border p-2 w-full mb-2 rounded"
				>
					<option value={1}>Active</option>
					<option value={0}>Inactive</option>
				</select>

				{/* Durations Section */}
				<h3
					className="text-md font-bold mb-2 cursor-pointer"
					onClick={toggleAccordion}
				>
					Durations {isAccordionOpen ? "▲" : "▼"}
				</h3>
				{isAccordionOpen && (
					<div className="max-h-60 overflow-y-auto">
						{editedService?.durations?.map((duration, index) => (
							<div key={index} className="mb-2 border p-2 rounded">
								<input
									type="text"
									placeholder="Duration Name"
									value={duration.duration_name}
									onChange={(e) =>
										handleDurationChange(index, "duration_name", e.target.value)
									}
									className="border p-2 w-full mb-1 rounded"
								/>
								<input
									type="number"
									placeholder="Price"
									value={duration.price ? duration.price : ""}
									onChange={(e) =>
										handleDurationChange(index, "price", Number(e.target.value))
									}
									className="border p-2 w-full mb-1 rounded"
								/>
								<input
									type="number"
									placeholder="Discount Price"
									value={duration.discount_price ? duration.discount_price : ""}
									onChange={(e) =>
										handleDurationChange(
											index,
											"discount_price",
											Number(e.target.value),
										)
									}
									className="border p-2 w-full mb-1 rounded"
								/>
								<input
									type="number"
									placeholder="Duration in Minutes"
									value={
										duration.duration_in_minutes
											? duration.duration_in_minutes
											: ""
									}
									onChange={(e) =>
										handleDurationChange(
											index,
											"duration_in_minutes",
											Number(e.target.value),
										)
									}
									className="border p-2 w-full mb-1 rounded"
								/>
								<input
									type="text"
									placeholder="Sub Description"
									value={duration.sub_description}
									onChange={(e) =>
										handleDurationChange(
											index,
											"sub_description",
											e.target.value,
										)
									}
									className="border p-2 w-full mb-1 rounded"
								/>
								<button
									onClick={() => removeDuration(index)}
									className="text-red-500 hover:text-red-700"
								>
									Remove Duration
								</button>
							</div>
						))}
						<button
							onClick={addDuration}
							className="text-blue-500 hover:text-blue-700 col-span-2"
						>
							Add Duration
						</button>
					</div>
				)}

				{/* Devices Section */}
				<h3
					className="text-md font-bold mb-2 cursor-pointer"
					onClick={toggleDevicesAccordion}
				>
					Devices {isDevicesOpen ? "▲" : "▼"}
				</h3>
				{isDevicesOpen && (
					<div className="max-h-60 overflow-y-auto">
						{editedService?.devices?.map((device, index) => (
							<div key={index} className="mb-2 border p-2 rounded">
								<input
									type="text"
									placeholder="Device Name"
									value={device.name}
									onChange={(e) =>
										handleDeviceChange(index, "name", e.target.value)
									}
									className="border p-2 w-full mb-1 rounded"
								/>
								<input
									type="text"
									placeholder="Device Description"
									value={device.description}
									onChange={(e) =>
										handleDeviceChange(index, "description", e.target.value)
									}
									className="border p-2 w-full mb-1 rounded"
								/>
								<select
									value={device.status}
									onChange={(e) =>
										handleDeviceChange(index, "status", Number(e.target.value))
									}
									className="border p-2 w-full mb-1 rounded"
								>
									<option value={1}>Active</option>
									<option value={0}>Inactive</option>
								</select>
								<button
									onClick={() => removeDevice(index)}
									className="text-red-500 hover:text-red-700"
								>
									Remove Device
								</button>
							</div>
						))}
						<button
							onClick={addDevice}
							className="text-blue-500 hover:text-blue-700 col-span-2"
						>
							Add Device
						</button>
					</div>
				)}

				<div className="flex justify-end">
					<button
						onClick={onClose}
						className="mr-2 px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500 transition duration-200"
					>
						Cancel
					</button>
					<button
						onClick={handleSave}
						className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
					>
						Save
					</button>
				</div>
			</div>
		</div>
	);
};

export default EditServiceModal;
