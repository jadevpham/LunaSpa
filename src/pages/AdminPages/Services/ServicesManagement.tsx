import { Box, Typography, Button } from "@mui/joy";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import UserTable from "../../../components/admin/Services/ServiceTable";
// import UserList from "../../../components/admin/Services/UserList";
import CustomBreadcrumbs from "../../../components/admin/Breadcrumbs";
const ServicesManagement = () => {
	return (
		<>
			<Box sx={{ display: "flex", alignItems: "center" }}>
				<CustomBreadcrumbs
					items={[
						{ title: "Dashboard", href: "/admin/dashboard" },
						{ title: "Services" },
						{ title: "Services Management" },
					]}
				/>
			</Box>
			<Box
				sx={{
					display: "flex",
					mb: 1,
					gap: 1,
					flexDirection: { xs: "column", sm: "row" },
					alignItems: { xs: "start", sm: "center" },
					flexWrap: "wrap",
					justifyContent: "space-between",
				}}
			>
				<Typography level="h2" component="h1">
					Services
				</Typography>
				<Button
					color="primary"
					startDecorator={<DownloadRoundedIcon />}
					size="sm"
				>
					Download PDF
				</Button>
			</Box>
			<UserTable />
			{/* <UserList /> */}
		</>
	);
};

export default ServicesManagement;
