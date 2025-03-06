import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleAuthRedirectHandler = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const accessToken = params.get("accessToken");
		const refreshToken = params.get("refreshToken");

		if (accessToken && refreshToken) {
			localStorage.setItem("accessToken", accessToken);
			localStorage.setItem("refreshToken", refreshToken);

			window.history.replaceState({}, document.title, window.location.pathname);

			navigate("/");
		}
	}, [navigate]);

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "100vh",
				fontSize: "1.5rem",
				color: "#333",
				fontWeight: "bold",
			}}
		>
			<div>
				Redirecting to home page...
				<div
					style={{
						width: "50px",
						height: "50px",
						border: "5px solid #f3f3f3",
						borderTop: "5px solid #3498db",
						borderRadius: "50%",
						animation: "spin 1s linear infinite",
						margin: "20px auto",
					}}
				/>
				<style>
					{`
						@keyframes spin {
							0% { transform: rotate(0deg); }
							100% { transform: rotate(360deg); }
						}
					`}
				</style>
			</div>
		</div>
	);
};

export default GoogleAuthRedirectHandler;
