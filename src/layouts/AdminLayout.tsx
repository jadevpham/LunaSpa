import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import AdminHeader from "../components/admin/AdminHeader";
import Sidebar from "../components/admin/AdminSidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
	return (
		<CssVarsProvider disableTransitionOnChange>
			<CssBaseline />
			<Box sx={{ display: "flex", minHeight: "100dvh" }}>
				<AdminHeader />
				<Sidebar />
				<Box
					component="main"
					className="MainContent"
					sx={{
						px: { xs: 2, md: 6 },
						pt: {
							xs: "calc(12px + var(--Header-height))",
							sm: "calc(12px + var(--Header-height))",
							md: 3,
						},
						pb: { xs: 2, sm: 2, md: 3 },
						flex: 1,
						display: "flex",
						flexDirection: "column",
						minWidth: 0,
						height: "100vh",
						gap: 1,
					}}
				>
					<Outlet />
				</Box>
			</Box>
		</CssVarsProvider>
	);
};

export default AdminLayout;
