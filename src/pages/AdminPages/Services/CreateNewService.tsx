import React, { useState, ChangeEvent } from "react";
import axiosInstance from "../../../axios/axiosInstance";
import { toast } from "react-toastify";
import LoadingAnimation from "../../../components/LoadingAnimation";

const CreateNewService = () => {
	const [formData, setFormData] = useState({
		name: "",
		description: "",
		images: [],
		status: 1,
		booking_count: 0,
		service_category_id: "",
		view_count: 0,
		durations: [
			{
				duration_name: "",
				price: 0,
				discount_price: 0,
				sub_description: "",
				duration_in_minutes: 0,
			},
		],
		device_ids: [""],
	});
	const MAX_DURATIONS = 4;
	const [loading, setLoading] = useState(false);
	const [uploading, setUploading] = useState(false);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		field: string,
	) => {
		setFormData({ ...formData, [field]: e.target.value });
	};

	const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;

		if (!files || files.length === 0) return;

		const validFiles: File[] = [];
		for (const file of files) {
			const isImage = file.type.startsWith("image/");
			const isUnderLimit = file.size <= 4 * 1024 * 1024; // 4MB

			if (!isImage) {
				toast.error(`${file.name} is not a valid image file.`);
				continue;
			}
			if (!isUnderLimit) {
				toast.error(`${file.name} exceeds the 4MB size limit.`);
				continue;
			}
			validFiles.push(file);
		}

		if (validFiles.length === 0) return;

		setUploading(true); // Bắt đầu upload
		const formData = new FormData();
		validFiles.forEach((file) => formData.append("image", file));

		try {
			const response = await axiosInstance.post(
				"/medias/upload-image",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				},
			);
			const uploadedImages = response.data.result.map((i) => i.url);
			if (response.status === 200) {
				setFormData((prev) => ({
					...prev,
					images: [...prev.images, ...uploadedImages],
				}));
				toast.success("Images uploaded successfully!");
			} else {
				toast.error("Failed to upload images.");
			}
		} catch (error) {
			console.error("Upload error:", error);
			toast.error("Error uploading images.");
		} finally {
			setUploading(false); // Kết thúc upload
		}
	};

	if (uploading) {
		return <LoadingAnimation />;
	}

	const validateDurations = () => {
		return formData.durations.every(
			(d) => d.duration_name.trim() !== "" && d.price > 0,
		);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		if (!validateDurations()) {
			toast.error("Please fill in all duration fields correctly.");
			setLoading(false);
			return;
		}
		try {
			const response = await axiosInstance.post("/services/", formData);
			toast.success("Service created successfully!");
			console.log(response.data);
			setFormData({
				name: "",
				description: "",
				images: [],
				status: 1,
				booking_count: 0,
				service_category_id: "",
				view_count: 0,
				durations: [
					{
						duration_name: "",
						price: 0,
						discount_price: 0,
						sub_description: "",
						duration_in_minutes: 0,
					},
				],
				device_ids: [""],
			});
		} catch (error) {
			console.error("Error creating service:", error);
			toast.error("Failed to create service.");
		} finally {
			setLoading(false);
		}
	};
	const handleArrayChange = (
		index: number,
		field: string,
		value: string | number,
		arrayName: string,
	) => {
		setFormData((prev) => ({
			...prev,
			[arrayName]: prev[arrayName].map((item, i) =>
				i === index ? { ...item, [field]: value } : item,
			),
		}));
	};

	return (
		<div className="max-w-6xl mx-auto p-8 bg-white shadow-lg rounded-lg">
			<h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
				Create New Service
			</h1>
			<form onSubmit={handleSubmit} className="space-y-8">
				{/* Name */}
				<div className="flex flex-wrap gap-4">
					<div className="flex-1">
						<label className="block text-sm font-medium text-gray-700">
							Name
						</label>
						<input
							type="text"
							value={formData.name}
							placeholder="Service Name"
							onChange={(e) => handleChange(e, "name")}
							className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
							required
						/>
					</div>
					<div className="flex-1">
						<label className="block text-sm font-medium text-gray-700">
							Category
						</label>
						<input
							type="text"
							value={formData.service_category_id}
							onChange={(e) => handleChange(e, "service_category_id")}
							placeholder="Category ID"
							className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
							required
						/>
					</div>
				</div>

				{/* Description */}
				<div>
					<label className="block text-sm font-medium text-gray-700">
						Description
					</label>
					<textarea
						value={formData.description}
						placeholder="Service Description"
						onChange={(e) => handleChange(e, "description")}
						className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
						rows={4}
						required
					/>
				</div>

				{/* Upload Images */}
				<div>
					<label className="block text-sm font-medium text-gray-700">
						Upload Images
					</label>
					<input
						type="file"
						multiple
						accept="image/*"
						onChange={handleImageUpload}
						className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
					/>
					{uploading && <p className="text-gray-500">Uploading images...</p>}
					{/* Show preview of uploaded images */}
					<div className="mt-4 flex flex-wrap gap-2">
						{formData.images.map((image, index) => (
							<div key={index} className="relative">
								<img
									src={image}
									alt="Uploaded"
									className="w-24 h-24 rounded-md object-cover"
								/>
								<button
									type="button"
									onClick={() =>
										setFormData((prev) => ({
											...prev,
											images: prev.images.filter((_, i) => i !== index),
										}))
									}
									className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
								>
									X
								</button>
							</div>
						))}
					</div>
				</div>

				{/* Durations and Device IDs */}
				<div className="flex flex-wrap gap-4">
					{/* Durations */}
					<div className="flex-1">
						<label className="block text-sm font-medium text-gray-700">
							Durations
						</label>
						<div className="max-h-60 overflow-y-auto border border-gray-300 rounded-lg p-4 bg-gray-50">
							{formData.durations.map((duration, index) => (
								<div
									key={index}
									className="mb-2 border p-2 rounded bg-white shadow-sm"
								>
									<input
										type="text"
										placeholder="Duration Name"
										value={duration.duration_name}
										onChange={(e) =>
											handleArrayChange(
												index,
												"duration_name",
												e.target.value,
												"durations",
											)
										}
										className="border p-2 w-full mb-1 rounded"
									/>
									<input
										type="number"
										placeholder="Price"
										value={duration.price || ""}
										onChange={(e) =>
											handleArrayChange(
												index,
												"price",
												Number(e.target.value),
												"durations",
											)
										}
										className="border p-2 w-full mb-1 rounded"
									/>
									<input
										type="number"
										placeholder="Discount Price"
										value={duration.discount_price || ""}
										onChange={(e) =>
											handleArrayChange(
												index,
												"discount_price",
												Number(e.target.value),
												"durations",
											)
										}
										className="border p-2 w-full mb-1 rounded"
									/>
									<input
										type="number"
										placeholder="Duration in Minutes"
										value={duration.duration_in_minutes || ""}
										onChange={(e) =>
											handleArrayChange(
												index,
												"duration_in_minutes",
												Number(e.target.value),
												"durations",
											)
										}
										className="border p-2 w-full mb-1 rounded"
									/>
									<textarea
										placeholder="Sub Description"
										value={duration.sub_description}
										onChange={(e) =>
											handleArrayChange(
												index,
												"sub_description",
												e.target.value,
												"durations",
											)
										}
										className="border p-2 w-full mb-1 rounded"
										rows={2}
									/>
									<button
										type="button"
										onClick={() => {
											const updatedDurations = formData.durations.filter(
												(_, i) => i !== index,
											);
											setFormData({ ...formData, durations: updatedDurations });
										}}
										className="text-red-600 hover:text-red-800 text-sm font-medium"
									>
										Remove
									</button>
								</div>
							))}
						</div>
						<button
							type="button"
							onClick={() =>
								setFormData({
									...formData,
									durations: [
										...formData.durations,
										{
											duration_name: "",
											price: 0,
											discount_price: 0,
											sub_description: "",
											duration_in_minutes: 0,
										},
									],
								})
							}
							disabled={formData.durations.length >= MAX_DURATIONS}
							className={`my-2 px-4 py-2 rounded-md ${
								formData.durations.length >= MAX_DURATIONS
									? "bg-gray-300 cursor-not-allowed"
									: "bg-blue-500 text-white hover:bg-blue-600"
							}`}
						>
							Add Duration
						</button>
					</div>

					{/* Device IDs */}
					<div className="flex-1">
						<label className="block text-sm font-medium text-gray-700">
							Device IDs
						</label>
						<div className="max-h-60 overflow-y-auto border border-gray-300 rounded-lg p-4 bg-gray-50">
							{formData.device_ids.map((deviceId, index) => (
								<div
									key={index}
									className="mb-2 border p-2 rounded bg-white shadow-sm flex items-center gap-2"
								>
									<input
										type="text"
										placeholder="Device ID"
										value={deviceId}
										onChange={(e) =>
											setFormData((prev) => ({
												...prev,
												device_ids: prev.device_ids.map((id, i) =>
													i === index ? e.target.value : id,
												),
											}))
										}
										className="border p-2 w-full rounded"
									/>
									<button
										type="button"
										onClick={() => {
											const updatedDeviceIds = formData.device_ids.filter(
												(_, i) => i !== index,
											);
											setFormData({
												...formData,
												device_ids: updatedDeviceIds,
											});
										}}
										className="text-red-600 hover:text-red-800 text-sm font-medium"
									>
										Remove
									</button>
								</div>
							))}
						</div>
						<button
							type="button"
							onClick={() =>
								setFormData({
									...formData,
									device_ids: [...formData.device_ids, ""],
								})
							}
							className={`my-2 px-4 py-2 rounded-md ${
								formData.device_ids.length >= 10
									? "bg-gray-300 cursor-not-allowed"
									: "bg-blue-500 text-white hover:bg-blue-600"
							}`}
							disabled={formData.device_ids.length >= 10}
						>
							Add Device ID
						</button>
					</div>
				</div>

				{/* Submit */}
				<div>
					<button
						type="submit"
						disabled={loading}
						className={`w-full ${
							loading
								? "bg-gray-400 cursor-not-allowed"
								: "bg-indigo-600 hover:bg-indigo-700"
						} text-white py-3 px-6 rounded-md shadow-lg`}
					>
						{loading ? "Creating..." : "Create Service"}
					</button>
				</div>
			</form>
		</div>
	);
};

export default CreateNewService;
