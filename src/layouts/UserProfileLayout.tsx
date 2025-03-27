import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import UserSidebar from "../components/UserSidebar";
import UserHeader from "../components/UserHeader";
import LoadingAnimation from "../components/LoadingAnimation";
import { useAuth } from "../auth-middlewares/useAuth";

const UserProfileLayout = () => {
	const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
	const [isPageLoading, setIsPageLoading] = useState(true);
	const { isLoading } = useAuth();
	const location = useLocation();

	useEffect(() => {
		setIsPageLoading(true);

		const timer = setTimeout(() => {
			setIsPageLoading(false);
		}, 1000);

		return () => clearTimeout(timer);
	}, [location.pathname]);

	if (isLoading || isPageLoading) {
		return <LoadingAnimation msg="Loading..." />;
	}

	return (
		<div className="flex h-screen">
			{/* Sidebar */}
			<div
				className={`${
					isSidebarCollapsed ? "w-18" : "w-64"
				} h-full transition-width duration-300`}
			>
				<UserSidebar
					onCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
				/>
			</div>
			{/* Main Content */}
			<div className="flex flex-1 flex-col">
				{/* Header */}
				<div>
					<UserHeader />
				</div>
				<div className="flex-1 p-4">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default UserProfileLayout;
