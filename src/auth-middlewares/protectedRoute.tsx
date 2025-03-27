import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./useAuth";
import LoadingAnimation from "../components/LoadingAnimation";
import { toast } from "react-toastify";
import { useState } from "react";

const ProtectedRoute = ({
	allowedRoles,
	requireVerified,
}: {
	allowedRoles: string[];
	requireVerified?: boolean;
}) => {
	const { role, isAuthenticated, isLoading, verify } = useAuth();
	const [hasShownToast, setHasShownToast] = useState(false);
	const { logout } = useAuth();
	console.log("Protected Route:", { role, isAuthenticated, isLoading, verify });

	if (isLoading) {
		return <LoadingAnimation />;
	}

	if (!isAuthenticated) {
		if (!hasShownToast) {
			toast.error("Please login to continue");
			setHasShownToast(true);
			logout();
		}
		return <Navigate to="/auth" replace />;
	}

	if (verify === 2) {
		if (!hasShownToast) {
			toast.error("Your account has been deleted");
			setHasShownToast(true);
			logout();
		}
		return <Navigate to="/auth" replace />;
	}

	if (verify === 3) {
		if (!hasShownToast) {
			toast.error("Your account has been banned");
			setHasShownToast(true);
			logout();
		}
		return <Navigate to="/auth" replace />;
	}

	if (!allowedRoles.includes(role || "")) {
		if (!hasShownToast) {
			toast.error("You are not authorized to access this page");
			setHasShownToast(true);
		}
		return <Navigate to="/unauthorized" replace />;
	}

	if (requireVerified && verify === 0) {
		if (!hasShownToast) {
			toast.error("Please verify your account to access this page");
			setHasShownToast(true);
		}
		return <Navigate to="/" replace />;
	}

	return <Outlet />;
};

export default ProtectedRoute;
