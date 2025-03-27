import React from "react";
import { useTranslation } from "react-i18next";
interface PasswordStrengthProps {
	password: string;
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password }) => {
	const { t } = useTranslation();
	const criteria = {
		length: password.length >= 5 && password.length <= 50,
		lowercase: /[a-z]/.test(password),
		uppercase: /[A-Z]/.test(password),
		number: /[0-9]/.test(password),
		symbol: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
	};

	const strengthLevels = Object.values(criteria).filter(Boolean).length;

	const getStrengthText = () => {
		switch (strengthLevels) {
			case 5:
				return "Very Strong";
			case 4:
				return "Strong";
			case 3:
				return "Medium";
			case 2:
				return "Weak";
			default:
				return "Very Weak";
		}
	};

	const getProgressColor = () => {
		switch (strengthLevels) {
			case 5:
				return "bg-green-500";
			case 4:
				return "bg-blue-500";
			case 3:
				return "bg-yellow-500";
			case 2:
				return "bg-orange-500";
			default:
				return "bg-red-500";
		}
	};

	return (
		<div className="p-4 border rounded-lg shadow-md max-w-sm">
			<p className="font-semibold">{t("Password Strength: ")}{getStrengthText()}</p>

			{/* Strength indicator bar */}
			<div className="w-full h-2 mt-2 bg-black rounded-full overflow-hidden z-50">
				<div
					className={`h-full transition-all ${getProgressColor()}`}
					style={{ width: `${(strengthLevels / 5) * 100}%` }}
				></div>
			</div>

			<ul className="mt-3 text-sm">
				<li className={criteria.length ? "text-green-600 m" : "text-red-600 m"}>
					{criteria.length ? (
						<i className="fa-solid fa-check"></i>
					) : (
						<i className="fa-solid fa-x"></i>
					)}
					{t("Length between 5 and 50 characters")}
				</li>
				<li
					className={criteria.lowercase ? "text-green-600 m" : "text-red-600 m"}
				>
					{criteria.lowercase ? (
						<i className="fa-solid fa-check"></i>
					) : (
						<i className="fa-solid fa-x"></i>
					)}
					{t("Contains at least one lowercase letter")}
				</li>
				<li
					className={criteria.uppercase ? "text-green-600 m" : "text-red-600 m"}
				>
					{criteria.uppercase ? (
						<i className="fa-solid fa-check"></i>
					) : (
						<i className="fa-solid fa-x"></i>
					)}
					{t("Contains at least one uppercase letter")}
				</li>
				<li className={criteria.number ? "text-green-600 m" : "text-red-600 m"}>
					{criteria.number ? (
						<i className="fa-solid fa-check"></i>
					) : (
						<i className="fa-solid fa-x"></i>
					)}
					{t("Contains at least one number")}
				</li>
				<li className={criteria.symbol ? "text-green-600 m" : "text-red-600 m"}>
					{criteria.symbol ? (
						<i className="fa-solid fa-check"></i>
					) : (
						<i className="fa-solid fa-x"></i>
					)}
					{t("Contains at least one special character")}
				</li>
			</ul>
		</div>
	);
};

export default PasswordStrength;
