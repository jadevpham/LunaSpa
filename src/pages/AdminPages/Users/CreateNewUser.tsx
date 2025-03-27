import { Box, Typography, Button } from "@mui/joy";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import CreateUserForm from "../../../components/admin/Users/CreateUserForm";
import CustomBreadcrumbs from "../../../components/admin/Breadcrumbs";
const CreateNewUser = () => {
	return (
		<>
			<Box sx={{ display: "flex", alignItems: "center" }}>
				<CustomBreadcrumbs
					items={[
						{ title: "Dashboard", href: "/admin/dashboard" },
						{ title: "Users" },
						{ title: "Create New User" },
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
			<CreateUserForm />
		</>
	);
};

export default CreateNewUser;
