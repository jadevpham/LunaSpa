import { useEffect, useState } from "react";
import BookingCart from "../components/BookingCart";
import BookingHeader from "../components/BookingHeader";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { addProduct, setProducts } from "../redux/bookingSlice";
import { toast } from "react-toastify";
import CardList from "../templates/CardList";
import CardItem from "../templates/CardItem";
import axiosInstance from "../axios/axiosInstance";

const BookingLayout = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [showModal, setShowModal] = useState(false);
	const [showQuantityModal, setShowQuantityModal] = useState(false);
	interface Product {
		_id: string;
		name: string;
		price: number;
		discount_price: number;
		quantity: number;
		images: string[];
		description: string;
		category_id: string;
		star: number;
		vote: number;
		product_category?: {
			_id: string;
			name: string;
		};
	}

	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
	const [quantity, setQuantity] = useState(1);
	const [productsList, setProductsList] = useState<Product[]>([]);
	console.log(productsList);
	const selectedProducts = useSelector(
		(state: RootState) => state.booking.selectedProducts,
	);
	const selectedService = useSelector(
		(state: RootState) => state.booking.selectedService,
	);
	const service_id = selectedService[0]?._id;
	useEffect(() => {
		const fetchProducts = async () => {
			try {
				if (!service_id) return;
				const response = await axiosInstance.get(
					`/service-products/recommended/${service_id}`,
				);
				const products = response.data.result.data.map(
					(product) => product.product,
				);
				console.log(products);
				// dispatch(setProducts(products));
				setProductsList(products);
			} catch (error) {
				console.error("Error fetching products:", error);
			}
		};
		fetchProducts();
	}, [service_id]);

	const handleAddProduct = (product: Product) => {
		const existingProduct = selectedProducts?.find(
			(item) => item._id === product._id,
		);

		if (existingProduct) {
			setSelectedProduct(product);
			setQuantity(existingProduct.quantity);
		} else {
			setSelectedProduct(product);
			setQuantity(1);
		}

		setShowQuantityModal(true);
	};

	const handleConfirmAdd = () => {
		const existingProductIndex = selectedProducts?.findIndex(
			(item) => item._id === selectedProduct._id,
		);

		if (existingProductIndex !== -1 && selectedProducts) {
			const updatedProducts = [...selectedProducts];
			updatedProducts[existingProductIndex as number] = {
				...selectedProduct,
				quantity,
				discount_price: selectedProduct.discount_price || 0,
				description: selectedProduct.description || "",
				category_id: selectedProduct.category_id || "",
				star: selectedProduct.star || 0,
				vote: selectedProduct.vote || 0,
			};

			dispatch(setProducts(updatedProducts));
			toast.success("Product quantity updated");
		} else {
			dispatch(addProduct({ ...selectedProduct, quantity }));
			toast.success("Product added successfully");
		}

		setShowQuantityModal(false);
	};

	const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(e.target.value) || 0;
		if (value >= 0 && value <= selectedProduct?.quantity) {
			setQuantity(value);
		}
	};

	const handleIncrement = () => {
		if (quantity < selectedProduct?.quantity) {
			setQuantity((prev) => prev + 1);
		}
	};

	const handleDecrement = () => {
		if (quantity > 1) {
			setQuantity((prev) => prev - 1);
		}
	};

	const handleToHome = () => {
		navigate("/", { replace: true });
		setShowModal(false);
		localStorage.removeItem("sessionExpired");
		localStorage.removeItem("sessionStart");
	};
	useEffect(() => {
		if (localStorage.getItem("sessionExpired") === "true") {
			handleToHome();
		}
		const timeoutDuration = 10 * 60 * 1000;
		const sessionStart = localStorage.getItem("sessionStart");
		if (sessionStart) {
			const elapsedTime = Date.now() - parseInt(sessionStart, 10);
			if (elapsedTime >= timeoutDuration) {
				setShowModal(true);
				localStorage.removeItem("bookingData");
			} else {
				setTimeout(() => {
					setShowModal(true);
					localStorage.removeItem("bookingData");
					localStorage.setItem("sessionExpired", "true");
				}, timeoutDuration - elapsedTime);
			}
		} else {
			localStorage.setItem("sessionStart", Date.now().toString());
			setTimeout(() => {
				setShowModal(true);
				localStorage.removeItem("bookingData");
				localStorage.setItem("sessionExpired", "true");
			}, timeoutDuration);
		}
	}, []);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setShowModal(false);
				setShowQuantityModal(false);
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	return (
		<div className="container mx-auto relative min-h-screen">
			{/* Header */}
			<BookingHeader />
			<div className="relative container mx-auto">
				{/* Main Content */}
				<div className="container relative min-h-screen flex flex-col lg:flex-row justify-center gap-20 my-36 mb-8">
					<div className="w-full 2xl:w-3/5 xl:w-3/5">
						<Outlet />
					</div>
					{/* BookingCart */}
					<div className="">
						<BookingCart />
					</div>
				</div>

				{/* Product List */}
				{!service_id ? (
					<div className="flex flex-col items-center justify-center p-8 border-t-2">
						<img
							src="../../public/box.png"
							className="w-12"
							alt="Please choose a service first"
						></img>
						<p className="mt-4 text-gray-500">
							Please choose a service first for recommended products
						</p>
					</div>
				) : (
					<CardList
						title="Recommended products"
						items={productsList}
						renderItem={(product) => {
							const isAdded = selectedProducts?.some(
								(item) => item._id === product._id,
							);
							return (
								<div
									className={`relative ${isAdded ? "border border-blue-500 rounded-md" : ""}`}
								>
									<CardItem
										key={product._id}
										name={product.name}
										address={product.description}
										img={product.images[0]}
										category={product.product_category?.name || "Unknown"}
										star={product.price}
										vote={product.discount_price}
										onClick={() => {
											handleAddProduct({
												...product,
												category_id: product.product_category?._id || "",
												star: 0,
												vote: 0,
											});
										}}
										ratingComponent={
											<div className="flex items-center gap-4 text-sm my-2">
												<span className="text-gray-500 line-through">
													{new Intl.NumberFormat("vi-VN", {
														style: "currency",
														currency: "VND",
													}).format(product.price)}
												</span>
												<span className="bg-yellow-200 text-red-500 font-semibold px-3 py-1 rounded-full">
													{new Intl.NumberFormat("vi-VN", {
														style: "currency",
														currency: "VND",
													}).format(product.discount_price)}
												</span>
											</div>
										}
									/>
									{isAdded && (
										<span className="absolute top-0 right-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-sm">
											Added
										</span>
									)}
								</div>
							);
						}}
					/>
				)}

				{/* Kiểm tra nếu không có service */}

				{/* Kiểm tra nếu có service nhưng không có sản phẩm */}
				{service_id && productsList.length === 0 && (
					<div className="flex flex-col items-center justify-center p-8">
						<img
							src="../../public/box.png"
							className="w-10"
							alt="No products available"
						></img>
						<p className="mt-4 text-gray-500">No products available</p>
					</div>
				)}
			</div>
			{showModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white p-6 rounded-lg shadow-lg">
						<h2 className="text-lg font-semibold mb-4">Session timeout</h2>
						<p>Please book your services again</p>
						<div className="mt-4 flex justify-end space-x-3">
							<button
								className="px-4 py-2 bg-red-500 text-white rounded-md transition-all duration-300 hover:bg-red-400 "
								onClick={handleToHome}
							>
								Home
							</button>
						</div>
					</div>
				</div>
			)}
			{showQuantityModal && selectedProduct && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white p-6 rounded-lg shadow-lg w-96">
						<h2 className="text-lg font-semibold mb-4">
							{selectedProduct.name}
						</h2>
						<p className="mb-4">
							Select quantity (Max: {selectedProduct.quantity})
						</p>

						<div className="flex items-center justify-center space-x-4 mb-6">
							<button
								onClick={handleDecrement}
								className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
							>
								-
							</button>

							<input
								type="number"
								value={quantity}
								onChange={handleQuantityChange}
								className="w-20 text-center border rounded-md py-2"
								min="1"
								max={selectedProduct.quantity}
							/>

							<button
								onClick={handleIncrement}
								className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
							>
								+
							</button>
						</div>

						<div className="flex justify-end space-x-3">
							<button
								className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-400"
								onClick={() => setShowQuantityModal(false)}
							>
								Cancel
							</button>
							<button
								className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400"
								onClick={handleConfirmAdd}
							>
								Add
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default BookingLayout;
