import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import _404Page from "./pages/_404Page";
import TestAdmin from "./pages/testAdmin";
import TestStudent from "./pages/testStudent";
import { AuthProvider } from "./auth-middlewares/authContext";
import ProtectedRoute from "./auth-middlewares/protectedRoute";
import GoogleAuthRedirectHandler from "./auth-middlewares/GoogleAuthRedirectHandler";

// Cấu hình Redux
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

const App = () => {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Provider store={store}>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/auth/*" element={<AuthPage />} />
						<Route path="/unauthorized" element={<_404Page />} />

						<Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
							<Route path="/admin" element={<TestAdmin />} />
						</Route>

						<Route element={<ProtectedRoute allowedRoles={["student"]} />}>
							<Route path="/student" element={<TestStudent />} />
						</Route>

						{/*booking flow */}
						<Route path="/book/*" element={<BookingLayout />}>
							<Route path="select-service" element={<SelectServicePage />} />
							<Route path="select-time" element={<SelectTimePage />} />
							<Route path="confirm" element={<ConfirmBookingPage />} />
						</Route>
						<Route path="/review-booking" element={<BookingReviewPage />} />

						<Route
							path="/auth/google/callback"
							element={<GoogleAuthRedirectHandler />}
						/>
						<Route path="*" element={<_404Page />} />
						<Route path="/search" element={<SearchPage />} />
					</Routes>
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
