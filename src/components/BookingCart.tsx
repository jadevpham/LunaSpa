import React from "react";

interface BookingCartProps {
	shopName: string;
	rating: number;
	reviews: number;
	location: string;
	date: string;
	time: string;
	serviceName: string;
	duration: string;
	price: number;
	total: number;
	payNow: number;
}

const BookingCart: React.FC<BookingCartProps> = ({
	shopName,
	rating,
	reviews,
	location,
	date,
	time,
	serviceName,
	duration,
	price,
	total,
	payNow,
}) => {
	return (
		<div className="p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
			{/* Shop Info */}
			<div className="flex items-start space-x-4">
				<img
					src="/shop-image.jpg"
					alt="Shop"
					className="w-16 h-16 rounded-md object-cover"
				/>
				<div>
					<h3 className="font-semibold text-lg">{shopName}</h3>
					<p className="text-yellow-500">
						{"⭐".repeat(Math.round(rating))} ({reviews})
					</p>
					<p className="text-gray-500 text-sm">{location}</p>
				</div>
			</div>

			{/* Booking Details */}
			<div className="mt-4 text-gray-700">
				<p className="flex items-center space-x-2">
					📅 <span>{date}</span>
				</p>
				<p className="flex items-center space-x-2 mt-1">
					⏰{" "}
					<span>
						{time} ({duration})
					</span>
				</p>
			</div>

			{/* Service & Price */}
			<div className="mt-4 border-t pt-4">
				<p className="text-gray-700 font-medium">{serviceName}</p>
				<p className="text-gray-500 text-sm">
					{duration} with any professional
				</p>
				<p className="font-semibold">HK${price}</p>
			</div>

			{/* Payment Info */}
			<div className="mt-4 border-t pt-4">
				<div className="flex justify-between text-gray-700">
					<span>Total</span>
					<span className="font-semibold">from HK${total}</span>
				</div>
				<div className="flex justify-between mt-1 text-green-600 font-medium">
					<span>Pay now</span>
					<span>HK${payNow}</span>
				</div>
				<p className="text-gray-500 text-sm">Pay at venue from HK${total}</p>
			</div>

			{/* Confirm Button */}
			<button className="w-full bg-black text-white py-3 mt-4 rounded-md">
				Confirm
			</button>
		</div>
	);
};

export default BookingCart;
