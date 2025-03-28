import React, { useEffect } from "react";
import { fetchProducts } from "../redux/productsSlice"; // ✅ Import action
import { RootState, AppDispatch } from "../redux/store"; // ✅ Import RootState để lấy dữ liệu từ Redux

// Dùng hook useSelector để lấy state từ store.ts của Redux về, hook useDispatch đưa dữ liệu lên store.ts của Redux
import { useSelector, useDispatch } from "react-redux";
import CardList from "../templates/CardList";
import CardItem from "../templates/CardItem";
import { ProductType } from "../redux/branchDetailSlice";

interface ProductsByBranchProps {
	productList: ProductType[];
}
const ProductsByBranch: React.FC<ProductsByBranchProps> = ({ productList }) => {
	return (
		<>
			<CardList
				title="Products"
				items={productList}
				customClass="bg-white rounded-lg shadow-xl"
				renderItem={(product) => (
					<CardItem
						key={product._id}
						name={product.name}
						address={product.description}
						img={product.images[0]}
						category={
							product.product_category
								? product.product_category.name
								: "Unknown"
						}
						star={product.price}
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
				)}
			/>
		</>
	);
};

export default ProductsByBranch;
