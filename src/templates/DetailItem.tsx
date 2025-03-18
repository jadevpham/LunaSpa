import type { FC } from "react";

type DetailItemProps = {
	title: string;
	namePri: string;
	nameSec: string;
	nameThir: string;
	priceMin: number;
	priceMax: number;
	durationsNameMin: string;
	durationsNameMax: string;
	address: string;
	image: string;
	opening_hours: string;
};

const DetailItem: FC<DetailItemProps> = ({
	title,
	namePri,
	nameSec,
	nameThir,
	priceMin,
	priceMax,
	durationsNameMin,
	durationsNameMax,
	address,
	image,
	opening_hours,
}) => {
	return (
		<>
			<div className="container w-full mx-auto relative">
				<div className="flex flex-col gap-2">
					{/* Tiêu đề */}
					<h1 className="text-3xl font-bold">{namePri}</h1>

					{/* Dòng thông tin */}
					<div className="flex items-center gap-4 text-gray-700">
						{/* Giá */}
						<div className="flex items-center gap-1">
							<p className="text-gray-800 font-semibold">
								From{" "}
								{new Intl.NumberFormat("vi-VN", {
									style: "currency",
									currency: "VND",
								}).format(priceMin)}
							</p>
						</div>

						{/* Giờ mở cửa */}
						<span className="text-gray-600">• Open until {opening_hours}</span>

						{/* Tên Branch */}
						<span className="text-gray-600">• {nameSec}</span>

						{/* Link chỉ đường */}
						<a href="#" className="text-blue-600 hover:underline">
							Get directions
						</a>
					</div>
				</div>

				{/* Hero Section */}
				<div className="grid grid-cols-3 gap-4">
					<div className="col-span-2">
						<img
							src={image}
							alt={namePri}
							className="w-full h-80 object-cover rounded-lg"
						/>
					</div>
					<div className="flex flex-col gap-8">
						<img
							src={image}
							alt={namePri}
							className="w-full h-36 object-cover rounded-lg"
						/>
						<img
							src={image}
							alt={namePri}
							className="w-full h-36 object-cover rounded-lg"
						/>
					</div>
				</div>
				<div className="flex justify-between mt-6">
					{/* Phần thông tin chính */}
					<div className="w-2/3 mt-6">
						{/* Services Section */}
						<div>
							<h2 className="text-2xl font-bold">{title}</h2>

							{/* Đoạn này thay bằng list branhes */}
							<div className="flex gap-2 mt-4">
								<span className="bg-gray-200 px-3 py-1 rounded-full text-sm">
									{nameSec}
								</span>
								<span className="bg-gray-200 px-3 py-1 rounded-full text-sm">
									{nameSec}
								</span>
								<span className="bg-gray-200 px-3 py-1 rounded-full text-sm">
									{nameSec}
								</span>
								<span className="bg-gray-200 px-3 py-1 rounded-full text-sm">
									{nameSec}
								</span>
							</div>
							{/* Branch List */}
							<div className="mt-4 space-y-4">
								{[1, 2, 3, 4].map((service) => (
									<div
										key={service}
										className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-200"
									>
										<div>
											<h3 className="text-xl font-bold">{nameSec}</h3>
											<p className="text-sm text-gray-500">
												{durationsNameMin} - {durationsNameMax}
											</p>
											<p className="text-gray-800 font-semibold">
												From{" "}
												{new Intl.NumberFormat("vi-VN", {
													style: "currency",
													currency: "VND",
												}).format(priceMin)}
											</p>
											<p className="flex items-start gap-2 text-gray-600">
												{" "}
												{address}
											</p>
										</div>
										<button className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full">
											Book
										</button>
									</div>
								))}
							</div>
						</div>
						{/* code phần sau vào đây */}
					</div>
					{/* Thẻ thông tin cuộn theo vùng nhìn, dành cho branch có cg đó nhất */}
					<div className="w-1/3 max-h-[80vh] overflow-hidden sticky top-20 ml-auto p-6">
						<div className="rounded-[8px] border border-solid border-gray-200 shadow-full p-6">
							<h2 className="text-2xl font-bold">{namePri}</h2>
							<div className="flex items-center gap-2 mt-2">
								<p className="text-sm text-gray-500">{nameThir}</p>
								{/* tên thiết bị */}
							</div>
							<div className="flex gap-2 mt-3">
								<span className="text-red-400 font-semibold py-1 rounded-full">
									{new Intl.NumberFormat("vi-VN", {
										style: "currency",
										currency: "VND",
									}).format(priceMin)}
								</span>
								<span className="text-red-500 font-semibold py-1 rounded-full">
									-
								</span>
								<span className="text-red-400 font-semibold py-1 rounded-full">
									{new Intl.NumberFormat("vi-VN", {
										style: "currency",
										currency: "VND",
									}).format(priceMax)}
								</span>
							</div>
							<button className="bg-black text-white w-full py-3 rounded-lg mt-4 font-medium">
								Book now
							</button>
							<div className="border-t my-4"></div>
							<div className="text-gray-700 text-sm space-y-2">
								<p className="flex items-center gap-2 text-green-600 font-medium">
									⏰ Open until {opening_hours}
								</p>
								<p className="flex items-start gap-2">📍 {address}</p>
								<a href="#" className="text-blue-600 font-medium">
									Get directions
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default DetailItem;
