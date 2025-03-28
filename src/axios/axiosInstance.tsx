import axios from "axios";

export const BASE_URL = "http://localhost:4000";

// Tạo một instance Axios
const axiosInstance = axios.create({
	baseURL: BASE_URL,
	timeout: 10000,
});

// Đón chặn Request
axiosInstance.interceptors.request.use(
	(config) => {
		// Check hệ thống có accessToken hay không và cập nhật Authorization header nếu có
		const accessToken = localStorage.getItem("access_token");
		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

// Đón chặn Response
axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		// Nếu có response từ server
		if (error.response) {
			const status = error.response.status;
			const errorMessage = error.response.data?.message || "Có lỗi xảy ra!";

			// Nếu lỗi là 401 => Xử lý refresh token
			if (status === 401) {
				try {
					console.log("Access token hết hạn, đang làm mới...");
					const refreshToken = localStorage.getItem("refresh_token");

					if (!refreshToken) {
						console.warn("Không tìm thấy refresh token, đăng xuất...");
						localStorage.removeItem("access_token");
						localStorage.removeItem("refresh_token");
						window.location.href = "/login"; // Điều hướng về trang đăng nhập
						return Promise.reject(error);
					}

					// Gửi request làm mới token
					const { data } = await axios.post(
						`${BASE_URL}/accounts/refresh-token`,
						null,
						{
							headers: {
								Authorization: `Bearer ${refreshToken}`,
							},
						},
					);

					// Lưu token mới
					localStorage.setItem("access_token", data.access_token);

					// Cập nhật lại request cũ với token mới
					error.config.headers.Authorization = `Bearer ${data.access_token}`;
					return axiosInstance(error.config);
				} catch (err) {
					console.error("Làm mới token thất bại, đăng xuất...");
					localStorage.removeItem("access_token");
					localStorage.removeItem("refresh_token");
					window.location.href = "/login";
					return Promise.reject(err);
				}
			}

			// Nếu lỗi là 422 (Validation) => Trả về lỗi mà không làm mới token
			if (status === 422) {
				console.warn("Lỗi validation:", errorMessage);
				// Có thể throw error với thông tin rõ ràng hơn
				return Promise.reject({
					message: errorMessage,
					errors: error.response.data.errors || [],
				});
			}
		}

		// Xử lý lỗi không có response (mạng, server crash, v.v.)
		console.error("Lỗi không xác định:", error.message);
		return Promise.reject(error);
	},
);

export default axiosInstance;
