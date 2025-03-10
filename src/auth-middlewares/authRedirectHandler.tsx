import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoadingAnimation from "../components/LoadingAnimation";
import axiosInstance from "../axios/axiosInstance";

const AuthRedirectHandler = () => {
	const navigate = useNavigate();
	const [params] = useSearchParams();

	const getUserInfo = async () => {
		const response = await axiosInstance.get(
			"http://localhost:4000/accounts/me",
		);
		const user = JSON.stringify(response.data.result);
		localStorage.setItem("user", user);
		window.history.replaceState({}, document.title, window.location.pathname);
	};

	useEffect(() => {
		const access_token = params.get("access_token");
		const refresh_token = params.get("refresh_token");
		if (access_token && refresh_token) {
			localStorage.setItem("access_token", access_token);
			localStorage.setItem("refresh_token", refresh_token);
			getUserInfo();
			// window.history.replaceState({}, document.title, window.location.pathname);

			navigate("/");
		}
	}, [navigate]);

	return (
		<div>
			<LoadingAnimation msg="Redirecting..." />
		</div>
	);
};

export default AuthRedirectHandler;
