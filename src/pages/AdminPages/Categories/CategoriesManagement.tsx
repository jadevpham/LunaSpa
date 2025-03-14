import { Box, Typography, Button } from "@mui/joy";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import UserTable from "../../../components/admin/Users/UserTable";
import UserList from "../../../components/admin/Users/UserList";
import CustomBreadcrumbs from "../../../components/admin/Breadcrumbs";
const CategoriesManagement = () => {
	return (
		<>
			<Box sx={{ display: "flex", alignItems: "center" }}>
				<CustomBreadcrumbs
					items={[
						{ title: "Dashboard", href: "/admin/dashboard" },
						{ title: "Categories" },
						{ title: "Categories Management" },
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
					Users
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
			<UserList />
		</>
	);
};

export default CategoriesManagement;
