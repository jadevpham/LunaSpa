import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import AuthPage from "./pages/AuthPage";
import Header from "./components/Header";

const App = () => {
	const FooterWrapper = () => {
		const location = useLocation();
		return !location.pathname.includes("/auth") && <Footer />;
	};

	const HeaderWrapper = () => {
		const location = useLocation();
		return !location.pathname.includes("/auth") && <Header />;
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
			</Routes>
			<FooterWrapper />
		</BrowserRouter>
	);
};

export default App;
