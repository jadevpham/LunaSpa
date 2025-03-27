import React, { useEffect } from "react";
import { fetchProductsByService } from "../redux/productsByServiceSlice"; // ✅ Import action
import { RootState, AppDispatch } from "../redux/store"; // ✅ Import RootState để lấy dữ liệu từ Redux

// Dùng hook useSelector để lấy state từ store.ts của Redux về, hook useDispatch đưa dữ liệu lên store.ts của Redux
import { useSelector, useDispatch } from "react-redux";
import CardList from "../templates/CardList";
import CardItem from "../templates/CardItem";
import { useTranslation } from "react-i18next";
const ProductsByServiceList: React.FC = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch<AppDispatch>(); // ✅ Khai báo dispatch kiểu AppDispatch

	// Lấy dữ liệu từ Redux Store
	const productsByServiceList = useSelector(
		(state: RootState) => state.productsByService.productsByServiceList,
	);
	const loading = useSelector(
		(state: RootState) => state.productsByService.loading,
	);
	const error = useSelector(
		(state: RootState) => state.productsByService.error,
	);

	// Gọi API khi component mount
	useEffect(() => {
		dispatch(fetchProductsByService());
	}, [dispatch]);

	if (loading) return <p>{t("Đang tải dữ liệu...")}</p>;
	if (error) return <p className="text-red-500">{error}</p>;

	return (
		<>
			<CardList
				title={t("Products")}
				items={productsByServiceList}
				renderItem={(productsByService) =>
					productsByService.product?.map((product) => (
						<CardItem
							key={product.id}
							// data={product}
							name={product.name}
							address={product.description}
							img={product.images}
							category={`Quantity: ${product.quantity}`} // chờ data sửa xong rồi thay bằng categories của products
							star={product.discount_price}
							vote={product.discount_price}
							ratingComponent={
								<div className="flex items-center gap-4 text-sm my-2">
									<span className="text-gray-500 line-through">
										{new Intl.NumberFormat("vi-VN", {
											style: "currency",
											currency: "VND",
										}).format(product.price)}
									</span>
									<span className="bg-yellow-200 text-red-500 font-semibold px-3 py-1 rounded-full">
										{new Intl.NumberFormat("vi-VN", {
											style: "currency",
											currency: "VND",
										}).format(product.discount_price)}
									</span>
								</div>
							}
						/>
					))
				}
			/>
		</>
	);
};

export default ProductsByServiceList;
