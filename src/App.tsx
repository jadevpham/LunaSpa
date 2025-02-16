import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import AuthPage from "./pages/AuthPage";
import Header from "./components/Header";
import BranchesList from "./components/BranchesList";
import ServicesList from "./components/ServicesList";
import ProductsList from "./components/ProductsList";

// Cấu hình Redux
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Statistics from "./components/Statistics";

const App = () => {
	const FooterWrapper = () => {
		const location = useLocation();
		return !location.pathname.includes("/auth") && <Footer />;
	};

	const HeaderWrapper = () => {
		const location = useLocation();
		return !location.pathname.includes("/auth") && <Header />;
	};

	const BranchesWrapper = () => {
		const location = useLocation();
		return !location.pathname.includes("/auth") && <BranchesList />;
	};

	const ServicesWrapper = () => {
		const location = useLocation();
		return !location.pathname.includes("/auth") && <ServicesList />;
	};

	const ProductsWrapper = () => {
		const location = useLocation();
		return (
			!location.pathname.includes("/auth") && <ProductsList />
		);
	};

	return (
		<BrowserRouter>
			<Provider store={store}>
				<HeaderWrapper />
				<ServicesWrapper />
				<BranchesWrapper />
				<ProductsWrapper />
				<Routes>
					<Route
						path="/"
						element={<Statistics />}
					/>
					<Route path="/auth/*" element={<AuthPage />} />
				</Routes>
				<FooterWrapper />
			</Provider>
		</BrowserRouter>
	);
};

export default App;
