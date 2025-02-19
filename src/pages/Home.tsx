import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ServicesList from "../components/ServicesList";
import BranchesList from "../components/BranchesList";
import ProductsList from "../components/ProductsList";
import Statistics from "../components/Statistics";
const Home = () => {
	return (
		<>
			<Header />
			<ServicesList />
			<BranchesList />
			<ProductsList />
			<Statistics />
			<Footer />
		</>
	);
};

export default Home;
