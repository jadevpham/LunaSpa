import type { FC } from "react";
import { useState } from "react";

type DetailItemProps = {
	title: string;
	namePri: string;
	nameSec: React.ReactNode;
	nameSec2: string[];
	nameSec3: string;
	items?: Array<{ id: string; name: string; address: string }>;
	items2?: Array<{
		id: string;
		name: string;
		// openingHours: { day: string; open: string; close: string }[];
		day: string;
		open: string;
		close: string;
		isOpen: boolean;
		isBold: boolean;
	}>;
	nameThir: string;
	priceMin: number;
	priceMax: number;
	durationsNameMin: string;
	durationsNameMax: string;
	address: string;
	image: string;
	day: string;
	opening_hours: string;
	close_hours: string;
};

const DetailItem: FC<DetailItemProps> = ({
	title,
	namePri,
	nameSec,
	nameSec2,
	nameSec3,
	items,
	items2,
	nameThir,
	priceMin,
	priceMax,
	durationsNameMin,
	durationsNameMax,
	address,
	image,
	day,
	opening_hours,
	close_hours,
}) => {
	const [selectedItem, setSelectedItem] = useState<string | null>(null);
	return (
		<>
			<div className="container w-full mx-auto relative">
				<div className="flex flex-col gap-2">
					{/* Tiêu đề */}
					<h1 className="text-3xl font-bold">{namePri}</h1>

					{/* Dòng thông tin */}
					<div className="flex items-center gap-4 text-gray-700 text-lg">
						{/* Giá */}
						<p className="bg-gradient-to-r from-yellow-500 to-orange-600 bg-clip-text text-transparent font-bold">
							From{" "}
							{new Intl.NumberFormat("vi-VN", {
								style: "currency",
								currency: "VND",
							}).format(priceMin)}
						</p>

						{/* Giờ mở cửa */}
						<span className="bg-gradient-to-r from-blue-600 to-teal-400 bg-clip-text text-transparent font-semibold">
							• Open {day}: {opening_hours}AM - {close_hours}PM
						</span>

						{/* Tên Branch */}
						<span className="text-green-700 font-medium">• {nameSec}</span>

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
							<div className="flex gap-2 mt-4 flex-wrap">
								{nameSec2?.length > 0 &&
									nameSec2.map((name, index) => (
										<span
											key={index}
											className="bg-gray-200 px-3 py-1 rounded-full text-sm"
										>
											{name}
										</span>
									))}
							</div>
							{/* Branch List */}
							<div className="mt-4 space-y-4">
								{items?.map((item) => {
									console.log("Mapping items:", items);
									console.log("Mapping item:", item);
									console.log("Item ID:", item.id); // Kiểm tra ID
									return (
										<div
											key={item.id}
											className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:bg-gray-100 transition cursor-pointer"
											onClick={() => {
												if (!item.id) {
													console.error("Item ID is undefined:", item);
													return;
												}
												const newSelected =
													item.id === selectedItem ? null : item.id;
												console.log("Clicked item ID:", item.id);
												console.log("New selectedItem:", newSelected);
												setSelectedItem(newSelected);
												console.log("SelectedItem:", selectedItem);
											}}
										>
											<div>
												<h3 className="text-xl font-bold">{item.name}</h3>
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
													{item.address}
												</p>
											</div>
											<button className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full">
												Book
											</button>
										</div>
									);
								})}
							</div>
						</div>
						{/* code phần sau vào đây */}
						{selectedItem && (
							<div className="p-4 border rounded-lg bg-gray-50">
								<h2 className="text-xl font-bold mb-2">Opening times</h2>
								<div className="space-y-2">
									{items2
										?.filter((item) => item.id === selectedItem)
										?.map((item) => (
											<div
												key={item.id}
												className="flex justify-between items-center"
											>
												<div className="flex items-center gap-2">
													<span
														className={`w-3 h-3 rounded-full ${
															item.isOpen ? "bg-green-500" : "bg-gray-400"
														}`}
													></span>
													<span className={item.isBold ? "font-bold" : ""}>
														{item.day}
													</span>
												</div>
												<span
													className={
														item.isBold ? "font-bold" : "text-gray-600"
													}
												>
													{/* {item.open} - {item.close} */}
													{item.open && item.close
														? `${item.open} - ${item.close}`
														: "Closed"}
												</span>
											</div>
										))}
								</div>
							</div>
						)}
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
								<p className="text-base font-bold flex items-center gap-2">
									<i className="fa-solid fa-spa"></i> {nameSec3}
								</p>
								<p className="flex items-center gap-2 text-green-600 font-medium">
									<i className="fa-solid fa-clock"></i> Open until {close_hours}{" "}
									- {day}
								</p>
								<p className="flex items-center gap-2">
									<i className="fa-solid fa-location-dot"></i> {address}
								</p>
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
