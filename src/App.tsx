import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import AuthPage from "./pages/AuthPage";
import Header from "./components/Header";
import BranchesList from "./components/BranchesList";

// Cấu hình Redux
import { Provider } from "react-redux";
import { store } from "./redux/store";

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

	return (
		<BrowserRouter>
			<Provider store={store}>
				<HeaderWrapper />
				<BranchesWrapper />
				<Routes>
					<Route
						path="/"
						element={<h1 className="text-red-500">Hello, React!</h1>}
					/>
					<Route path="/auth/*" element={<AuthPage />} />
				</Routes>
				<FooterWrapper />
			</Provider>
		</BrowserRouter>
	);
};

export default App;
