import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AuthPage from "./pages/AuthPage";
import ServicesPage from "./pages/ServicesPage";
import ProfessionalPage from "./pages/ProfessionalPage";
import TimePage from "./pages/TimePage";
import ConfirmPage from "./pages/ConfirmPage";
import BookingLayout from "./layouts/BookingLayout";
const App = () => {
	const HIDDEN_PATHS = ["/auth", "/book"];

	const FooterWrapper = () => {
		const location = useLocation();
		return (
			!HIDDEN_PATHS.some((path) => location.pathname.startsWith(path)) && (
				<Footer />
			)
		);
	};

	const HeaderWrapper = () => {
		const location = useLocation();
		return (
			!HIDDEN_PATHS.some((path) => location.pathname.startsWith(path)) && (
				<Header />
			)
		);
	};

	return (
		<BrowserRouter>
			<HeaderWrapper />
			<Routes>
				<Route
					path="/"
					element={<h1 className="text-red-500">Hello, React!</h1>}
				/>
				<Route path="/auth/*" element={<AuthPage />} />

				{/* Booking flow */}
				<Route path="/book/*" element={<BookingLayout />}>
					<Route path="services" element={<ServicesPage />} />
					<Route path="professional" element={<ProfessionalPage />} />
					<Route path="time" element={<TimePage />} />
					<Route path="confirm" element={<ConfirmPage />} />
				</Route>
			</Routes>
			<FooterWrapper />
		</BrowserRouter>
	);
};

export default App;
