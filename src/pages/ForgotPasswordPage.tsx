import { useState } from "react";
import axiosInstance from "../axios/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
const ForgotPasswordPage = () => {
	const { t } = useTranslation();
	const [email, setEmail] = useState("");
	const navigate = useNavigate();
	const [isClick, setIsClick] = useState(false);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		const trimmedValue = value.trim();

		setEmail(trimmedValue);
	};
	const validateEmail = (email: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!validateEmail(email)) {
			toast.error("Invalid email format");
			return;
		}
		const response = await axiosInstance.post("/accounts/forgot-password", {
			email: email,
		});
		toast.success(response.data.message);
		setIsClick(true);
		setTimeout(() => {
			navigate("/auth");
		}, 3000);
	};

	return (
		<div className="container mx-auto flex items-center justify-center min-h-screen bg-gray-100">
			<div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
				<h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
					{t("Forgot Password")}
				</h1>
				<p className="text-gray-600 text-center mb-6">
					{t("Please enter your email address to reset your password.")}
				</p>
				<form onSubmit={handleSubmit} className="space-y-6">
					<input
						className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						type="email"
						onChange={handleInputChange}
						placeholder={t("Email")}
					/>
					<button
						disabled={isClick}
						className={`w-full bg-blue-500 ${!isClick && "hover:bg-blue-600"} text-white font-bold py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${isClick && "opacity-50 cursor-not-allowed"}`}
						type="submit"
					>
						{t("Submit")}
					</button>
				</form>
				<p className="mt-6 text-center">
					<a
						className="text-blue-600 hover:text-blue-800 font-medium"
						href="/auth"
					>
						{t("Back to Login")}
					</a>
				</p>
			</div>
		</div>
	);
};

export default ForgotPasswordPage;
