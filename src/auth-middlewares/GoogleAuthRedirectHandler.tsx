import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleAuthRedirectHandler = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const accessToken = params.get("accessToken");
		const refreshToken = params.get("refreshToken");

		if (accessToken && refreshToken) {
			// Lưu vào localStorage
			localStorage.setItem("accessToken", accessToken);
			localStorage.setItem("refreshToken", refreshToken);

			// Xóa token khỏi URL bằng cách thay đổi lịch sử trình duyệt
			window.history.replaceState({}, document.title, window.location.pathname);

			// Điều hướng về trang chính (hoặc trang dashboard)
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
