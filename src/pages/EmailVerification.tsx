import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axiosInstance from "../axios/axiosInstance";
import LoadingAnimation from "../components/LoadingAnimation";
import { toast } from "react-toastify";

const UserProfile = () => {
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(true);
	const [searchParams] = useSearchParams();

	useEffect(() => {
		const verifyEmail = async () => {
			const token = searchParams.get("token");
			try {
				// Add delay simulation
				await new Promise((resolve) => setTimeout(resolve, 6000));
				const response = await axiosInstance.post(
					"http://localhost:4000/accounts/verify-email",
					{
						email_verify_token: token,
					},
				);
				setMessage(response.data.message);
				toast.success(response.data.message);
				console.log(response.data);
			} catch (error: any) {
				toast.error(error.response.data.message);
			} finally {
				setLoading(false);
			}
		};

		verifyEmail();
	}, [searchParams]);

	return (
		<div className="min-h-screen bg-gray-100 flex items-center justify-center">
			<div className="bg-white p-10 rounded-xl shadow-lg max-w-md w-full">
				<h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
					Email Verification
				</h1>
				{loading ? (
					<div className="text-center text-gray-600">
						<LoadingAnimation />
					</div>
				) : (
					<p
						className={`text-center text-lg ${message.includes("successfully") ? "text-green-600" : "text-red-600"}`}
					>
						{message}
					</p>
				)}
			</div>
		</div>
	);
};

export default UserProfile;
