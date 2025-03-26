import React, { useEffect, useState } from "react";
import axiosInstance from "../../axios/axiosInstance";
import { toast } from "react-toastify";

type Duration = {
	discount_price: number;
	duration_in_minutes: number;
	duration_name: string;
	price: number;
	sub_description: string;
};
type Service = {
	_id: string;
	name: string;
	price: number;
	images: string[];
	durations: Duration[];
	service_category_id: string;
	description: string;
	discount_price: number;
	booking_count: number;
	view_count: number;
	device_ids: string[];
};

type Product = {
	_id: string;
	name: string;
	description: string;
	price: number;
	images: string[];
	discount_price: number;
	category_id: string;
};

type FavoriteItem = {
	item_type: string;
	item_info: Service | Product;
	// Add other properties if needed
};

const FavoritePage = () => {
	const [activeTab, setActiveTab] = useState<"services" | "products">(
		"services",
	);
	const [favoriteServices, setFavoriteServices] = useState<Service[]>([]);
	const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
	useEffect(() => {
		const getFavorite = async () => {
			try {
				const user_profile_id = localStorage.getItem("user_profile_id");
				if (!user_profile_id) {
					toast.error("User profile ID not found in local storage");
					return;
				}
				const userProfileId = JSON.parse(user_profile_id);
				const response = await axiosInstance.get(
					`/favorites/user-profiles/${userProfileId}?limit=10&page=1`,
				);
				// toast.log(response.data.result.data);
				const services = response.data.result.data.filter(
					(item: FavoriteItem) => item.item_type.toString() === "service",
				);
				// toast.log(services.map((service: FavoriteItem) => service.item_info));
				const products = response.data.result.data.filter(
					(item: FavoriteItem) => item.item_type.toString() === "product",
				);
				// toast.log(products.map((product: FavoriteItem) => product.item_info));
				setFavoriteServices(
					services.map((service: FavoriteItem) => service.item_info as Service),
				);
				setFavoriteProducts(
					products.map((product: FavoriteItem) => product.item_info as Product),
				);
			} catch (error) {
				console.error("Error fetching favorite services:", error);
			}
		};
		getFavorite();
	}, []);

	const handleUnfavoriteService = async (_id: string) => {
		try {
			const user_profile_id = localStorage.getItem("user_profile_id");
			if (!user_profile_id) {
				toast.error("User profile ID not found in local storage");
				return;
			}
			const userProfileId = JSON.parse(user_profile_id);
			const response = await axiosInstance.delete(
				`/favorites/${_id}/user-profiles/${userProfileId}`,
			);
			if (response.status === 200) {
				toast.success(response.data.message);
				setFavoriteServices((prevServices) =>
					prevServices.filter((service) => service._id !== _id),
				);
			} else {
				toast.error("Failed to unfavorite service");
			}
		} catch (error) {
			console.error("Error unfavoriting service:", error);
		}
	};

	const handleUnfavoriteProduct = async (_id: string) => {
		try {
			const user_profile_id = localStorage.getItem("user_profile_id");
			if (!user_profile_id) {
				toast.error("User profile ID not found in local storage");
				return;
			}
			const userProfileId = JSON.parse(user_profile_id);
			const response = await axiosInstance.delete(
				`/favorites/${_id}/user-profiles/${userProfileId}`,
			);
			if (response.status === 200) {
				toast.success(response.data.message);
				setFavoriteProducts((prevProducts) =>
					prevProducts.filter((product) => product._id !== _id),
				);
			} else {
				toast.error("Failed to unfavorite product");
			}
		} catch (error) {
			console.error("Error unfavoriting product:", error);
		}
	};

	// Sample data - replace with actual API data
	// const [favoriteServices] = useState<Service[]>([
	// 	{
	// 		id: "1",
	// 		name: "Hair Cut & Styling",
	// 		description: "Professional haircut and styling service",
	// 		price: 350000,
	// 		duration: 60,
	// 		image: "/images/haircut.jpg",
	// 	},
	// 	{
	// 		id: "2",
	// 		name: "Hair Cut & Styling",
	// 		description: "Professional haircut and styling service",
	// 		price: 350000,
	// 		duration: 60,
	// 		image: "/images/haircut.jpg",
	// 	},
	// 	{
	// 		id: "3",
	// 		name: "Hair Cut & Styling",
	// 		description: "Professional haircut and styling service",
	// 		price: 350000,
	// 		duration: 60,
	// 		image: "/images/haircut.jpg",
	// 	},
	// 	{
	// 		id: "4",
	// 		name: "Hair Cut & Styling",
	// 		description: "Professional haircut and styling service",
	// 		price: 350000,
	// 		duration: 60,
	// 		image: "/images/haircut.jpg",
	// 	},
	// 	{
	// 		id: "5",
	// 		name: "Hair Cut & Styling",
	// 		description: "Professional haircut and styling service",
	// 		price: 350000,
	// 		duration: 60,
	// 		image: "/images/haircut.jpg",
	// 	},
	// 	{
	// 		id: "6",
	// 		name: "Hair Cut & Styling",
	// 		description: "Professional haircut and styling service",
	// 		price: 350000,
	// 		duration: 60,
	// 		image: "/images/haircut.jpg",
	// 	},
	// 	// Add more services
	// ]);

	// const [favoriteProducts] = useState<Product[]>([
	// 	{
	// 		id: "1",
	// 		name: "Hair Shampoo",
	// 		description: "Professional hair care product",
	// 		price: 250000,
	// 		image: "/images/shampoo.jpg",
	// 		category: "Hair Care",
	// 	},
	// 	{
	// 		id: "2",
	// 		name: "Hair Shampoo",
	// 		description: "Professional hair care product",
	// 		price: 250000,
	// 		image: "/images/shampoo.jpg",
	// 		category: "Hair Care",
	// 	},
	// 	{
	// 		id: "3",
	// 		name: "Hair Shampoo",
	// 		description: "Professional hair care product",
	// 		price: 250000,
	// 		image: "/images/shampoo.jpg",
	// 		category: "Hair Care",
	// 	},
	// 	{
	// 		id: "4",
	// 		name: "Hair Shampoo",
	// 		description: "Professional hair care product",
	// 		price: 250000,
	// 		image: "/images/shampoo.jpg",
	// 		category: "Hair Care",
	// 	},
	// 	{
	// 		id: "5",
	// 		name: "Hair Shampoo",
	// 		description: "Professional hair care product",
	// 		price: 250000,
	// 		image: "/images/shampoo.jpg",
	// 		category: "Hair Care",
	// 	},
	// 	{
	// 		id: "6",
	// 		name: "Hair Shampoo",
	// 		description: "Professional hair care product",
	// 		price: 250000,
	// 		image: "/images/shampoo.jpg",
	// 		category: "Hair Care",
	// 	},
	// 	// Add more products
	// ]);

	const ServiceCard = ({ service }: { service: Service }) => (
		<div className="bg-white rounded-lg shadow-md overflow-hidden">
			<img
				src={service.images[0]}
				alt={service.name}
				className="w-full h-48 object-cover"
			/>
			<div className="p-4">
				<h3 className="font-semibold text-lg mb-2">{service.name}</h3>
				<p className="text-gray-600 text-sm mb-3">{service.description}</p>
				<div className="flex justify-between items-center">
					<div>
						<p className="font-semibold text-blue-600">
							{`From ${Math.min(...service.durations.map((duration) => duration.price)).toLocaleString()}đ to ${Math.max(...service.durations.map((duration) => duration.price)).toLocaleString()}đ`}
						</p>
						<p className="text-sm text-gray-500">
							{`From ${Math.min(...service.durations.map((duration) => duration.duration_in_minutes))} mins to ${Math.max(...service.durations.map((duration) => duration.duration_in_minutes))}mins`}
						</p>
					</div>
					<button
						className="text-red-500 hover:text-red-700"
						onClick={() => {
							handleUnfavoriteService(service._id);
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
						</svg>
					</button>
				</div>
			</div>
		</div>
	);

	const ProductCard = ({ product }: { product: Product }) => (
		<div className="bg-white rounded-lg shadow-md overflow-hidden">
			<img
				src={product.images[0]}
				alt={product.name}
				className="w-full h-48 object-cover"
			/>
			<div className="p-4">
				<span className="text-xs font-semibold inline-block py-1 px-2 rounded-full bg-blue-100 text-blue-600 mb-2">
					{product.category_id}
				</span>
				<h3 className="font-semibold text-lg mb-2">{product.name}</h3>
				<p className="text-gray-600 text-sm mb-3">{product.description}</p>
				<div className="flex justify-between items-center">
					<p className="font-semibold text-blue-600">
						${product.price.toLocaleString()}
					</p>
					<button
						className="text-red-500 hover:text-red-700"
						onClick={() => {
							handleUnfavoriteProduct(product._id);
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
						</svg>
					</button>
				</div>
			</div>
		</div>
	);

	return (
		<div className="container mx-auto p-6">
			<h1 className="text-3xl font-bold mb-6">My Favorites</h1>

			{/* Tabs */}
			<div className="flex space-x-1 rounded-xl bg-gray-100 p-1 mb-6">
				<button
					onClick={() => setActiveTab("services")}
					className={`flex-1 rounded-lg py-2.5 text-sm font-medium leading-5 
            ${
							activeTab === "services"
								? "bg-white shadow text-blue-700"
								: "text-gray-600 hover:text-blue-700"
						}`}
				>
					Favorite Services
				</button>
				<button
					onClick={() => setActiveTab("products")}
					className={`flex-1 rounded-lg py-2.5 text-sm font-medium leading-5 
            ${
							activeTab === "products"
								? "bg-white shadow text-blue-700"
								: "text-gray-600 hover:text-blue-700"
						}`}
				>
					Favorite Products
				</button>
			</div>

			{/* Content */}
			{activeTab === "services" && (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{favoriteServices.length > 0 ? (
						favoriteServices.map((service) => (
							<ServiceCard key={service._id} service={service} />
						))
					) : (
						<p className="col-span-full text-center text-gray-500 py-8">
							No favorite services yet
						</p>
					)}
				</div>
			)}

			{activeTab === "products" && (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{favoriteProducts.length > 0 ? (
						favoriteProducts.map((product) => (
							<ProductCard key={product._id} product={product} />
						))
					) : (
						<p className="col-span-full text-center text-gray-500 py-8">
							No favorite products yet
						</p>
					)}
				</div>
			)}
		</div>
	);
};

export default FavoritePage;
