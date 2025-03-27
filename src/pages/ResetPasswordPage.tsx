import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingAnimation from "../components/LoadingAnimation";
import axios from "axios";
import PasswordStrength from "../components/PasswordStrength";
import { useTranslation } from "react-i18next";

const ResetPasswordPage = () => {
	const { t } = useTranslation();
	const [searchParams] = useSearchParams();
	const token = searchParams.get("token");
	const [loading, setLoading] = useState(true);
	const [hasVerified, setHasVerified] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [passwordMatch, setPasswordMatch] = useState(true);
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		password: "",
		confirmPassword: "",
	});

	const validatePassword = (password: string) => {
		if (!(password.length >= 5 && password.length <= 50)) {
			toast.error("Password must be between 5 and 50 characters");
			return false;
		}
		if (!/[a-z]/.test(password)) {
			toast.error("Password must contain at least one lowercase letter");
			return false;
		}
		if (!/[A-Z]/.test(password)) {
			toast.error("Password must contain at least one uppercase letter");
			return false;
		}
		if (!/[0-9]/.test(password)) {
			toast.error("Password must contain at least one number");
			return false;
		}
		if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
			toast.error("Password must contain at least one special character");
			return false;
		}
		return true;
	};

	const togglePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
	};
	const toggleConfirmPasswordVisibility = () => {
		setShowConfirmPassword((prev) => !prev);
	};

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
	useEffect(() => {
		const verifyEmail = async () => {
			if (!token) return;

			try {
				setLoading(true);
				const response = await axios.post(
					"http://localhost:4000/accounts/verify-forgot-password",
					{
						forgot_password_token: token,
					},
				);
				console.log(response.data.message);
				if (response.data.message !== "Verify forgot password successfully") {
					toast.error("Invalid token");
					navigate("/forgot-password");
					return;
				}

				setHasVerified(true);
				toast.success(response.data.message);
				setLoading(false);
			} catch (error: any) {
				const errors = error.response?.data?.errors;
				if (errors) {
					Object.keys(errors).forEach((field) => {
						const message = errors[field]?.msg;
						if (message) {
							toast.error(message);
						}
					});
				}
			}
		};

		verifyEmail();
	}, [searchParams]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!validatePassword(formData.password)) {
			return;
		}
		if (!passwordMatch) {
			toast.error("Passwords do not match");
			return;
		}

		try {
			const response = await axios.post(
				"http://localhost:4000/accounts/reset-password",
				{
					forgot_password_token: token,
					password: formData.password,
					confirm_password: formData.confirmPassword,
				},
			);
			toast.success(response.data.message);
			setTimeout(() => {
				navigate("/auth");
			}, 3000);
		} catch (error: any) {
			const errors = error.response?.data?.errors;
			if (errors) {
				Object.keys(errors).forEach((field) => {
					const message = errors[field]?.msg;
					if (message) {
						toast.error(message);
					}
				});
			}
		}
	};

	return (
		<div className="min-h-screen bg-gray-100 flex items-center justify-center">
			{loading && <LoadingAnimation />}
			{hasVerified && (
				<div className="bg-white p-8 rounded-lg shadow-md w-96">
					<h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
						{t("TReset Passwordext")}
					</h1>
					<p className="text-gray-600 text-center mb-6">
						{t("Please enter your new password.")}
					</p>
					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="relative">
							<input
								type={showPassword ? "text" : "password"}
								name="password"
								value={formData.password}
								tabIndex={1}
								onChange={handleInputChange}
								placeholder={t("Password")}
								className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
							/>
							<button
								className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
						<div className="relative">
							<input
								type={showConfirmPassword ? "text" : "password"}
								name="confirmPassword"
								tabIndex={2}
								value={formData.confirmPassword}
								onChange={handleInputChange}
								placeholder={t("Confirm Password")}
								className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
							/>
							<button
								className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
						{formData.password && (
							<PasswordStrength password={formData.password} />
						)}
						{!passwordMatch && formData.confirmPassword && (
							<p className="text-red-500 text-sm">{t("Passwords do not match!")}</p>
						)}
						<button
							type="submit"
							className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
						>
							{t("Reset Password")}
						</button>
						<p className="mt-6 text-center">
							<a
								className="text-blue-600 hover:text-blue-800 font-medium"
								href="/auth"
							>
								{t("Back to Login")}
							</a>
						</p>
					</form>
				</div>
			)}
		</div>
	);
};

export default ResetPasswordPage;
