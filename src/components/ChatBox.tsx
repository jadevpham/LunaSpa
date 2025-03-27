import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store"; // Import kiểu từ store
import { sendMessage, addUserMessage } from "../redux/chatSlice";

export default function Chatbox() {
	const [input, setInput] = useState("");
	const dispatch = useDispatch<AppDispatch>(); // Định kiểu AppDispatch
	const { messages, loading } = useSelector((state: RootState) => state.chat);

	// Sử dụng useRef để lưu thời gian gửi tin nhắn cuối cùng
	const lastSentTime = useRef<number>(0);

	const handleSendMessage = () => {
		if (!input.trim()) return;
		// Kiểm tra thời gian gửi tin nhắn cuối cùng (tránh spam API)
		const now = Date.now();
		if (now - lastSentTime.current < 20000) {
			alert("Vui lòng chờ trước khi gửi tiếp!");
			return;
		}

		dispatch(addUserMessage(input)); // Thêm tin nhắn của user vào Redux store
		dispatch(sendMessage(input)); // Gửi tin nhắn đến ChatGPT API
		setInput("");
		// Cập nhật thời gian gửi tin nhắn cuối cùng
		lastSentTime.current = now;
	};
	// Thêm sự kiện gửi khi nhấn Enter
	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			event.preventDefault(); // Ngăn form bị submit mặc định
			handleSendMessage();
		}
	};

	return (
		<div className="fixed bottom-5 right-5 w-80 bg-white shadow-lg rounded-lg border border-gray-300">
			<div className="p-4 border-b bg-blue-500 text-white rounded-t-lg">
				<h3 className="text-lg font-semibold">Chatbot Hỗ Trợ</h3>
			</div>
			<div className="p-3 h-64 overflow-y-auto space-y-2">
				{messages.map((msg, index) => (
					<div
						key={index}
						className={`p-2 rounded-lg max-w-[75%] ${
							msg.role === "user"
								? "bg-blue-500 text-white self-end ml-auto"
								: "bg-gray-200 text-black"
						}`}
					>
						<p>{msg.content}</p>
					</div>
				))}
				{loading && <p className="text-gray-500">Đang phản hồi...</p>}
			</div>
			<div className="flex p-2 border-t bg-gray-100 rounded-b-lg">
				<input
					className="flex-1 p-2 border rounded-l-lg outline-none"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyDown={handleKeyDown} // 👈 Thêm sự kiện Enter
					placeholder="Nhập tin nhắn..."
				/>
				<button
					className="px-4 bg-blue-500 text-white rounded-r-lg disabled:bg-gray-400"
					onClick={handleSendMessage}
					disabled={loading}
				>
					Gửi
				</button>
			</div>
		</div>
	);
}
