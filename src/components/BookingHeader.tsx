import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
const breadcrumbs = [
	{ label: "Services", path: "/book/select-service" },
	{ label: "Time", path: "/book/select-time" },
	{ label: "Confirm", path: "/book/confirm" },
];

const BookingHeader = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const location = useLocation();
	const [showModal, setShowModal] = useState(false);

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

	const handleAbort = () => {
		setShowModal(true);
	};

	const confirmAbort = () => {
		navigate("/");
		setShowModal(false);
	};

	return (
		<>
			<div className="flex justify-between items-center p-5 bg-white shadow-md fixed top-0 left-0 w-full z-50">
				<i
					className="fa-solid fa-arrow-left cursor-pointer text-xl mx-2"
					onClick={goToPrevStep}
				></i>

				{/* Breadcrumbs */}
				<div className="flex items-center space-x-4 text-gray-500">
					{breadcrumbs.map((crumb, index) => (
						<React.Fragment key={crumb.path}>
							<span
								className={`cursor-pointer ${index <= currentStepIndex
										? "text-black font-semibold"
										: "text-gray-400"
									}`}
								onClick={() =>
									index <= currentStepIndex && navigate(crumb.path)
								}
							>
								{crumb.label}
							</span>

							{index < breadcrumbs.length - 1 && (
								<span className=" text-gray-400">
									<i className="fa-thin fa-greater-than"></i>
								</span>
							)}
						</React.Fragment>
					))}
				</div>

				<i
					className="fa-solid fa-x cursor-pointer text-xl mx-2"
					onClick={handleAbort}
				></i>

				{/* Nút Tiếp Theo
				<button
					className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:bg-gray-300"
					onClick={goToNextStep}
					disabled={currentStepIndex === breadcrumbs.length - 1}
				>
					Tiếp theo
				</button> */}
			</div>

			{showModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white p-6 rounded-lg shadow-lg">
						<h2 className="text-lg font-semibold mb-4">{t("Confirm Cancellation")}</h2>
						<p>{t("Are you sure you want to cancel the booking process?")}</p>
						<div className="mt-4 flex justify-end space-x-3">
							<button
								className="px-4 py-2 bg-gray-200 rounded-md transition-all duration-300 hover:bg-gray-300"
								onClick={() => setShowModal(false)}
							>
								{t("No")}
							</button>
							<button
								className="px-4 py-2 bg-red-500 text-white rounded-md transition-all duration-300 hover:bg-red-400 "
								onClick={confirmAbort}
							>
								{t("Yes")}
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default BookingHeader;
