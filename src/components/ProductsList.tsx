import React, { useEffect } from "react";
import { fetchProducts } from "../redux/productsSlice"; // ✅ Import action
import { RootState, AppDispatch } from "../redux/store"; // ✅ Import RootState để lấy dữ liệu từ Redux

// Dùng hook useSelector để lấy state từ store.ts của Redux về, hook useDispatch đưa dữ liệu lên store.ts của Redux
import { useSelector, useDispatch } from "react-redux";
import CardList from "../templates/CardList";
import CardItem from "../templates/CardItem";
const ProductsList: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>(); // ✅ Khai báo dispatch kiểu AppDispatch

	// ✅ Lấy dữ liệu từ Redux Store
	const productsList = useSelector(
		(state: RootState) => state.products.productsList,
	);
	const loading = useSelector((state: RootState) => state.products.loading);
	const error = useSelector((state: RootState) => state.products.error);

	// ✅ Gọi API khi component mount
	useEffect(() => {
		dispatch(fetchProducts());
	}, [dispatch]);

	if (loading) return <p>Đang tải dữ liệu...</p>;
	if (error) return <p className="text-red-500">{error}</p>;

	return (
		<>
			<CardList
				title="Products"
				items={productsList}
				renderItem={(product) => (
					<CardItem
						key={product.id}
						data={product}
						name={product.name}
						address={product.price}
						img={product.img}
						category={product.category}
						star={product.star}
						vote={product.vote}
					/>
				)}
			/>
		</>
	);
};

export default ProductsList;
