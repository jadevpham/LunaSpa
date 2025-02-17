import { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
	role: string | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [role, setRole] = useState<string | null>(null);
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		const token = localStorage.getItem("accessToken");
		const userRole = localStorage.getItem("role");

		console.log("Loading Auth Context:", { token, userRole });

		if (token && userRole) {
			setRole(userRole);
			setIsAuthenticated(true);
		}
		setIsLoading(false);
	}, []);

	const logout = () => {
		localStorage.removeItem("accessToken");
		localStorage.removeItem("refreshToken");
		localStorage.removeItem("role");
		setRole(null);
		setIsAuthenticated(false);
	};

	return (
		<AuthContext.Provider value={{ role, isAuthenticated, isLoading, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
