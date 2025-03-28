import React, { useState, useEffect } from "react";
import axiosInstance from "../../../axios/axiosInstance";
import { toast } from "react-toastify";

type Category = {
	created_at: string;
	description: string;
	name: string;
	updated_at: string;
	_id: string;
};

type Product = {
	_id: string;
	name: string;
	description: string;
	images: string[];
	price: number;
	discount_price: number;
	quantity: number;
	category: Category;
	created_at: string;
	updated_at: string;
};

interface EditProductModalProps {
	product: Product | null;
	isOpen: boolean;
	onClose: () => void;
	onSave: (updatedProduct: Product) => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
	product,
	isOpen,
	onClose,
	onSave,
}) => {
	const [editedProduct, setEditedProduct] = useState<Product | null>(product);
	const [categories, setCategories] = useState<Category[]>([]);
	const getProductCategories = async () => {
		try {
			const response = await axiosInstance.get("/product-categories");
			console.log(response);
			setCategories(response.data.result.categories);
		} catch (error) {
			console.error("Error fetching categories:", error);
			return [];
		}
	};

	useEffect(() => {
		setEditedProduct(product);
		getProductCategories();
	}, [product]);

	if (!isOpen || !editedProduct) return null;

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
	) => {
		const { name, value } = e.target;
		setEditedProduct({ ...editedProduct, [name]: value });
	};

	const handleSave = async () => {
		if (editedProduct) {
			try {
				const { _id, created_at, updated_at, ...productToUpdate } =
					editedProduct;
				const response = await axiosInstance.patch(
					`/products/${editedProduct._id}`,
					productToUpdate,
				);
				if (response.status !== 200) {
					throw new Error("Failed to update product");
				}
				toast.success("Product updated successfully");
				onSave(response.data.result);
			} catch (error) {
				console.error(error);
				toast.error("Failed to update product");
			}
		}
		onClose();
	};

	const handleImageUpload = async (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
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
			const uploadedImages = response.data.result.map(
				(i: { url: string }) => i.url,
			);
			if (response.status === 200) {
				setEditedProduct((prev) => ({
					...prev!,
					images: [...prev!.images, ...uploadedImages],
				}));
				toast.success("Images uploaded successfully!");
			} else {
				toast.error("Failed to upload images.");
			}
		} catch (error) {
			console.error("Upload error:", error);
			toast.error("Error uploading images.");
		}
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div className="bg-white rounded-lg shadow-lg w-full max-w-md p-4">
				<h2 className="text-xl font-bold text-center mb-4">Edit Product</h2>
				<div className="space-y-3">
					<div>
						<label className="block text-sm font-medium mb-1" htmlFor="name">
							Product Name
						</label>
						<input
							type="text"
							id="name"
							name="name"
							value={editedProduct.name}
							onChange={handleChange}
							className="w-full border rounded px-2 py-1 text-sm"
						/>
					</div>
					<div>
						<label
							className="block text-sm font-medium mb-1"
							htmlFor="description"
						>
							Description
						</label>
						<textarea
							id="description"
							name="description"
							value={editedProduct.description}
							onChange={handleChange}
							className="w-full border rounded px-2 py-1 text-sm"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium mb-1" htmlFor="images">
							Images
						</label>
						<div className="space-y-2">
							{/* Hiển thị danh sách ảnh */}
							<div className="flex flex-wrap gap-2">
								{editedProduct.images.map((image, index) => (
									<div key={index} className="relative">
										<img
											src={image}
											alt={`Product Image ${index + 1}`}
											className="w-20 h-20 object-cover rounded border"
										/>
										<button
											type="button"
											onClick={() =>
												setEditedProduct({
													...editedProduct,
													images: editedProduct.images.filter(
														(_, i) => i !== index,
													),
												})
											}
											className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
										>
											<i className="fa-solid fa-x"></i>
										</button>
									</div>
								))}
							</div>

							{/* Input để upload ảnh */}
							<input
								type="file"
								accept="image/*"
								multiple
								onChange={handleImageUpload}
								className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
							/>
						</div>
					</div>
					<div className="grid grid-cols-2 gap-3">
						<div>
							<label className="block text-sm font-medium mb-1" htmlFor="price">
								Price
							</label>
							<input
								type="number"
								id="price"
								name="price"
								value={editedProduct.price}
								onChange={handleChange}
								className="w-full border rounded px-2 py-1 text-sm"
							/>
						</div>
						<div>
							<label
								className="block text-sm font-medium mb-1"
								htmlFor="discount_price"
							>
								Discount Price
							</label>
							<input
								type="number"
								id="discount_price"
								name="discount_price"
								value={editedProduct.discount_price}
								onChange={handleChange}
								className="w-full border rounded px-2 py-1 text-sm"
							/>
						</div>
					</div>
					<div>
						<label
							className="block text-sm font-medium mb-1"
							htmlFor="quantity"
						>
							Quantity
						</label>
						<input
							type="number"
							id="quantity"
							name="quantity"
							value={editedProduct.quantity}
							onChange={handleChange}
							className="w-full border rounded px-2 py-1 text-sm"
						/>
					</div>
					<div>
						<label
							className="block text-sm font-medium mb-1"
							htmlFor="category"
						>
							Category
						</label>
						<select
							id="category"
							name="category"
							value={editedProduct.category?._id}
							onChange={(e) =>
								setEditedProduct({
									...editedProduct,
									category: { ...editedProduct.category, _id: e.target.value },
								})
							}
							className="w-full border rounded px-2 py-1 text-sm"
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
				<div className="flex justify-end mt-4">
					<button
						onClick={onClose}
						className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 mr-2 text-sm"
					>
						Cancel
					</button>
					<button
						onClick={handleSave}
						className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
					>
						Save
					</button>
				</div>
			</div>
		</div>
	);
};

export default EditProductModal;
