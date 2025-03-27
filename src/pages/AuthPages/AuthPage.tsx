import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axios/axiosInstance";
import { toast } from "react-toastify";
import { useAuth } from "../../auth-middlewares/useAuth";
import { useTranslation } from "react-i18next";

const AuthPage = () => {
	const navigate = useNavigate();
	const { login } = useAuth();
	const { t } = useTranslation(); //this is used for translation
	const [isSignUp, setIsSignUp] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const [formData, setFormData] = useState({
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [passwordMatch, setPasswordMatch] = useState(true);
	const isSignUpDisabled =
		!formData.email ||
		!formData.password ||
		!formData.confirmPassword ||
		!passwordMatch;

	const isSigninDisabled = !formData.email || !formData.password;
	const togglePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
	};
	const toggleConfirmPasswordVisibility = () => {
		setShowConfirmPassword((prev) => !prev);
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

		if (name === "confirmPassword" || name === "password") {
			const isMatch =
				name === "confirmPassword"
					? trimmedValue === formData.password
					: formData.confirmPassword === trimmedValue;
			setPasswordMatch(isMatch);
		}
	};

	const handleChangeForm = (e: React.FormEvent) => {
		e.preventDefault();
		setIsSignUp(!isSignUp);
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
				const user_profile_id = response.data.result.user_profile._id;
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
					case "User":
						navigate("/", { replace: true });
						login(access_token, refresh_token, user, user_profile_id);
						toast.success("Sign-in successful");
						break;
					default:
						navigate("/auth", { replace: true });
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
				} else {
					toast.error("Sign-in failed. Please try again.");
				}
			} else {
				toast.error("Sign-in failed. Please try again.");
			}
		}
	};

	const handleSignUp = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!validateEmail(formData.email)) {
			toast.error("Invalid email format");
			return;
		}

		try {
			const userData = {
				email: formData.email.toLowerCase().trim(),
				password: formData.password.trim(),
				confirm_password: formData.confirmPassword.trim(),
			};
			const response = await axiosInstance.post("/accounts/register", userData);
			if (response.data.result) {
				// console.log(response.data.result);
				toast.success("Sign-up successful. Please verify your email.");
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
				} else {
					console.error("Unknown error during sign-up");
				}
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
		<div
			className="relative flex items-center justify-center h-screen bg-cover bg-center"
			style={{
				backgroundImage: `url('../../public/730500-spa-wallpaper.jpg')`,
			}}
		>
			{/* Form */}
			<div className="flex items-center justify-center absolute inset-0 bg-gray-900 bg-opacity-20 [perspective:1000px]">
				<button
					className={`absolute top-5 left-5 text-2xl z-50 cursor-pointer text-black hover:text-gray-800`}
					onClick={() => navigate("/")}
				>
					<i className="fa-solid fa-arrow-left"></i>
				</button>
				<div
					className={`relative w-[468px] max-w-full min-h-[550px] shadow-2xl rounded-[90px] transition-transform duration-500 [transform-style:preserve-3d]
      ${isSignUp ? "[transform:rotateY(180deg)]" : ""}`}
				>
					{/* Front - Login Form */}
					<div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-90 shadow-2xl [backface-visibility:hidden] rounded-tl-[90px] rounded-br-[90px] rounded-tr-[20px] rounded-bl-[20px]">
						<form
							onSubmit={handleSignIn}
							className="flex flex-col items-center text-center  justify-center p-10 h-full"
						>
							<h1 className="font-bold text-xl">{t("Sign In")}</h1>
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
							<span className="text-sm">{t("or use your account")}</span>
							<input
								type="email"
								name="email"
								value={formData.email}
								onChange={handleInputChange}
								placeholder={t("Email")}
								className="w-full p-3 my-2 bg-gray-200 rounded focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
								tabIndex={1}
							/>
							<div className="relative w-full">
								<input
									type={showPassword ? "text" : "password"}
									name="password"
									value={formData.password}
									onChange={handleInputChange}
									placeholder={t("Password")}
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
										<i className="fa-solid fa-eye-slash  "></i>
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
								className={`mt-4 px-6 py-3 text-white font-bold rounded-full transition ${isSigninDisabled
									? "bg-gray-400 cursor-not-allowed"
									: "bg-gradient-to-tr from-purple-400 to-pink-300 hover:from-pink-300 hover:to-purple-400"
									}`}
							>
								{t("Sign in")}
							</button>
							<button
								onClick={handleChangeForm}
								className="mt-4 text-blue-500 fixed bottom-4 "
							>
								{t("Don't have an account? Sign Up")}
							</button>
						</form>
					</div>
					{/* Back - Register Form */}
					<div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-90 rounded-lg shadow-lg [transform:rotateY(180deg)] [backface-visibility:hidden] rounded-tl-[20px] rounded-br-[20px] rounded-tr-[90px] rounded-bl-[90px]">
						<form
							onSubmit={handleSignUp}
							className="flex flex-col items-center text-center p-10 h-full justify-center"
						>
							<h1 className="font-bold text-xl">{t("Create Account")}</h1>
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
							<span className="text-sm">
								{t("or use your email for registration")}
							</span>
							<input
								type="email"
								name="email"
								value={formData.email}
								onChange={handleInputChange}
								placeholder={t("Email")}
								className="w-full p-3 my-2 bg-gray-200 rounded focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
							/>
							<div className="relative w-full my-2">
								<input
									type={showPassword ? "text" : "password"}
									name="password"
									value={formData.password}
									onChange={handleInputChange}
									placeholder={t("Password")}
									className="w-full p-3 my-2 bg-gray-200 rounded focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
								/>
								<button
									className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:outline-double"
									type="button"
									onClick={togglePasswordVisibility}
									aria-label="Toggle password visibility"
								>
									{showPassword ? (
										<i className="fa-solid fa-eye-slash"></i>
									) : (
										<i className="fa-solid fa-eye"></i>
									)}
								</button>
							</div>
							{formData.password && (
								<>
									<div className="relative w-full my-2">
										<input
											type={showConfirmPassword ? "text" : "password"}
											name="confirmPassword"
											value={formData.confirmPassword}
											onChange={handleInputChange}
											placeholder={t("Confirm Password")}
											className="w-full p-3 my-2 bg-gray-200 rounded focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
										/>
										<button
											className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:outline-double"
											type="button"
											onClick={toggleConfirmPasswordVisibility}
											aria-label="Toggle password visibility"
										>
											{showConfirmPassword ? (
												<i className="fa-solid fa-eye-slash"></i>
											) : (
												<i className="fa-solid fa-eye"></i>
											)}
										</button>
									</div>
									{!passwordMatch && formData.confirmPassword && (
										<p className="text-red-500 text-sm">
											{t("Passwords do not match!")}
										</p>
									)}
								</>
							)}
							<button
								type="submit"
								disabled={isSignUpDisabled}
								className={`mt-4 px-6 py-3 text-white font-bold rounded-full ${isSignUpDisabled
									? "bg-gray-400 cursor-not-allowed"
									: "bg-gradient-to-tr from-purple-400 to-pink-300 hover:from-pink-300 hover:to-purple-400"
									}`}
							>
								{t("Sign Up")}
							</button>
							<button
								onClick={handleChangeForm}
								className="mt-4 text-green-500 fixed bottom-4"
							>
								{t("Already have an account? Login")}
							</button>
						</form>
					</div>
				</div>
			</div>

			{/* image */}
			{/* <div className="hidden lg:block col-span-2">
				<img
					src="../../public/730500-spa-wallpaper.jpg"
					alt="auth"
					className="object-cover max-h-screen w-full h-full transform transition-transform duration-500 hover:scale-105"
				/>
			</div> */}
		</div>
	);
};

export default AuthPage;
