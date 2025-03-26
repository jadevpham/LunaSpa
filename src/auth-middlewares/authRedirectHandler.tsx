import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoadingAnimation from "../components/LoadingAnimation";
import axiosInstance from "../axios/axiosInstance";
import { useAuth } from "./useAuth";

const AuthRedirectHandler = () => {
	const navigate = useNavigate();
	const [params] = useSearchParams();
	const { login } = useAuth();

	const getUserInfo = async (access_token: string, refresh_token: string) => {
		try {
			const response = await axiosInstance.get("/accounts/me");
			const userData = response.data.result.user_profile.account;

			login(access_token, refresh_token, userData);

			navigate("/");
		} catch (error) {
			console.error("Error fetching user info:", error);
			navigate("/auth");
		}
	};

	useEffect(() => {
		const access_token = params.get("access_token");
		const refresh_token = params.get("refresh_token");

		if (access_token && refresh_token) {
			localStorage.setItem("access_token", access_token);
			localStorage.setItem("refresh_token", refresh_token);
			getUserInfo(access_token, refresh_token);
		} else {
			navigate("/auth");
		}
	}, [navigate, params]);

	return (
		<div>
			<LoadingAnimation msg="Redirecting..." />
		</div>
	);
};

export default AuthRedirectHandler;
