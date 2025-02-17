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
				<div className="w-full lg:w-1/2 p-4">
					<Outlet />
				</div>

				{/* BookingCart */}
				<div className="w-full lg:w-1/3 lg:sticky top-36 mt-20 border border-gray-300">
					<BookingCart
						shopName="Luxury Spa"
						rating={4.5}
						reviews={120}
						location="123 Beauty St, HK"
						date="Feb 20, 2025"
						time="10:00 AM"
						serviceName="Relaxing Massage"
						duration="60 min"
						price={500}
						total={500}
						payNow={100}
					/>
				</div>
			</div>
		</div>
	);
};

export default BookingLayout;
