import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignIn, useSignUp } from "../services/authService.tsx";
const AuthPage = () => {
	const navigate = useNavigate();
	const [isSignUp, setIsSignUp] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [passwordMatch, setPasswordMatch] = useState(true);
	const isSignUpDisabled =
		!formData.name ||
		!formData.email ||
		!formData.password ||
		!formData.confirmPassword ||
		!passwordMatch;

	const isSigninDisabled = !formData.email || !formData.password;
	const togglePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
	};
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		if (name === "confirmPassword" || name === "password") {
			const isMatch =
				name === "confirmPassword"
					? value === formData.password
					: formData.confirmPassword === value;
			setPasswordMatch(isMatch);
		}
	};

	const { mutate: login, isPending, isError, error } = useSignIn();

	const handleSignIn = (e: React.FormEvent) => {
		e.preventDefault();

		login(
			{ email: formData.email, password: formData.password },
			{
				onSuccess: (data) => {
					const { accessToken, refreshToken, userData } = data.data;

					localStorage.setItem("accessToken", accessToken);
					localStorage.setItem("refreshToken", refreshToken);
					localStorage.setItem("role", userData.role);

					navigate("/");
				},
				onError: (err) => {
					console.error("Login failed:", err);
				},
			},
		);
	};

	const {
		mutate: register,
		isPending: isSigningUp,
		isError: signUpError,
		error: signUpErrorMessage,
	} = useSignUp();
	const handleSignUp = async (e: React.FormEvent) => {
		e.preventDefault();

		const userData = {
			name: formData.name,
			email: formData.email,
			password: formData.password,
		};
		register(userData, {
			onSuccess: (data) => {
				console.log("Registration successful:", data);
				setIsSignUp(false); // Chuyển sang trang đăng nhập
			},
			onError: (err) => {
				console.error("Registration failed:", err);
			},
		});
	};

	const handleGoogleSignIn = () => {
		window.location.href = `http://localhost:3200/api/auth/login/google?role=student&failRedirectURL=http://localhost:5173&successRedirectURL=http://localhost:5173/auth/google/callback`;
	};
	return (
		<div className="grid grid-cols-1 lg:grid-cols-3">
			{/* Form */}
			<div className="flex items-center justify-center h-screen bg-gray-100 col-span-2">
				<div
					className={`relative w-[768px] max-w-full min-h-[500px] bg-white shadow-2xl rounded-lg overflow-hidden transition-all duration-500 ${isSignUp ? "right-panel-active" : ""}`}
				>
					<button
						className={`absolute top-5 left-5 text-2xl z-50 cursor-pointer text-gray-600 hover:text-gray-800`}
						onClick={() => navigate("/")}
					>
						<i className="fa-solid fa-arrow-left"></i>
					</button>
					{/* Sign In Form */}
					<div
						className={`absolute top-0 left-0 w-1/2 h-full transition-all duration-500 ${isSignUp ? "translate-x-full opacity-0 z-0" : "translate-x-0 opacity-100 z-10"}`}
					>
						<form
							onSubmit={handleSignIn}
							className="flex flex-col items-center text-center  justify-center p-10 h-full"
						>
							<h1 className="font-bold text-xl">Sign In</h1>
							<div className="flex gap-3 my-4">
								<a
									href="#"
									className="border border-gray-600 p-3 w-16 rounded-full hover:bg-gray-300"
								>
									<i className="fab fa-facebook-f"></i>
								</a>
								<a
									href="#"
									className="border border-gray-600 p-3 w-16 rounded-full hover:bg-gray-300"
								>
									<i
										className="fab fa-google-plus-g"
										onClick={handleGoogleSignIn}
									></i>
								</a>
							</div>
							<span className="text-sm">or use your account</span>
							<input
								type="email"
								name="email"
								value={formData.email}
								onChange={handleInputChange}
								placeholder="Email"
								className="w-full p-3 my-2 bg-gray-200 rounded"
							/>
							<div className="relative w-full">
								<input
									type={showPassword ? "text" : "password"}
									name="password"
									value={formData.password}
									onChange={handleInputChange}
									placeholder="Password"
									className="bg-gray-200 rounded w-full p-3"
								/>
								<button
									className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:outline-double"
									type="button"
									onClick={togglePasswordVisibility}
									aria-label="Toggle password visibility"
								>
									{showPassword ? (
										<i className="fa-solid fa-eye-slash  "></i>
									) : (
										<i className="fa-solid fa-eye"></i>
									)}
								</button>
							</div>

							<a href="" className="text-blue-500 text-sm my-2 hover:underline">
								Forgot your password?
							</a>
							<button
								type="submit"
								disabled={isPending || isSigninDisabled}
								className={`mt-4 px-6 py-3 text-white font-bold rounded-full ${
									isSigninDisabled
										? "bg-gray-400 cursor-not-allowed"
										: "bg-gradient-to-tr from-purple-400 to-pink-300"
								}`}
							>
								{isPending ? "Signing In..." : "Sign In"}
							</button>
							{isError && (
								<p className="text-red-500">
									{error instanceof Error ? error.message : "An error occurred"}
								</p>
							)}
						</form>
					</div>

					{/* Sign Up Form */}
					<div
						className={`absolute top-0 left-0 w-1/2 h-full transition-all duration-500 ${isSignUp ? "translate-x-full opacity-100 z-10" : "translate-x-0 opacity-0 z-0"}`}
					>
						<form
							onSubmit={handleSignUp}
							className="flex flex-col items-center text-center p-10 h-full justify-center"
						>
							<h1 className="font-bold text-xl">Create Account</h1>
							<div className="flex gap-3 my-4">
								<a
									href="#"
									className="border border-gray-600 p-3 w-16 rounded-full hover:bg-gray-300"
								>
									<i className="fab fa-facebook-f"></i>
								</a>
								<a
									href="#"
									className="border border-gray-600 p-3 w-16 rounded-full hover:bg-gray-300"
								>
									<i className="fab fa-google-plus-g"></i>
								</a>
							</div>
							<span className="text-sm">
								or use your email for registration
							</span>
							<input
								type="text"
								name="name"
								value={formData.name}
								onChange={handleInputChange}
								placeholder="Name"
								className="w-full p-3 my-2 bg-gray-200 rounded"
							/>
							<input
								type="email"
								name="email"
								value={formData.email}
								onChange={handleInputChange}
								placeholder="Email"
								className="w-full p-3 my-2 bg-gray-200 rounded"
							/>
							<div className="relative w-full my-2">
								<input
									type={showPassword ? "text" : "password"}
									name="password"
									value={formData.password}
									onChange={handleInputChange}
									placeholder="Password"
									className="bg-gray-200 rounded w-full p-3"
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
											type={showPassword ? "text" : "password"}
											name="confirmPassword"
											value={formData.confirmPassword}
											onChange={handleInputChange}
											placeholder="Confirm Password"
											className="bg-gray-200 rounded w-full p-3"
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
									{!passwordMatch && formData.confirmPassword && (
										<p className="text-red-500 text-sm">
											Passwords do not match!
										</p>
									)}
								</>
							)}
							<button
								type="submit"
								disabled={isSigningUp || isSignUpDisabled}
								className={`mt-4 px-6 py-3 text-white font-bold rounded-full ${
									isSignUpDisabled
										? "bg-gray-400 cursor-not-allowed"
										: "bg-gradient-to-tr from-purple-400 to-pink-300"
								}`}
							>
								{isSigningUp ? "Signing Up..." : "Sign Up"}
							</button>
							{signUpError && (
								<p className="text-red-500">
									{signUpErrorMessage instanceof Error
										? signUpErrorMessage.message
										: "An error occurred"}
								</p>
							)}
						</form>
					</div>

					{/* Overlay */}
					<div
						className={`absolute top-0 left-1/2 w-1/2 h-full  text-black flex flex-col justify-center items-center transition-transform duration-500 ${isSignUp ? "-translate-x-full rounded-r-xl bg-gradient-to-r from-white to-purple-100" : "translate-x-0 rounded-l-xl bg-gradient-to-r from-purple-100  to-white"}`}
					>
						{isSignUp ? (
							<div className="text-center">
								<h1 className="text-2xl font-bold">Welcome Back!</h1>
								<p className="my-4">
									To keep connected with us please login with your personal info
								</p>
								<button
									onClick={() => setIsSignUp(false)}
									className="px-6 py-3 border border-gray-400 text-black rounded-full hover:bg-gray-300"
								>
									Sign In
								</button>
							</div>
						) : (
							<div className="text-center">
								<h1 className="text-2xl font-bold">Hello, Friend!</h1>
								<p className="my-4">
									Enter your personal details and start your journey with us
								</p>
								<button
									onClick={() => setIsSignUp(true)}
									className="px-6 py-3 border border-gray-400 text-black rounded-full hover:bg-gray-300"
								>
									Sign Up
								</button>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* image */}
			<div className="hidden lg:block col-span-1">
				<img
					src="../../public/730500-spa-wallpaper.jpg"
					alt="auth"
					className="object-cover max-h-screen w-full h-full"
				/>
			</div>
		</div>
	);
};
export default AuthPage;
