import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import AuthPage from "./pages/AuthPage";
import Header from "./components/Header";
import BranchesList from "./components/BranchesList";
import ServicesList from "./components/ServicesList";
import ProductsList from "./components/ProductsList";
import _404Page from "./pages/_404Page";
import TestAdmin from "./pages/testAdmin";
import TestStudent from "./pages/testStudent";
import { AuthProvider } from "./auth-middlewares/authContext";
import ProtectedRoute from "./auth-middlewares/protectedRoute";
import GoogleAuthRedirectHandler from "./auth-middlewares/GoogleAuthRedirectHandler";

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
		return !location.pathname.includes("/auth") && <ProductsList />;
	};

	return (
		<AuthProvider>
			<BrowserRouter>
				<Provider store={store}>
					<HeaderWrapper />
					<ServicesWrapper />
					<BranchesWrapper />
					<ProductsWrapper />
					<Routes>
						<Route path="/" element={<Statistics />} />
						<Route path="/auth/*" element={<AuthPage />} />
						<Route path="/unauthorized" element={<_404Page />} />

						<Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
							<Route path="/admin" element={<TestAdmin />} />
						</Route>

						<Route element={<ProtectedRoute allowedRoles={["student"]} />}>
							<Route path="/student" element={<TestStudent />} />
						</Route>

						<Route
							path="/auth/google/callback"
							element={<GoogleAuthRedirectHandler />}
						/>
						<Route path="*" element={<_404Page />} />
					</Routes>
					<FooterWrapper />
				</Provider>
			</BrowserRouter>
		</AuthProvider>
	);
};

export default App;
