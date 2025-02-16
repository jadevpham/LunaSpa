import React from "react";

const Statistics: React.FC = () => {
	return (
		<>
			<div className="bg-white text-black py-24">
				<div className="max-w-screen-xl mx-auto text-center px-6">
					{/* Tiêu đề chính */}
					<h2 className="text-4xl md:text-5xl font-bold">
						The top-rated destination for beauty and wellness
					</h2>
					<p className="text-gray-600 text-lg mt-4">
						One solution, one software. Trusted by the best in the beauty and
						wellness industry
					</p>

					{/* Chỉ số chính */}
					<div className="mt-16">
						<h1 className="text-7xl md:text-8xl font-extrabold text-blue-600">
							1 million+
						</h1>
						<p className="text-gray-600 text-lg mt-2">
							Appointments booked on LunaSpa
						</p>
					</div>

					{/* Ba chỉ số nhỏ hơn */}
					<div className="mt-16 flex flex-col md:flex-row justify-center gap-16 text-center">
						<div>
							<h3 className="text-4xl font-bold">12,000+</h3>
							<p className="text-gray-600 text-lg">Loyal Customer</p>
						</div>
						<div>
							<h3 className="text-4xl font-bold">12+ city</h3>
							<p className="text-gray-600 text-lg">Using LunaSpa</p>
						</div>
						<div>
							<h3 className="text-4xl font-bold">450+</h3>
							<p className="text-gray-600 text-lg">
								Stylists and Professionals
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Statistics;
