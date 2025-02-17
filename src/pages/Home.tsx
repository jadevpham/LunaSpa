import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ServicesList from "../components/ServicesList";
import BranchesList from "../components/ServicesList";
import ProductsList from "../components/ServicesList";
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
