import React from "react";
import { useNavigate } from "react-router-dom";

const TimePage = () => {
	const navigate = useNavigate();

	return (
		<div className="p-5">
			<h2 className="text-2xl font-bold">Chọn thời gian</h2>
			<div className="mt-4 space-y-3">
				<button
					className="block bg-gray-200 p-3 rounded w-full text-left"
					onClick={() => navigate("/book/confirm")}
				>
					🕒 10:00 AM
				</button>
				<button
					className="block bg-gray-200 p-3 rounded w-full text-left"
					onClick={() => navigate("/book/confirm")}
				>
					🕒 2:00 PM
				</button>
			</div>
		</div>
	);
};

export default TimePage;
