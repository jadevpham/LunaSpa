import BranchesList from "../components/BranchesList";
import Footer from "../components/Footer";
<<<<<<< HEAD:src/pages/Home.tsx
import Header from "../components/Header";
import {
	default as ProductsList,
	default as ServicesList,
} from "../components/ServicesList";
=======
import ServicesList from "../components/ServicesList";
import BranchesList from "../components/BranchesList";
import ProductsList from "../components/ProductsList";
>>>>>>> main:src/pages/HomePage.tsx
import Statistics from "../components/Statistics";
const HomePage = () => {
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

export default HomePage;
