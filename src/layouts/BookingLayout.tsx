import { useEffect, useState } from "react";
import BookingCart from "../components/BookingCart";
import BookingHeader from "../components/BookingHeader";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { addProduct } from "../redux/bookingSlice";
import { toast } from "react-toastify";
import CardList from "../templates/CardList";
import CardItem from "../templates/CardItem";

const BookingLayout = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [showModal, setShowModal] = useState(false);
	const productsList = useSelector(
		(state: RootState) => state.products.productsList,
	);
	const selectedProducts = useSelector(
		(state: RootState) => state.booking.selectedProducts,
	);

	const handleAddProduct = (product: any) => {
		dispatch(addProduct(product));
		toast.success("Product added successfully");
	};
	const unselectedProducts = productsList.filter(
		(product) =>
			!selectedProducts?.some(
				(selectedProduct) => selectedProduct.id === product.id,
			),
	);

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
				<CardList
					title="Recommended products"
					items={unselectedProducts}
					customClass="bg-white rounded-lg shadow-xl"
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
								handleAddProduct(product);
							}}
						/>
					)}
				/>
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
		</div>
	);
};

export default BookingLayout;
