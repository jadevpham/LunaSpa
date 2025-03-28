import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../axios/axiosInstance";
import LoadingAnimation from "../components/LoadingAnimation";

interface UserData {
	created_at: string;
	date_of_birth: string;
	email: string;
	name: string;
	roles: Array<{ role_name: string }>;
	updated_at: string;
	_id: string;
	verify: number;
}
interface AuthContextType {
	role: string | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	verify: number;
	logout: () => void;
	login: (
		access_token: string,
		refresh_token: string,
		userData: UserData,
		user_profile_id: string,
	) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [role, setRole] = useState<string | null>(null);
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [verify, setVerify] = useState<number>(0);

	useEffect(() => {
		const checkAuthStatus = async () => {
			setIsLoading(true);
			const token = localStorage.getItem("access_token");
			const user = localStorage.getItem("user");

			if (!token || !user) {
				setIsAuthenticated(false);
				setRole(null);
				setVerify(0);
				setIsLoading(false);
				return;
			}

			try {
				const response = await axiosInstance.get("/accounts/me");
				const userData = response.data.result.user_profile;
				console.log(response);
				localStorage.setItem("user", JSON.stringify(userData.account));
				localStorage.setItem("user_profile_id", JSON.stringify(userData._id));

				setIsAuthenticated(true);
				setRole(userData.account.roles[0].role_name);
				setVerify(userData.verify);
			} catch (error) {
				console.error("Error fetching user:", error);
				localStorage.removeItem("access_token");
				localStorage.removeItem("refresh_token");
				localStorage.removeItem("user");
				localStorage.removeItem("user_profile_id");

				setIsAuthenticated(false);
				setRole(null);
				setVerify(0);
			} finally {
				setIsLoading(false);
			}
		};

		checkAuthStatus();

		window.addEventListener("storage", (e) => {
			if (e.key === "access_token" || e.key === "user") {
				checkAuthStatus();
			}
		});

		return () => {
			window.removeEventListener("storage", () => {});
		};
	}, []);

	const login = (
		access_token: string,
		refresh_token: string,
		userData: UserData,
		user_profile_id: string,
	) => {
		if (userData.verify === 2) {
			toast.error("Your account has been deleted");
			return;
		}

		if (userData.verify === 3) {
			toast.error("Your account has been banned");
			return;
		}

		localStorage.setItem("access_token", access_token);
		localStorage.setItem("refresh_token", refresh_token);
		localStorage.setItem("user", JSON.stringify(userData));
		localStorage.setItem("user_profile_id", user_profile_id);

		setRole(userData.roles[0].role_name);
		setIsAuthenticated(true);
		setVerify(userData.verify);
		setIsLoading(false);
	};

	const logout = () => {
		localStorage.removeItem("access_token");
		localStorage.removeItem("refresh_token");
		localStorage.removeItem("user");
		localStorage.removeItem("user_profile_id");
		console.log("logout");
		setRole(null);
		setIsAuthenticated(false);
		setVerify(0);
		setIsLoading(false);
		window.location.href = "/";
	};

	if (isLoading) {
		return <LoadingAnimation msg="Loading..." />;
	}

	return (
		<AuthContext.Provider
			value={{ role, isAuthenticated, isLoading, verify, login, logout }}
		>
			{children}
		</AuthContext.Provider>
	);
};
export default AuthContext;
