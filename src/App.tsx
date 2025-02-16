import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import AuthPage from "./pages/AuthPage";
import Header from "./components/Header";
import _404Page from "./pages/_404Page";
import TestAdmin from "./pages/testAdmin";
import TestStudent from "./pages/testStudent";
import { AuthProvider } from "./auth-middlewares/authContext";
import ProtectedRoute from "./auth-middlewares/protectedRoute";
import GoogleAuthRedirectHandler from "./auth-middlewares/GoogleAuthRedirectHandler";

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
		<AuthProvider>
			<BrowserRouter>
				<HeaderWrapper />
				<Routes>
					<Route
						path="/"
						element={<h1 className="text-red-500">Hello, React!</h1>}
					/>
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
			</BrowserRouter>
		</AuthProvider>
	);
};

export default App;
