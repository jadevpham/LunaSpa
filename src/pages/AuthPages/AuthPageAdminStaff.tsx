import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axios/axiosInstance";
import { toast } from "react-toastify";
import { useAuth } from "../../auth-middlewares/useAuth";
import { useTranslation } from "react-i18next";

const AuthPageAdminStaff = () => {
	const navigate = useNavigate();
	const { login } = useAuth();
	const { t } = useTranslation(); //this is used for translation
	const [showPassword, setShowPassword] = useState(false);

	const [formData, setFormData] = useState({
		email: "",
		password: "",
		confirmPassword: "",
	});

	const isSigninDisabled = !formData.email || !formData.password;
	const togglePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
	};

	const validateEmail = (email: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const dataFromLocalStorage =
		localStorage.getItem("user") ||
		localStorage.getItem("access_token") ||
		localStorage.getItem("refresh_token");
	useEffect(() => {
		if (dataFromLocalStorage) {
			navigate("/");
		}
	}, [navigate]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		const trimmedValue = value.trim();

		setFormData((prev) => ({
			...prev,
			[name]: trimmedValue,
		}));
	};

	const handleSignIn = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!validateEmail(formData.email)) {
			toast.error("Invalid email format");
			return;
		}

		try {
			const userData = {
				email: formData.email.toLowerCase().trim(),
				password: formData.password.trim(),
			};

			const response = await axiosInstance.post("/accounts/login", userData);
			// console.log(response.data.result.user_profile.account);
			if (response.data.result) {
				const user = response.data.result.user_profile.account;
				const access_token = response.data.result.access_token;
				const refresh_token = response.data.result.refresh_token;

				if (!user || !user.roles || user.roles.length === 0) {
					toast.error("Invalid user data received");
					return;
				}

				if (user.verify === 2) {
					toast.error("Your account has been deleted");
					return;
				}

				if (user.verify === 3) {
					toast.error("Your account has been banned");
					return;
				}

				const role = user.roles[0].role_name;
				switch (role) {
					case "Staff":
						navigate("/staff", { replace: true });
						login(access_token, refresh_token, user);
						toast.success("Sign-in successful");
						break;
					case "Admin":
						navigate("/admin", { replace: true });
						login(access_token, refresh_token, user);
						toast.success("Sign-in successful");
						break;
					default:
						navigate("/auth/admin-staff", { replace: true });
						toast.error("Sign-in failed. Please try again.");
				}
			}
		} catch (error: unknown) {
			if (error instanceof Error && "response" in error) {
				const axiosError = error as {
					response?: { data?: { errors?: Record<string, { msg: string }> } };
				};
				const errors = axiosError.response?.data?.errors;
				if (errors) {
					Object.keys(errors).forEach((field) => {
						const message = errors[field]?.msg;
						if (message) {
							toast.error(message);
						}
					});
				}
			} else {
				toast.error("Sign-in failed. Please try again.");
			}
		}
	};

	const getGoogleAuthUrl = () => {
		const { VITE_GOOGLE_CLIENT_ID, VITE_GOOGLE_REDIRECT_URI } = import.meta.env;
		const url = `https://accounts.google.com/o/oauth2/v2/auth`;
		const query = {
			client_id: VITE_GOOGLE_CLIENT_ID,
			redirect_uri: VITE_GOOGLE_REDIRECT_URI,
			response_type: "code",
			scope: [
				"https://www.googleapis.com/auth/userinfo.profile",
				"https://www.googleapis.com/auth/userinfo.email",
			].join(" "),
			prompt: "consent",
			access_type: "offline",
		};
		const queryString = new URLSearchParams(query).toString();
		return `${url}?${queryString}`;
	};

	const googleOAuthUrl = getGoogleAuthUrl();

	const getFacebookAuthUrl = () => {
		const { VITE_FACEBOOK_CLIENT_ID, VITE_FACEBOOK_REDIRECT_URI } = import.meta
			.env;
		const url = `https://www.facebook.com/v22.0/dialog/oauth`;
		const query = {
			client_id: VITE_FACEBOOK_CLIENT_ID,
			redirect_uri: VITE_FACEBOOK_REDIRECT_URI,
			response_type: "code",
			auth_type: "rerequest",
			state: "12345huydeptrai",
			scope: ["email", "public_profile"].join(" "),
		};

		const queryString = new URLSearchParams(query).toString();
		return `${url}?${queryString}`;
	};
	const facebookOAuthUrl = getFacebookAuthUrl();

	return (
		<div className="grid grid-cols-1 lg:grid-cols-3">
			{/* Form */}
			<div className="flex items-center justify-center h-screen bg-gray-200 col-span-1">
				<button
					className={`absolute top-5 left-5 text-2xl z-50 cursor-pointer text-gray-600 hover:text-gray-800`}
					onClick={() => navigate("/")}
				>
					<i className="fa-solid fa-arrow-left"></i>
				</button>
				<div
					className={`relative w-[468px] max-w-full min-h-[500px] bg-white shadow-2xl rounded-2xl overflow-hidden rounded-tl-[90px] rounded-br-[90px] rounded-tr-[20px] rounded-bl-[20px]`}
				>
					{/* Sign In Form */}
					<div className={`absolute top-0 left-0 w-full h-full`}>
						<form
							onSubmit={handleSignIn}
							className="flex flex-col items-center text-center  justify-center p-10 h-full"
						>
							<h1 className="font-bold text-xl">Sign In</h1>
							<div className="flex gap-3 my-4">
								<a
									href={facebookOAuthUrl}
									className="border border-gray-600 p-3 w-16 rounded-full hover:bg-gray-300"
								>
									<i className="fab fa-facebook-f"></i>
								</a>
								<a
									href={googleOAuthUrl}
									className="border border-gray-600 p-3 w-16 rounded-full hover:bg-gray-300"
								>
									<i className="fab fa-google-plus-g"></i>
								</a>
							</div>
							<span className="text-sm">or use your account</span>
							<input
								type="email"
								name="email"
								value={formData.email}
								onChange={handleInputChange}
								placeholder="Email"
								className="w-full p-3 my-2 bg-gray-200 rounded focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
								tabIndex={1}
							/>
							<div className="relative w-full">
								<input
									type={showPassword ? "text" : "password"}
									name="password"
									value={formData.password}
									onChange={handleInputChange}
									placeholder="Password"
									className="w-full p-3 my-2 bg-gray-200 rounded focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
									tabIndex={2}
								/>
								<button
									className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:outline-double"
									type="button"
									onClick={togglePasswordVisibility}
									aria-label="Toggle password visibility"
									tabIndex={-1}
								>
									{showPassword ? (
										<i className="fa-solid fa-eye-slash"></i>
									) : (
										<i className="fa-solid fa-eye"></i>
									)}
								</button>
							</div>

							<a
								href="/forgot-password"
								className="text-blue-500 text-sm my-2 hover:underline"
							>
								{t("Forgot your password?")}
							</a>
							<button
								type="submit"
								disabled={isSigninDisabled}
								className={`mt-4 px-6 py-3 text-white font-bold rounded-full ${
									isSigninDisabled
										? "bg-gray-400 cursor-not-allowed"
										: "bg-gradient-to-tr from-purple-400 to-pink-300 hover:from-pink-300 hover:to-purple-400"
								}`}
							>
								Sign in
							</button>
						</form>
					</div>

					{/* Overlay */}
				</div>
			</div>

			{/* image */}
			<div className="hidden lg:block col-span-2">
				<img
					// src="../../public/730500-spa-wallpaper.jpg"
					src="https://spabeautique.com.au/wp-content/uploads/2022/08/best-place.jpg"
					alt="auth"
					className="object-cover max-h-screen w-full h-full"
				/>
			</div>
		</div>
	);
};
export default AuthPageAdminStaff;
