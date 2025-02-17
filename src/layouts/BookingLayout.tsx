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
			<div className="flex flex-col lg:flex-row justify-between mt-28 max-w-[1200px] mx-auto w-full">
				{/* Nội dung chính */}
				<div className="w-full lg:w-1/2 p-4">
					<Outlet />
				</div>

				{/* BookingCart */}
				<div className="w-full lg:w-1/4 lg:fixed mr-40 right-0 p-4 bg-white shadow-lg">
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
