import React from "react";

// ✅ Template component nhận dữ liệu động
type CardProps<T> = {
	data: T;
	name: string;
	address: string | number; // với productItem thì thay address - string bằng price - number
	img: string;
	category: string;
	star: number;
	vote: number;
};

const CardItem = <T,>({
	data,
	name,
	address,
	img,
	category,
	star,
	vote,
}: CardProps<T>) => {
	return (
		<>
			<div className="min-w-[296px] bg-white rounded-lg shadow-lg overflow-hidden snap-start">
				<img src={img} alt={name} className="w-full h-44 object-cover" />
				<div className="p-4">
					<h3 className="font-semibold text-lg">{name}</h3>
					{/* Nhớ làm sao để khi text quá d */}
					<p className="text-sm text-gray-600">
						<strong>{star} ⭐</strong> ({vote})
					</p>
					<p className="text-sm text-gray-500">{address}</p>
					<span className="inline-block mt-2 px-3 py-1 text-xs font-medium text-gray-500 bg-gray-200 rounded-full">
						{category}
					</span>
				</div>
			</div>
		</>
	);
};

export default CardItem;
