import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./authContext";
import LoadingAnimation from "../components/LoadingAnimation";

const ProtectedRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
	const { role, isAuthenticated, isLoading } = useAuth();

	console.log("Protected Route:", { role, isAuthenticated, isLoading });

	if (isLoading) {
		return <LoadingAnimation />;
	}

	if (!isAuthenticated) {
		return <Navigate to="/auth" />;
	}

	if (!allowedRoles.includes(role || "")) {
		return <Navigate to="/unauthorized" />;
	}

	return <Outlet />;
};

export default ProtectedRoute;
