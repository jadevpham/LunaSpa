import type { FC } from "react";

type CardProps = {
	name: string;
	address: string | number;
	img: string;
	category: string;
	star: number;
	vote: number;
	onClick?: () => void;
};

const CardItem: FC<CardProps> = ({
	name,
	address,
	img,
	category,
	star,
	vote,
	onClick,
}) => {
	return (
		<div
			className="min-w-[296px] bg-white rounded-lg shadow-lg overflow-hidden snap-start"
			onClick={onClick}
		>
			<img src={img} alt={name} className="w-full h-44 object-cover" />
			<div className="p-4">
				<h3 className="font-semibold text-lg">{name}</h3>
				<p className="text-sm text-gray-600">
					<strong>{star} ⭐</strong> ({vote})
				</p>
				<p className="text-sm text-gray-500">{address}</p>
				<span className="inline-block mt-2 px-3 py-1 text-xs font-medium text-gray-500 bg-gray-200 rounded-full">
					{category}
				</span>
			</div>
		</div>
	);
};
export default CardItem;
