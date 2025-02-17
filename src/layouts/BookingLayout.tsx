import React from "react";
import BookingCart from "../components/BookingCart";
import BookingHeader from "../components/BookingHeader";
import { Outlet } from "react-router-dom";

const BookingLayout = () => {
	return (
		<div className="relative min-h-screen">
			{/* Header */}
			<BookingHeader />

			{/* Main container */}
			<div className="flex flex-col lg:flex-row items-start justify-between mt-28 max-w-[1200px] mx-auto w-full px-4">
				{/* Nội dung chính */}
				<div className="w-full lg:w-2/3 p-4">
					<Outlet />
				</div>

				{/* BookingCart */}
				<div className="w-full lg:w-1/3 lg:sticky top-36 mt-20 border border-gray-300">
					<BookingCart />
				</div>
			</div>
		</div>
	);
};

export default BookingLayout;
