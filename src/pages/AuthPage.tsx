import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

	const isSiginDisabled = !formData.email || !formData.password;
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

	const handleSignIn = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("signin", {
			email: formData.email,
			password: formData.password,
		});
	};

	const handleSignUp = (e: React.FormEvent) => {
		e.preventDefault();
		if (formData.password !== formData.confirmPassword) {
			alert("Passwords do not match!");
			return;
		}
		console.log("signup", formData);
	};

	return (
		<div className="grid grid-cols-1 lg:grid-cols-3">
			{/* Form */}
			<div className="flex items-center justify-center h-screen bg-gray-100 col-span-2">
				<button
					className="absolute top-5 left-5 text-2xl text-gray-500"
					onClick={() => navigate("/")}
				>
					<i className="fa-solid fa-arrow-left"></i>
				</button>

				<div
					className={`relative w-[768px] max-w-full min-h-[500px] bg-white shadow-2xl rounded-lg overflow-hidden transition-all duration-500 ${isSignUp ? "right-panel-active" : ""}`}
				>
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
								<a href="#" className="border p-3 w-16 rounded-full">
									<i className="fab fa-facebook-f"></i>
								</a>
								<a href="#" className="border p-3 w-16 rounded-full">
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
								className={`mt-4 px-6 py-3 text-white font-bold rounded-full ${
									isSiginDisabled
										? "bg-gray-400 cursor-not-allowed"
										: "bg-gradient-to-tr from-purple-400 to-pink-300"
								}`}
								disabled={isSiginDisabled}
							>
								Sign Up
							</button>
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
								<a href="#" className="border p-3 w-16 rounded-full">
									<i className="fab fa-facebook-f"></i>
								</a>
								<a href="#" className="border p-3 w-16 rounded-full">
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
										<i className="fa-solid fa-eye-slash  "></i>
									) : (
										<i className="fa-solid fa-eye"></i>
									)}
								</button>
							</div>
							{formData.password && (
								<>
									<div className="relative w-full pt-2">
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
												<i className="fa-solid fa-eye-slash  "></i>
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
								className={`mt-4 px-6 py-3 text-white font-bold rounded-full ${
									isSignUpDisabled
										? "bg-gray-400 cursor-not-allowed"
										: "bg-gradient-to-tr from-purple-400 to-pink-300"
								}`}
								disabled={isSignUpDisabled}
							>
								Sign Up
							</button>
						</form>
					</div>

					{/* Overlay */}
					<div
						className={`absolute top-0 left-1/2 w-1/2 h-full  text-white flex flex-col justify-center items-center transition-transform duration-500 ${isSignUp ? "-translate-x-full rounded-r-xl bg-gradient-to-bl from-purple-400 to-pink-300" : "translate-x-0 rounded-l-xl bg-gradient-to-bl from-pink-300 to-purple-400 "}`}
					>
						{isSignUp ? (
							<div className="text-center">
								<h1 className="text-2xl font-bold">Welcome Back!</h1>
								<p className="my-4">
									To keep connected with us please login with your personal info
								</p>
								<button
									onClick={() => setIsSignUp(false)}
									className="px-6 py-3 border border-white text-white rounded-full"
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
									className="px-6 py-3 border border-white text-white rounded-full"
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
					src="/auth-image.webp"
					alt="auth"
					className="object-cover max-h-screen w-full h-full"
				/>
			</div>
		</div>
	);
};
export default AuthPage;
