import React, { useEffect, useState, ChangeEvent } from "react";
import axiosInstance from "../../axios/axiosInstance";
import { toast } from "react-toastify";

interface User {
	name: string;
	phone_number: string;
	email: string;
	dob: {
		day: string;
		month: string;
		year: string;
	};
	address: string;
	gender: string;
	avatar: string;
}

type HandleInputChange = (field: keyof User, value: string) => void;

interface Dob {
	day: string;
	month: string;
	year: string;
}

type HandleDobChange = (field: keyof Dob, value: string) => void;
const months = [
	{ value: "1", label: "January" },
	{ value: "2", label: "February" },
	{ value: "3", label: "March" },
	{ value: "4", label: "April" },
	{ value: "5", label: "May" },
	{ value: "6", label: "June" },
	{ value: "7", label: "July" },
	{ value: "8", label: "August" },
	{ value: "9", label: "September" },
	{ value: "10", label: "October" },
	{ value: "11", label: "November" },
	{ value: "12", label: "December" },
];

const UserProfile = () => {
	const [user, setUser] = useState({
		name: "",
		phone_number: "",
		email: "",
		date_of_birth: { day: "", month: "", year: "" },
		gender: "",
		address: "",
		avatar: "",
	});

	useEffect(() => {
		const storedUser = localStorage.getItem("user");
		if (storedUser) {
			const parsedUser = JSON.parse(storedUser);
			if (parsedUser.date_of_birth) {
				const date_of_birth = new Date(
					parsedUser.date_of_birth,
				).toLocaleDateString("en-GB");
				const [day, month, year] = date_of_birth.split("/");

				const validMonth = months.some((m) => m.value === String(Number(month)))
					? String(Number(month))
					: "1";

				setUser((prev) => ({
					...prev,
					...parsedUser,
					date_of_birth: {
						day,
						month: validMonth,
						year,
					},
				}));
			}
		}
	}, []);
	const handleInputChange: HandleInputChange = (field, value) => {
		setUser((prev) => ({ ...prev, [field]: value }));
	};

	const handleDobChange: HandleDobChange = (field, value) => {
		setUser((prev) => ({
			...prev,
			date_of_birth: { ...prev.date_of_birth, [field]: value.toString() },
		}));
	};

	const handleUpdate = async () => {
		try {
			const formattedDob = `${user.date_of_birth.year}-${user.date_of_birth.month.padStart(2, "0")}-${user.date_of_birth.day.padStart(2, "0")}`;

			const updatedUser = {
				...user,
				date_of_birth: formattedDob,
				// avatar: imgString,
			};

			console.log("Updated user data:", updatedUser);

			const response = await axiosInstance.patch("/accounts/me", updatedUser);
			console.log("User updated successfully:", response);
			if (response.status === 200) {
				toast.success("User updated successfully");
			}
		} catch (error) {
			console.error("Error updating user:", error);
		}
	};

	const handleAvatarChange = async (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];

		if (!file) return;

		const isImage = file.type.startsWith("image/");
		const isUnderLimit = file.size <= 4 * 1024 * 1024; // 4MB

		if (!isImage) {
			toast.error(`${file.name} is not a valid image file.`);
			return;
		}
		if (!isUnderLimit) {
			toast.error(`${file.name} exceeds the 4MB size limit.`);
			return;
		}

		const formData = new FormData();
		formData.append("image", file);

		try {
			const response = await axiosInstance.post(
				"/medias/upload-image",
				formData,
			);
			console.log(response.data);
			if (response.status === 200) {
				setUser((prev) => ({
					...prev,
					avatar: response.data.result[0].url,
				}));
				toast.success("Image uploaded successfully!");
			} else {
				toast.error("Failed to upload image.");
			}
		} catch (error) {
			console.error("Upload error:", error);
			toast.error("Error uploading image.");
		}
	};

	return (
		<div className="container mx-auto p-5 max-w-4xl flex flex-col md:flex-row gap-8">
			{/* Avatar Section */}
			<div className="flex flex-col items-center md:w-1/3 justify-center relative">
				<div className="relative">
					<img
						src={
							user?.avatar ||
							"../../public/spa-avatar-flat-cartoon-design-this-illustration-avatar-woman-immersed-spa_198565-9639.avif"
						}
						alt="User Avatar"
						className="w-48 h-48 rounded-full border border-gray-300 mb-4"
					/>
					<label
						htmlFor="avatar-upload"
						className="absolute bottom-7 right-7 bg-white rounded-full cursor-pointer hover:bg-gray-200 w-10 h-10 flex items-center justify-center shadow-md"
					>
						<i className="fa-solid fa-pen"></i>
					</label>
					<input
						id="avatar-upload"
						type="file"
						accept="image/*"
						className="hidden"
						onChange={handleAvatarChange}
					/>
				</div>
			</div>

			{/* Form Section */}
			<div className="md:w-2/3">
				<h1 className="text-2xl font-bold mb-5">Edit profile details</h1>
				<form>
					{/* First and Last Name */}
					<div className="flex flex-col md:flex-row gap-4 mb-4">
						<div className="flex-1">
							<label className="block mb-1">Last name</label>
							<input
								type="text"
								value={user?.name}
								onChange={(e) => handleInputChange("name", e.target.value)}
								className="w-full p-2 border border-gray-300 rounded"
							/>
						</div>
					</div>

					{/* Mobile Number */}
					<div className="mb-4">
						<label className="block mb-1">Mobile number</label>
						<div className="flex gap-2">
							<select
								defaultValue="+84"
								className="p-2 border border-gray-300 rounded"
							>
								<option value="+84">+84</option>
							</select>
							<input
								type="text"
								value={user?.phone_number}
								onChange={(e) =>
									handleInputChange("phone_number", e.target.value)
								}
								className="flex-1 p-2 border border-gray-300 rounded"
							/>
						</div>
					</div>

					{/* Email */}
					<div className="mb-4">
						<label className="block mb-1">Email address</label>
						<input
							type="email"
							value={user?.email}
							onChange={(e) => handleInputChange("email", e.target.value)}
							className="w-full p-2 border border-gray-300 rounded"
						/>
					</div>
					<div className="mb-4">
						<label className="block mb-1">Address</label>
						<input
							type="address"
							value={user?.address}
							onChange={(e) => handleInputChange("address", e.target.value)}
							className="w-full p-2 border border-gray-300 rounded"
						/>
					</div>

					{/* Date of Birth */}
					<div className="flex flex-col md:flex-row gap-4 mb-4">
						<div className="flex-1">
							<label className="block mb-1">Date of birth</label>
							<div className="flex gap-2">
								<input
									type="text"
									placeholder="Day"
									value={user.date_of_birth.day}
									onChange={(e) => handleDobChange("day", e.target.value)}
									className="w-1/3 p-2 border border-gray-300 rounded"
								/>
								<select
									value={user.date_of_birth.month}
									onChange={(e) => handleDobChange("month", e.target.value)}
									className="w-1/3 p-2 border border-gray-300 rounded"
								>
									{months.map((month) => (
										<option key={month.value} value={month.value}>
											{month.label}
										</option>
									))}
								</select>
								<input
									type="text"
									placeholder="Year"
									value={user.date_of_birth.year}
									onChange={(e) => handleDobChange("year", e.target.value)}
									className="w-1/3 p-2 border border-gray-300 rounded"
								/>
							</div>
						</div>
					</div>
				</form>
				<button
					className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
					onClick={handleUpdate}
				>
					Save Changes
				</button>
			</div>
		</div>
	);
};

export default UserProfile;
