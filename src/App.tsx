import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
import Home from "./pages/Home";

const App = () => {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Provider store={store}>
					<Routes>
						<Route path="/" element={<Home />} />
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
				</Provider>
			</BrowserRouter>
		</AuthProvider>
	);
};

export default App;
