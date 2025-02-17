import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const breadcrumbs = [
	{ label: "Services", path: "/book/services" },
	{ label: "Professional", path: "/book/professional" },
	{ label: "Time", path: "/book/time" },
	{ label: "Confirm", path: "/book/confirm" },
];

const BookingHeader = () => {
	const navigate = useNavigate();
	const location = useLocation();

	// Xác định bước hiện tại
	const currentStepIndex = breadcrumbs.findIndex(
		(b) => b.path === location.pathname,
	);

	// const goToNextStep = () => {
	// 	if (currentStepIndex < breadcrumbs.length - 1) {
	// 		navigate(breadcrumbs[currentStepIndex + 1].path);
	// 	}
	// };

	const goToPrevStep = () => {
		if (currentStepIndex > 0) {
			navigate(breadcrumbs[currentStepIndex - 1].path);
		}
	};

	return (
		<div className="flex justify-between items-center p-5 bg-white shadow-md fixed top-0 left-0 w-full z-50">
			<i
				className="fa-solid fa-arrow-left cursor-pointer text-xl mx-2"
				onClick={goToPrevStep}
			></i>

			{/* Breadcrumbs */}
			<div className="flex items-center space-x-2 text-gray-500">
				{breadcrumbs.map((crumb, index) => (
					<span
						key={crumb.path}
						className={`cursor-pointer ${
							index <= currentStepIndex
								? "text-black font-semibold"
								: "text-gray-400"
						}`}
						onClick={() => index <= currentStepIndex && navigate(crumb.path)}
					>
						{crumb.label} {index < breadcrumbs.length - 1 && ">"}
					</span>
				))}
			</div>

			<i className="fa-solid fa-x cursor-pointer text-xl mx-2"></i>

			{/* Nút Tiếp Theo
			<button
				className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:bg-gray-300"
				onClick={goToNextStep}
				disabled={currentStepIndex === breadcrumbs.length - 1}
			>
				Tiếp theo
			</button> */}
		</div>
	);
};

export default BookingHeader;
