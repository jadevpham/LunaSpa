import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

type LngRet = { [lng: string]: { nativeName: string } };

const UserHeader = () => {
	const navigate = useNavigate();
	const { t, i18n } = useTranslation();
	const [lngs, setLngs] = useState<LngRet>({ en: { nativeName: "English" } });
	const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
	useEffect(() => {
		i18n.services.backendConnector.backend
			.getLanguages()
			.then((ret: LngRet) => setLngs(ret));
	}, [i18n]);

	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const [user, setUser] = useState<{ name: string; avatar: string } | null>(
		null,
	);

	useEffect(() => {
		const storedUser = localStorage.getItem("user");
		if (storedUser) {
			setUser(JSON.parse(storedUser));
		}
	}, []);

	const handleLogout = () => {
		localStorage.removeItem("user");
		localStorage.removeItem("access_token");
		localStorage.removeItem("refresh_token");
		setUser(null);
		toast.success("Logout successfully");
		navigate("/");
	};

	return (
		<div>
			<div className="container w-full justify-between mx-auto">
				<nav className="flex justify-between items-center py-6">
					{/* Logo */}
					<div className="text-3xl font-extrabold">
						<a href="/">LunaSpa</a>
					</div>
					{/* Nút */}
					<div className="relative flex items-center gap-4">
						<i
							className="fa-solid fa-globe cursor-pointer"
							onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
						></i>
						{isLanguageDropdownOpen && (
							<div className="absolute top-14 right-0 w-48 bg-white border rounded-lg shadow-lg">
								{Object.keys(lngs).map((lng) => {
									const isSelected = i18n.resolvedLanguage === lng;
									return (
										<button
											key={lng}
											type="button"
											disabled={isSelected}
											onClick={() => {
												i18n.changeLanguage(lng);
												setIsLanguageDropdownOpen(false);
												localStorage.setItem("language", lng);
											}}
											className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${isSelected ? "bg-gray-200" : ""
												}`}
										>
											{lngs[lng].nativeName.split(",")[0]}
										</button>
									);
								})}
							</div>
						)}

						{user ? (
							<div className="relative">
								<button
									className="flex items-center justify-between gap-4 bg-white border px-2 py-2 rounded-full w-24 h-12"
									onClick={() => setIsDropdownOpen(!isDropdownOpen)}
								>
									<img
										src={
											user.avatar ||
											"../../public/spa-avatar-flat-cartoon-design-this-illustration-avatar-woman-immersed-spa_198565-9639.avif"
										}
										alt="Avatar"
										className="w-10 h-10 rounded-full border"
									/>
									<i
										className={
											isDropdownOpen
												? "fa-solid fa-chevron-up"
												: "fa-solid fa-chevron-down"
										}
									></i>
								</button>

								{/* Dropdown Menu */}
								<div
									className={`absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg transition-all duration-300 ease-in-out transform 
${isDropdownOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-4 scale-95 pointer-events-none"}`}
								>
									<ul className="py-2">
										<li>
											<button
												onClick={() => navigate("/", { replace: true })}
												className="block w-full text-left px-4 py-2 hover:bg-gray-100"
											>
												{t("Home")}
											</button>
										</li>
										<li>
											<button
												onClick={handleLogout}
												className="block w-full text-left px-4 py-2 hover:bg-gray-100"
											>
												🚪 {t("logout")}
											</button>
										</li>
									</ul>
								</div>
							</div>
						) : (
							/* Nếu chưa login => Hiển thị nút Login */
							<button
								className="px-6 py-2 border-1.75 border-gray-400 rounded-full hover:bg-gray-200"
								onClick={() => navigate("auth")}
							>
								{t("Login")}
							</button>
						)}
					</div>
				</nav>
			</div>
		</div>
	);
};

export default UserHeader;
