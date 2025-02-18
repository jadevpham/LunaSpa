import { APIProvider } from "@vis.gl/react-google-maps";
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
import BranchDetailPage from "./pages/BranchDetailPage";
import Home from "./pages/Home";
import { store } from "./redux/store";

const App = () => {
	return (
		<AuthProvider>
			<APIProvider
				apiKey={import.meta.env.REACT_APP_GOOGLE_MAPS_API_KEY as string}
				onLoad={() => console.log("Maps API has loaded.")}
			>
				<BrowserRouter>
					<Provider store={store}>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/auth/*" element={<AuthPage />} />
							<Route path="/unauthorized" element={<_404Page />} />
							<Route path="/branches/:id" element={<BranchDetailPage />} />

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
			</APIProvider>
		</AuthProvider>
	);
};

export default App;
