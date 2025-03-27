import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../../axios/axiosInstance";

type Role = {
	role_id: string;
	role_name: string;
};
type Account = {
	_id: string;
	name: string;
	phone_number: string;
	email: string;
	address: string;
	avatar: string;
	roles: Role;
	date_of_birth: string;
	verify: number;
	created_at: string;
	updated_at: string;
};
type Condition = {
	_id: string;
	name: string;
	description: string;
	instructions: string;
	created_at: string;
	updated_at: string;
};
type User = {
	account: Account;
	conditions: Condition[];
	_id: string;
};
interface EditUserModalProps {
	user: User | null;
	isOpen: boolean;
	onClose: () => void;
	onSave: (updatedUser: User) => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
	user,
	isOpen,
	onClose,
	onSave,
}) => {
	const [editedUser, setEditedUser] = useState<User | null>(user);

	useEffect(() => {
		setEditedUser(user); // Update data when opening modal
	}, [user]);

	if (!isOpen || !editedUser) return null;

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { name, value } = e.target;
		setEditedUser({
			...editedUser,
			account: {
				...editedUser.account,
				[name]: value,
			},
		});
	};

	const handleSave = async () => {
		if (editedUser) {
			try {
				const response = await axiosInstance.patch(
					`/users/${editedUser._id}`,
					editedUser,
				);
				if (response.status !== 200) {
					throw new Error("Failed to update user");
				}
				toast.success("User updated successfully");
				onSave(response.data.result);
			} catch (error) {
				console.error("Error updating user:", error);
				toast.error("Failed to update user");
			}
		}
		onClose();
	};

	return (
		<div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
			<div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
				<h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
					Edit User
				</h2>
				<div className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Name
						</label>
						<input
							type="text"
							name="name"
							value={editedUser.account.name}
							onChange={handleChange}
							className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Email
						</label>
						<input
							type="email"
							name="email"
							value={editedUser.account.email}
							onChange={handleChange}
							className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Phone Number
						</label>
						<input
							type="text"
							name="phone_number"
							value={editedUser.account.phone_number}
							onChange={handleChange}
							className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Address
						</label>
						<input
							type="text"
							name="address"
							value={editedUser.account.address}
							onChange={handleChange}
							className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Date of Birth
						</label>
						<input
							type="date"
							name="date_of_birth"
							value={editedUser.account.date_of_birth}
							onChange={handleChange}
							className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Verification Status
						</label>
						<select
							name="verify"
							value={editedUser.account.verify}
							onChange={handleChange}
							className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						>
							<option value={0}>UNVERIFIED</option>
							<option value={1}>VERIFIED</option>
							<option value={2}>DELETED</option>
							<option value={3}>BLOCKED</option>
						</select>
					</div>
				</div>

				<div className="mt-6 flex justify-end space-x-3">
					<button
						onClick={onClose}
						className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-200"
					>
						Cancel
					</button>
					<button
						onClick={handleSave}
						className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
					>
						Save
					</button>
				</div>
			</div>
		</div>
	);
};

export default EditUserModal;
