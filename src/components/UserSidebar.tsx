import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const menuItems = [
	{ icon: "fa-solid fa-user-tie", label: "Profile", href: "/user/profile" },
	{
		icon: "fa-regular fa-calendar",
		label: "Appointment",
		href: "/user/appointment",
	},
	{ icon: "fa-regular fa-heart", label: "Favorites", href: "/user/favorites" },
	{ icon: "fa-regular fa-clock", label: "Histories", href: "/user/histories" },
];

interface UserSidebarProps {
	onCollapse: () => void;
}

const UserSidebar: React.FC<UserSidebarProps> = ({ onCollapse }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const [user, setUser] = useState<{ name: string; avatar: string } | null>(
		null,
	);
	const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

	useEffect(() => {
		const storedUser = localStorage.getItem("user");
		if (storedUser) {
			setUser(JSON.parse(storedUser));
		}
	}, []);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 1024) {
				setIsSidebarCollapsed(true);
			} else {
				setIsSidebarCollapsed(false);
			}
		};

		handleResize();

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const sidebarClass = isSidebarCollapsed ? "w-16" : "w-48";
	const textClass = isSidebarCollapsed
		? "opacity-0 w-0 overflow-hidden"
		: "opacity-100 w-full";
	const iconClass = isSidebarCollapsed ? "justify-center" : "justify-start";

	const handleNavigate = (href: string) => {
		navigate(href);
	};

	const isActive = (href: string) => location.pathname === href;

	return (
		<div
			className={`h-screen ${sidebarClass} bg-white text-black flex flex-col transition-all duration-300 border-r border-gray-300 shadow-md`}
		>
			<div className="p-4 text-xl z-30 font-semibold border-b border-gray-300 flex items-center">
				{isSidebarCollapsed ? (
					<img
						src={
							user?.avatar ||
							"../../public/spa-avatar-flat-cartoon-design-this-illustration-avatar-woman-immersed-spa_198565-9639.avif"
						}
						alt="User Avatar"
						className="w-8 h-8 rounded-full cursor-pointer"
						onClick={() => {
							onCollapse();
							setIsSidebarCollapsed(!isSidebarCollapsed);
						}}
					/>
				) : (
					<div
						className={`flex items-center transition-all duration-300 ${textClass} overflow-hidden`}
					>
						<span className={`w-10 ${textClass} overflow-hidden mr-2`}>
							{user?.name}
						</span>
						<button
							className="ml-auto"
							onClick={() => {
								onCollapse();
								setIsSidebarCollapsed(!isSidebarCollapsed);
							}}
						>
							<i className="fa-solid fa-bars"></i>
						</button>
					</div>
				)}
			</div>
			<nav className="flex-1 z-30">
				<ul>
					{menuItems.map((item, index) => (
						<li key={index}>
							<button
								className={`mb-2 flex items-center px-4 py-3 transition-all duration-300 w-full rounded-lg relative
									${
										isActive(item.href)
											? "bg-blue-50 text-blue-600 font-medium"
											: "hover:bg-gray-100"
									}`}
								onClick={() => handleNavigate(item.href)}
							>
								<span className={`flex items-center ${iconClass} w-6 ml-1`}>
									<i
										className={`${item.icon} text-lg ${isActive(item.href) ? "text-blue-600" : ""}`}
									></i>
								</span>
								<p
									className={`text-base transition-all duration-300 ${textClass}`}
								>
									{item.label}
								</p>
								{isActive(item.href) && (
									<div className="absolute left-0 top-0 h-full w-1 bg-blue-600 rounded-r-lg"></div>
								)}
							</button>
						</li>
					))}
				</ul>
			</nav>
		</div>
	);
};

export default UserSidebar;
