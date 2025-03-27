import { Box, Typography, Button, Breadcrumbs, Link } from "@mui/joy";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import OrderTable from "../../../components/admin/Orders/OrderTable";
import OrderList from "../../../components/admin/Orders/OrderList";

const OrdersPage = () => {
	return (
		<>
			<Box sx={{ display: "flex", alignItems: "center" }}>
				<Breadcrumbs
					size="sm"
					aria-label="breadcrumbs"
					separator={<ChevronRightRoundedIcon />}
					sx={{ pl: 0 }}
				>
					<Link underline="none" color="neutral" href="/" aria-label="Home">
						<HomeRoundedIcon />
					</Link>
					<Link
						underline="hover"
						color="neutral"
						href="/"
						sx={{ fontSize: 12, fontWeight: 500 }}
					>
						Dashboard
					</Link>
					<Typography color="primary" sx={{ fontWeight: 500, fontSize: 12 }}>
						Orders
					</Typography>
				</Breadcrumbs>
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
					Orders
				</Typography>
				<Button
					color="primary"
					startDecorator={<DownloadRoundedIcon />}
					size="sm"
				>
					Download PDF
				</Button>
			</Box>
			<OrderTable />
			<OrderList />
		</>
	);
};

export default OrdersPage;
