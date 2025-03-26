import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

// Định nghĩa kiểu dữ liệu cho một tin nhắn
interface ChatMessage {
	role: "user" | "assistant";
	content: string;
}

// Kiểu dữ liệu cho state của chat
interface ChatState {
	messages: ChatMessage[];
	loading: boolean;
	error: string | null;
}

// Khai báo trạng thái ban đầu
const initialState: ChatState = {
	messages: [],
	loading: false,
	error: null,
};

// Action gửi tin nhắn đến OpenAI
export const sendMessage = createAsyncThunk(
	"chat/sendMessage",
	async (message: string) => {
		try {
			const apiKey = import.meta.env.VITE_CHATGPT_KEY;

			if (!apiKey) {
				throw new Error("API Key không tồn tại. Kiểm tra file .env.");
			}
			await new Promise((resolve) => setTimeout(resolve, 2000));
			const response = await axios.post(
				"http://localhost:8010/proxy/v1/chat/completions",
				{
					model: "gpt-3.5-turbo",
					messages: [{ role: "user", content: message }],
				},
				{
					headers: {
						// Authorization: `Bearer ${apiKey}`,
						"Content-Type": "application/json",
					},
					// httpsAgent: new (require("https").Agent)({ rejectUnauthorized: false }),
				},
			);

			console.log("ChatGPT Response:", response.data);
			return response.data.choices[0].message as ChatMessage;
		} catch (error: any) {
			console.error("Lỗi gọi API:", error.response?.data || error.message);
			console.log(error.response?.data);
			throw error;
		}
	},
);

// Tạo slice cho chat
const chatSlice = createSlice({
	name: "chat",
	initialState,
	reducers: {
		addUserMessage: (state, action: PayloadAction<string>) => {
			state.messages.push({ role: "user", content: action.payload });
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(sendMessage.fulfilled, (state, action) => {
				state.messages.push(action.payload);
				state.loading = false;
			})
			.addCase(sendMessage.pending, (state) => {
				state.loading = true;
			})
			.addCase(sendMessage.rejected, (state, action) => {
				state.loading = false;
				console.error("API call failed:", action.error.message);
			});
	},
});

export const { addUserMessage } = chatSlice.actions;
export default chatSlice.reducer;
