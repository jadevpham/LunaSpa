import { useEffect } from "react";
import BookingCart from "../components/BookingCart";
import BookingHeader from "../components/BookingHeader";
import { Outlet, useNavigate } from "react-router-dom";

const BookingLayout = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const timeoutDuration = 15 * 60 * 1000;
		// const startTime = Date.now();

		const sessionTimeout = setTimeout(() => {
			console.log("Session timeout reached");
			alert("Session timeout reached. Please refresh the page to continue.");
			navigate("/");
			localStorage.removeItem("bookingData");
		}, timeoutDuration);

		const interval = setInterval(() => {
			// const elapsedTime = Date.now() - startTime;
			// const remainingTime = timeoutDuration - elapsedTime;
			// console.log(
			// 	`Remaining time: ${Math.round(remainingTime / 1000)} seconds`,
			// );
		}, 1000);

		return () => {
			clearTimeout(sessionTimeout);
			clearInterval(interval);
		};
	}, [navigate]);
	return (
		<div className="container mx-auto relative min-h-screen">
			{/* Header */}
			<BookingHeader />

			<div className="container relative min-h-screen flex flex-col lg:flex-row justify-center gap-20 my-36">
				{/* <div className="container relative min-h-screen flex flex-col lg:flex-row gap-20 mt-6"> */}

				<div className="w-full 2xl:w-3/5 xl:w-3/5">
					<Outlet />
				</div>
				{/* BookingCart */}
				<div className="">
					<BookingCart />
				</div>
			</div>
		</div>
	);
};

export default BookingLayout;
