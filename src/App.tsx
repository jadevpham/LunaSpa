import { BrowserRouter, Route, Routes } from "react-router-dom";
import GoogleAuthRedirectHandler from "./auth-middlewares/GoogleAuthRedirectHandler";
import { AuthProvider } from "./auth-middlewares/authContext";
import ProtectedRoute from "./auth-middlewares/protectedRoute";
import AuthPage from "./pages/AuthPage";
import _404Page from "./pages/_404Page";
import TestAdmin from "./pages/testAdmin";
import TestStudent from "./pages/testStudent";

// Cấu hình Redux
import { Provider } from "react-redux";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import { store } from "./redux/store";

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

						<Route
							path="/auth/google/callback"
							element={<GoogleAuthRedirectHandler />}
						/>
						<Route path="*" element={<_404Page />} />
						<Route path="/search" element={<SearchPage />} />
					</Routes>
				</Provider>
			</BrowserRouter>
		</AuthProvider>
	);
};

export default App;
