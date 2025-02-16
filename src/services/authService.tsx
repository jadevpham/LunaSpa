import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../axios/axiosInstance.tsx";

const signIn = async (data: { email: string; password: string }) => {
	const response = await axiosInstance.post("/auth/login", data);
	return response.data;
};

const signUp = async (data: {
	name: string;
	email: string;
	password: string;
}) => {
	const response = await axiosInstance.post("/auth/register", data);
	return response.data;
};

export const useSignIn = () => {
	return useMutation({
		mutationFn: signIn,
	});
};

export const useSignUp = () => {
	return useMutation({
		mutationFn: signUp,
	});
};
