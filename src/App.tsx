import {
	BrowserRouter,
	Routes,
	Route,
	useLocation,
	Navigate,
} from "react-router-dom";
import AuthPage from "./pages/AuthPages/AuthPage";
import { AuthProvider } from "./auth-middlewares/authContext";
import ProtectedRoute from "./auth-middlewares/protectedRoute";
import AuthRedirectHandler from "./auth-middlewares/authRedirectHandler";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import BookingLayout from "./layouts/BookingLayout";
import SelectServicePage from "./pages/SelectServicePage";
import { ToastContainer } from "react-toastify";
import SelectTimePage from "./pages/SelectTimePage";
import ConfirmBookingPage from "./pages/ConfirmBookingPage";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import PaymentPage from "./pages/PaymentPage";
import { useEffect } from "react";
// import UserProfile from "./pages/UserProfile";
// import BookingHistory from "./pages/BookingHistory";
import EmailVerification from "./pages/EmailVerification";
import NotFoundPage from "./pages/_404Page";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import OrdersPage from "./pages/AdminPages/Orders/OrdersPage";
import AdminLayout from "./layouts/AdminLayout";
import UsersPage from "./pages/AdminPages/Users/UsersPage";
import RevenuesPage from "./pages/AdminPages/Revenue/RevenuesPage";
import DashboardPage from "./pages/AdminPages/Revenue/DashboardPage";
import CreateNewUser from "./pages/AdminPages/Users/CreateNewUser";
import UsersManagementPage from "./pages/AdminPages/Users/UsersManagementPage";
import ServicesManagement from "./pages/AdminPages/Services/ServicesManagement";
import CreateNewService from "./pages/AdminPages/Services/CreateNewService";
import CategoriesManagement from "./pages/AdminPages/Categories/CategoriesManagement";
import CreateNewCategory from "./pages/AdminPages/Categories/CreateNewCategory";
import BranchesManagement from "./pages/AdminPages/Branches/BranchesManagement";
import CreateNewBranch from "./pages/AdminPages/Branches/CreateNewBranch";
import DevicesManagement from "./pages/AdminPages/Devices/DevicesManagement";
import AuthPageAdminStaff from "./pages/AuthPages/AuthPageAdminStaff";
import ServiceDetail from "./pages/ServiceDetail";

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
			<Route path="/auth" element={<AuthPage />} />
			<Route path="/auth/admin-staff" element={<AuthPageAdminStaff />} />
			<Route path="/unauthorized" element={<NotFoundPage />} />
			<Route path="/email-verifications" element={<EmailVerification />} />
			<Route path="/forgot-password" element={<ForgotPasswordPage />} />
			<Route path="/reset-password" element={<ResetPasswordPage />} />

			<Route element={<ProtectedRoute allowedRoles={["Admin"]} />}>
				<Route path="/admin/" element={<AdminLayout />}>
					<Route index element={<Navigate to="dashboard" replace />} />
					<Route path="dashboard" element={<DashboardPage />} />
					<Route path="orders" element={<OrdersPage />} />
					<Route path="users" element={<UsersPage />} />
					<Route path="revenues" element={<RevenuesPage />} />
					<Route path="devices" element={<DevicesManagement />} />

					<Route path="users">
						{/* <Route index element={<UsersPage />} /> */}
						<Route path="user-management" element={<UsersManagementPage />} />
						<Route path="create-user" element={<CreateNewUser />} />
					</Route>
					<Route path="services">
						<Route path="service-management" element={<ServicesManagement />} />
						<Route path="create-service" element={<CreateNewService />} />
					</Route>
					<Route path="categories">
						<Route
							path="category-management"
							element={<CategoriesManagement />}
						/>
						<Route path="create-category" element={<CreateNewCategory />} />
					</Route>
					<Route path="branches">
						<Route path="branch-management" element={<BranchesManagement />} />
						<Route path="create-branch" element={<CreateNewBranch />} />
					</Route>
				</Route>
			</Route>

			<Route element={<ProtectedRoute allowedRoles={["User", "Admin"]} />}>
				{/* <Route path="/user-profile" element={<UserProfile />} /> */}
			</Route>

			{/* <Route
				element={
					<ProtectedRoute
						allowedRoles={["User", "Admin"]}
						requireVerified={true}
					/>
				}
			> */}
			<Route path="/book/*" element={<BookingLayout />}>
				<Route index element={<Navigate to="select-service" replace />} />
				<Route path="select-service" element={<SelectServicePage />} />
				<Route path="select-time" element={<SelectTimePage />} />
				<Route path="confirm" element={<ConfirmBookingPage />} />
			</Route>
			{/* </Route> */}
			<Route path="/payment" element={<PaymentPage />} />

			<Route path="/login/*" element={<AuthRedirectHandler />} />
			<Route path="*" element={<NotFoundPage />} />
			<Route path="/search" element={<SearchPage />} />
			<Route path="/serviceDetail" element={<ServiceDetail />} />
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
