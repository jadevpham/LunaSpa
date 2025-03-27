import React, { useState, ChangeEvent, useEffect } from "react";
import axiosInstance from "../../../axios/axiosInstance";
import { toast } from "react-toastify";
// import LoadingAnimation from "../../../components/LoadingAnimation";

const CreateNewProduct = () => {
	const [formData, setFormData] = useState({
		name: "",
		description: "",
		category_id: "",
		price: 0,
		discount_price: 0,
		quantity: 0,
		status: 1,
		images: [],
	});
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(false);
	const [uploading, setUploading] = useState(false);

	// Fetch categories from API
	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await axiosInstance.get("/product-categories");
				console.log(response.data.result.categories);
				setCategories(response.data.result.categories || []);
			} catch (error) {
				console.error("Error fetching categories:", error);
				toast.error("Failed to load categories.");
			}
		};
		fetchCategories();
	}, []);

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
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

		setUploading(true);
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
			setUploading(false);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			const response = await axiosInstance.post("/products/", formData);
			toast.success("Product created successfully!");
			console.log(response.data);
			setFormData({
				name: "",
				description: "",
				category_id: "",
				price: 0,
				discount_price: 0,
				quantity: 0,
				status: 1,
				images: [],
			});
		} catch (error) {
			console.error("Error creating product:", error);
			toast.error("Failed to create product.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="max-w-6xl mx-auto p-8 bg-white shadow-lg rounded-lg">
			<h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
				Create New Product
			</h1>
			<form onSubmit={handleSubmit} className="space-y-8">
				{/* Name and Category */}
				<div className="flex flex-wrap gap-6">
					<div className="flex-1">
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Name
						</label>
						<input
							type="text"
							value={formData.name}
							placeholder="Product Name"
							onChange={(e) => handleChange(e, "name")}
							className="block w-full border-gray-300 rounded-md shadow-sm p-2"
							required
						/>
					</div>
					<div className="flex-1">
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Category
						</label>
						<select
							value={formData.category_id}
							onChange={(e) => handleChange(e, "category_id")}
							className="block w-full border-gray-300 rounded-md shadow-sm p-2"
							required
						>
							<option value="" disabled>
								Select a category
							</option>
							{categories.map((category) => (
								<option key={category._id} value={category._id}>
									{category.name}
								</option>
							))}
						</select>
					</div>
				</div>

				{/* Description */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Description
					</label>
					<textarea
						value={formData.description}
						placeholder="Product Description"
						onChange={(e) => handleChange(e, "description")}
						className="block w-full border-gray-300 rounded-md shadow-sm p-2"
						rows={4}
						required
					/>
				</div>

				{/* Price and Quantity */}
				<div className="flex flex-wrap gap-6">
					<div className="flex-1">
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Price
						</label>
						<input
							type="number"
							value={formData.price || ""}
							onChange={(e) => handleChange(e, "price")}
							placeholder="Price"
							className="block w-full border-gray-300 rounded-md shadow-sm p-2"
							required
						/>
					</div>
					<div className="flex-1">
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Discount Price
						</label>
						<input
							type="number"
							value={formData.discount_price || ""}
							onChange={(e) => handleChange(e, "discount_price")}
							placeholder="Discount Price"
							className="block w-full border-gray-300 rounded-md shadow-sm p-2"
						/>
					</div>
					<div className="flex-1">
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Quantity
						</label>
						<input
							type="number"
							value={formData.quantity || ""}
							onChange={(e) => handleChange(e, "quantity")}
							placeholder="Quantity"
							className="block w-full border-gray-300 rounded-md shadow-sm p-2"
							required
						/>
					</div>
				</div>

				{/* Upload Images */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Upload Images
					</label>
					<input
						type="file"
						multiple
						accept="image/*"
						onChange={handleImageUpload}
						className="block w-full border-gray-300 rounded-md shadow-sm p-2"
					/>
					{uploading && (
						<p className="text-gray-500 mt-2">Uploading images...</p>
					)}
					<div className="mt-4 flex flex-wrap gap-4">
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
						{loading ? "Creating..." : "Create Product"}
					</button>
				</div>
			</form>
		</div>
	);
};

export default CreateNewProduct;
