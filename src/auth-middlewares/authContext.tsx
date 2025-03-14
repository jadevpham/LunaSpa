import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

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
	) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [role, setRole] = useState<string | null>(null);
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [verify, setVerify] = useState<number>(0);

	useEffect(() => {
		const checkAuthStatus = () => {
			const token = localStorage.getItem("access_token");
			const user = localStorage.getItem("user");
			const userRole = user ? JSON.parse(user).roles[0].role_name : null;
			const userVerify = user ? JSON.parse(user).verify : 0;

			console.log("Checking Auth Status:", { token, userRole, userVerify });

			setIsAuthenticated(!!token);
			setRole(userRole);
			setVerify(userVerify);
			setIsLoading(false);
		};

		checkAuthStatus();

		window.addEventListener("storage", checkAuthStatus);

		return () => {
			window.removeEventListener("storage", checkAuthStatus);
		};
	}, []);

	const login = (
		access_token: string,
		refresh_token: string,
		userData: UserData,
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
		setRole(userData.roles[0].role_name);
		setIsAuthenticated(true);
		setVerify(userData.verify);
	};

	const logout = () => {
		localStorage.removeItem("access_token");
		localStorage.removeItem("refresh_token");
		localStorage.removeItem("user");
		setRole(null);
		setIsAuthenticated(false);
		setVerify(0);
		window.location.href = "/";
	};

	return (
		<AuthContext.Provider
			value={{ role, isAuthenticated, isLoading, verify, login, logout }}
		>
			{children}
		</AuthContext.Provider>
	);
};
export default AuthContext;
