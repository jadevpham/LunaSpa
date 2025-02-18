import BranchesList from "../components/BranchesList";
import Footer from "../components/Footer";
import Header from "../components/Header";
import {
	default as ProductsList,
	default as ServicesList,
} from "../components/ServicesList";
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
