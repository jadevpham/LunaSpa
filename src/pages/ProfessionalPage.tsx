import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ProfessionalPage = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const selectedService = location.state?.selectedService;
	console.log(selectedService);

	return (
		<div className="p-5">
			<h2 className="text-2xl font-bold">Chọn chuyên gia</h2>
			<div className="mt-4 space-y-3">
				<button
					className="block bg-gray-200 p-3 rounded w-full text-left"
					onClick={() => navigate("/book/time")}
				>
					👨‍⚕️ Thợ A
				</button>
				<button
					className="block bg-gray-200 p-3 rounded w-full text-left"
					onClick={() => navigate("/book/time")}
				>
					👩‍⚕️ Thợ B
				</button>
			</div>
		</div>
	);
};

export default ProfessionalPage;
