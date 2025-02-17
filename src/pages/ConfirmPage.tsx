import React from "react";

const ConfirmPage = () => {
	return (
		<div className="p-5">
			<h2 className="text-2xl font-bold">Xác nhận đặt lịch</h2>
			<p className="mt-3">Bạn đã chọn:</p>
			<ul className="list-disc pl-5 mt-2">
				<li>Dịch vụ: Cắt tóc</li>
				<li>Chuyên gia: Thợ A</li>
				<li>Thời gian: 10:00 AM</li>
			</ul>
			<button className="bg-green-500 text-white p-2 rounded mt-5 w-full">
				Xác nhận
			</button>
		</div>
	);
};

export default ConfirmPage;
