import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import { AuthProvider } from "./auth-middlewares/authContext";
import ProtectedRoute from "./auth-middlewares/protectedRoute";
import AuthRedirectHandler from "./auth-middlewares/AuthRedirectHandler";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import BookingLayout from "./layouts/BookingLayout";
import SelectServicePage from "./pages/SelectServicePage";
import { ToastContainer } from "react-toastify";
import SelectTimePage from "./pages/SelectTimePage";
import ConfirmBookingPage from "./pages/ConfirmBookingPage";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import BookingReviewPage from "./pages/BookingReviewPage";
import { useEffect } from "react";
import UserProfile from "./pages/UserProfile";
import BookingHistory from "./pages/BookingHistory";
import EmailVerification from "./pages/EmailVerification";
import NotFoundPage from "./pages/_404Page";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

const RouteHandler = () => {
	const location = useLocation();

	useEffect(() => {
		if (!location.pathname.startsWith("/book")) {
			localStorage.removeItem("sessionExpired");
			localStorage.removeItem("sessionStart");
		}
	}, [location]);

	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/auth/*" element={<AuthPage />} />
			<Route path="/unauthorized" element={<NotFoundPage />} />
			<Route path="/email-verifications" element={<EmailVerification />} />
			<Route path="/forgot-password" element={<ForgotPasswordPage />} />
			<Route path="/reset-password" element={<ResetPasswordPage />} />

			<Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
				{/* <Route path="/admin" element={<BookingHistory />} /> */}
			</Route>

			<Route element={<ProtectedRoute allowedRoles={["user", "admin"]} />}>
				{/* <Route path="/user-profile" element={<UserProfile />} /> */}
			</Route>

			<Route
				element={
					<ProtectedRoute allowedRoles={["user"]} requireVerified={true} />
				}
			>
				<Route path="/book/*" element={<BookingLayout />}>
					<Route path="select-service" element={<SelectServicePage />} />
					<Route path="select-time" element={<SelectTimePage />} />
					<Route path="confirm" element={<ConfirmBookingPage />} />
				</Route>
			</Route>
			<Route path="/review-booking" element={<BookingReviewPage />} />

			<Route path="/login/*" element={<AuthRedirectHandler />} />
			<Route path="*" element={<NotFoundPage />} />
			<Route path="/search" element={<SearchPage />} />
		</Routes>
	);
};

const App = () => {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Provider store={store}>
					<RouteHandler />
					<ToastContainer
						autoClose={3000}
						position="top-right"
						theme="colored"
						limit={5}
						closeButton={false}
						draggable={true}
						closeOnClick={true}
						draggableDirection="x"
						newestOnTop={true}
						stacked={true}
					/>
				</Provider>
			</BrowserRouter>
		</AuthProvider>
	);
};

export default App;
