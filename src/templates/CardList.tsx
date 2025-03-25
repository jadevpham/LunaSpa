import React, { useRef, useState } from "react";

type CardListProps<T> = {
	items: T[];
	renderItem: (item: T) => React.ReactNode;
	title: string;
	customClass?: string;
};

const CardList = <T,>({
	items,
	renderItem,
	title,
	customClass,
}: CardListProps<T>) => {
	const scrollRef = useRef<HTMLDivElement | null>(null); // giữ tham chiếu đến danh sách card.
	// Tuy nhiên nút cuộn trái/phải chỉ trong component này thôi không ở components khác hay truyền props sang component khác nên chỉ dùng hooks useState là được
	//không cần dùng state của Redux
	const [canScrollLeft, setCanScrollLeft] = useState(false);
	const [canScrollRight, setCanScrollRight] = useState(true);

	// ✅ Kiểm tra khả năng cuộn trái/phải
	const checkScroll = () => {
		if (scrollRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
			setCanScrollLeft(scrollLeft > 0);
			setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
		}
	};

	// ✅ Hàm xử lý cuộn
	const scroll = (direction: "left" | "right") => {
		if (!scrollRef.current) return; // Kiểm tra nếu ref null

		const scrollAmount = 300; // Số pixel cuộn
		const container = scrollRef.current;
		// Kiểm tra nếu phần tử hỗ trợ cuộn
		if (typeof container.scrollBy === "function") {
			container.scrollBy({
				left: direction === "right" ? scrollAmount : -scrollAmount,
				behavior: "smooth",
			});
			setTimeout(checkScroll, 300); // Cập nhật trạng thái cuộn sau khi cuộn
		}
	};

	return (
		<div
			className={`p-6 ${customClass || "bg-gradient-to-r from-white to-purple-100"}`}
		>
			<div className="container w-full mx-auto">
				<h2 className="text-2xl font-bold mb-4">{title}</h2>
				<div className="relative">
					{/* Danh sách card */}
					<div
						ref={scrollRef}
						className="flex space-x-8 overflow-x-auto hide-scrollbar scroll-smooth snap-x"
						onScroll={checkScroll}
					>
						{items.map((item, index) => (
							<React.Fragment key={index}>{renderItem(item)}</React.Fragment>
						))}
					</div>

					{/* Nút cuộn trái */}
					<button
						className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-sm hover:bg-gray-100 transition ${
							canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"
						}`}
						onClick={() => scroll("left")}
					>
						<i className="fa-solid fa-arrow-left text-gray-500 text-xl"></i>
					</button>

					{/* Nút cuộn phải */}
					<button
						className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-sm hover:bg-gray-100 transition ${
							canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"
						}`}
						onClick={() => scroll("right")}
					>
						<i className="fa-solid fa-arrow-right text-gray-500 text-xl"></i>
					</button>
				</div>
			</div>
		</div>
	);
};

export default CardList;
