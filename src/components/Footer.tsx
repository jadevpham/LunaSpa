import React from "react";
import { useTranslation } from "react-i18next";
const Footer: React.FC = () => {
	const { t } = useTranslation();
	return (
		<>
			<div className="bg-1 py-10">
				<div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 justify-between">
					{/* Cột 1: Logo + Đăng ký */}
					<div className="text-center md:text-left">
						<p>{t("Enjoy spa time – Quick booking, lasting relaxation!")}</p>
						<div className="mt-4">
							<input
								type="email"
								placeholder={t("Enter you email address")}
								className="w-full p-2 rounded text-gray-800"
							/>
							<button className="w-full bg-2 text-white py-2 rounded mt-2">
								{t("Sign Up")}
							</button>
						</div>
					</div>
					{/* Cột 1: Phương thức thanh toán & Mạng xã hội */}
					<div className="pl-14">
						<h3 className="text-lg font-bold">{t("Payment method")}</h3>
						<div className="flex gap-4 mt-2">
							<img
								src="../../public/vnpay.png"
								alt="VNPAY"
								title="VNPAY"
								className="h-8"
							/>
							<img
								src="../../public/momo.png"
								alt="Momo"
								title="MOMO"
								className="h-8"
							/>
							<img
								src="../../public/bank.png"
								alt="Bank"
								title="BANK"
								className="h-8"
							/>
						</div>
						<div>
							<h3 className="text-lg font-bold mt-8">{t("Find us on social")}</h3>
							<div className="flex gap-2 mt-2">
								<img
									src="../../public/facebook.png"
									alt="Facebook"
									className="h-8"
								/>
								<img
									src="../../public/instagram.png"
									alt="Instagram"
									className="h-8"
								/>
								<img
									src="../../public/youtube.png"
									alt="YouTube"
									className="h-8"
								/>
								<img
									src="../../public/tiktok.png"
									alt="TikTok"
									className="h-8"
								/>
							</div>
						</div>
					</div>
					{/* Cột 3: Chính sách */}
					<div className="pl-14">
						<h3 className="font-bold text-lg">{t("Policy")}</h3>
						<ul className="mt-2 space-y-2">
							<li>
								<a href="#" className="hover:underline">
									{t("About us")}
								</a>
							</li>
							<li>
								<a href="#" className="hover:underline">
									{t("Return Policy")}
								</a>
							</li>
							<li>
								<a href="#" className="hover:underline">
									{t("Privacy Policy")}
								</a>
							</li>
							<li>
								<a href="#" className="hover:underline">
									{t("Terms of Service")}
								</a>
							</li>
							<li>
								<a href="#" className="hover:underline">
									{t("Contact us")}
								</a>
							</li>
						</ul>
					</div>
					{/* Cột 4: Thông tin liên hệ */}
					<div>
						<h3 className="font-bold text-lg">{t("Contact Information")}</h3>
						<p className="mt-2">
							<i className="fa-solid fa-house"></i> {t("6th Floor, Flemington Building, 182 Le Dai Hanh Street, Ward 15, District 11, Ho Chi Minh City.")}
						</p>
						<p>
							<i className="fa-solid fa-phone"></i> 0987654321
						</p>
						<p>
							<i className="fa-solid fa-envelope"></i> hi@lunaspa.com
						</p>
						<p>
							<i className="fa-solid fa-clock"></i> {t("(Mon - Fri. 8 am - 4 pm)")}
						</p>
					</div>
				</div>
				<div className="bottom-footer text-center">
					<div className="w-full px-4 pt-9">
						<p className="text-sm text-3">Copyright © 2025 Luna Spa.</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default Footer;
