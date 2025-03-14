import * as React from "react";
import GlobalStyles from "@mui/joy/GlobalStyles";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Divider from "@mui/joy/Divider";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton, { listItemButtonClasses } from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import SupportRoundedIcon from "@mui/icons-material/SupportRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import BrightnessAutoRoundedIcon from "@mui/icons-material/BrightnessAutoRounded";
import SpaRoundedIcon from "@mui/icons-material/SpaRounded";
import ListAltRoundedIcon from "@mui/icons-material/ListAltRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ChairAltRoundedIcon from "@mui/icons-material/ChairAltRounded";
import ColorSchemeToggle from "./ColorSchemeToggle";
import { closeSidebar } from "../../utils/utils";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function Toggler({
	defaultExpanded = false,
	renderToggle,
	children,
}: {
	defaultExpanded?: boolean;
	children: React.ReactNode;
	renderToggle: (params: {
		open: boolean;
		setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	}) => React.ReactNode;
}) {
	const [open, setOpen] = React.useState(defaultExpanded);
	return (
		<React.Fragment>
			{renderToggle({ open, setOpen })}
			<Box
				sx={[
					{
						display: "grid",
						transition: "0.2s ease",
						"& > *": {
							overflow: "hidden",
						},
					},
					open ? { gridTemplateRows: "1fr" } : { gridTemplateRows: "0fr" },
				]}
			>
				{children}
			</Box>
		</React.Fragment>
	);
}

const AdminSidebar = () => {
	const location = useLocation();
	const currentPath = location.pathname;
	const navigate = useNavigate();
	const handleLogout = () => {
		localStorage.removeItem("user");
		localStorage.removeItem("access_token");
		localStorage.removeItem("refresh_token");
		// setUser(null);
		toast.success("Logout successfully");
		navigate("/");
	};

	return (
		<Sheet
			className="Sidebar"
			sx={{
				position: { xs: "fixed", md: "sticky" },
				transform: {
					xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
					md: "none",
				},
				transition: "transform 0.4s, width 0.4s",
				zIndex: 10000,
				height: "100dvh",
				width: "var(--Sidebar-width)",
				top: 0,
				p: 2,
				flexShrink: 0,
				display: "flex",
				flexDirection: "column",
				gap: 2,
				borderRight: "1px solid",
				borderColor: "divider",
			}}
		>
			<GlobalStyles
				styles={(theme) => ({
					":root": {
						"--Sidebar-width": "220px",
						[theme.breakpoints.up("lg")]: {
							"--Sidebar-width": "240px",
						},
					},
				})}
			/>
			<Box
				className="Sidebar-overlay"
				sx={{
					position: "fixed",
					zIndex: 9998,
					top: 0,
					left: 0,
					width: "100vw",
					height: "100vh",
					opacity: "var(--SideNavigation-slideIn)",
					backgroundColor: "var(--joy-palette-background-backdrop)",
					transition: "opacity 0.4s",
					transform: {
						xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))",
						lg: "translateX(-100%)",
					},
				}}
				onClick={() => closeSidebar()}
			/>
			<Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
				<IconButton variant="soft" color="primary" size="sm">
					<BrightnessAutoRoundedIcon />
				</IconButton>
				<Typography level="title-lg">Luna Spa</Typography>
				<ColorSchemeToggle sx={{ ml: "auto" }} />
			</Box>
			<Input
				size="sm"
				startDecorator={<SearchRoundedIcon />}
				placeholder="Search"
			/>
			<Box
				sx={{
					minHeight: 0,
					overflow: "hidden auto",
					flexGrow: 1,
					display: "flex",
					flexDirection: "column",
					[`& .${listItemButtonClasses.root}`]: {
						gap: 1.5,
					},
				}}
			>
				<List
					size="sm"
					sx={{
						gap: 1,
						"--List-nestedInsetStart": "30px",
						"--ListItem-radius": (theme) => theme.vars.radius.sm,
					}}
				>
					<ListItem>
						<ListItemButton
							component={Link}
							to="/"
							selected={currentPath === "/"}
						>
							<HomeRoundedIcon />
							<ListItemContent>
								<Typography level="title-sm">Home</Typography>
							</ListItemContent>
						</ListItemButton>
					</ListItem>

					<ListItem>
						<ListItemButton
							component={Link}
							to="/admin/dashboard"
							selected={currentPath === "/admin/dashboard"}
						>
							<DashboardRoundedIcon />
							<ListItemContent>
								<Typography level="title-sm">Dashboard</Typography>
							</ListItemContent>
						</ListItemButton>
					</ListItem>

					<ListItem>
						<ListItemButton
							component={Link}
							to="/admin/orders"
							selected={currentPath === "/admin/orders"}
						>
							<ShoppingCartRoundedIcon />
							<ListItemContent>
								<Typography level="title-sm">Orders</Typography>
							</ListItemContent>
						</ListItemButton>
					</ListItem>
					<ListItem>
						<ListItemButton
							component={Link}
							to="/admin/devices"
							selected={currentPath === "/admin/devices"}
						>
							<ChairAltRoundedIcon />
							<ListItemContent>
								<Typography level="title-sm">Devices</Typography>
							</ListItemContent>
						</ListItemButton>
					</ListItem>

					<ListItem nested>
						<Toggler
							defaultExpanded={currentPath.startsWith("/admin/services")}
							renderToggle={({ open, setOpen }) => (
								<ListItemButton onClick={() => setOpen(!open)}>
									<SpaRoundedIcon />
									<ListItemContent>
										<Typography level="title-sm">Services</Typography>
									</ListItemContent>
									<KeyboardArrowDownIcon
										sx={[
											open
												? {
														transform: "rotate(180deg)",
													}
												: {
														transform: "none",
													},
										]}
									/>
								</ListItemButton>
							)}
						>
							<List sx={{ gap: 0.5 }}>
								<ListItem>
									<ListItemButton
										component={Link}
										to="/admin/services/service-management"
										selected={
											currentPath === "/admin/services/service-management"
										}
									>
										Service List
									</ListItemButton>
								</ListItem>
								<ListItem>
									<ListItemButton
										component={Link}
										to="/admin/services/create-service"
										selected={currentPath === "/admin/services/create-service"}
									>
										Create a new service
									</ListItemButton>
								</ListItem>
							</List>
						</Toggler>
					</ListItem>
					<ListItem nested>
						<Toggler
							defaultExpanded={currentPath.startsWith("/admin/categories")}
							renderToggle={({ open, setOpen }) => (
								<ListItemButton onClick={() => setOpen(!open)}>
									<ListAltRoundedIcon />
									<ListItemContent>
										<Typography level="title-sm">Categories</Typography>
									</ListItemContent>
									<KeyboardArrowDownIcon
										sx={[
											open
												? {
														transform: "rotate(180deg)",
													}
												: {
														transform: "none",
													},
										]}
									/>
								</ListItemButton>
							)}
						>
							<List sx={{ gap: 0.5 }}>
								<ListItem>
									<ListItemButton
										component={Link}
										to="/admin/categories/category-management"
										selected={
											currentPath === "/admin/categories/category-management"
										}
									>
										Category List
									</ListItemButton>
								</ListItem>
								<ListItem>
									<ListItemButton
										component={Link}
										to="/admin/categories/create-category"
										selected={
											currentPath === "/admin/categories/create-category"
										}
									>
										Create a new category
									</ListItemButton>
								</ListItem>
							</List>
						</Toggler>
					</ListItem>
					<ListItem nested>
						<Toggler
							defaultExpanded={currentPath.startsWith("/admin/users")}
							renderToggle={({ open, setOpen }) => (
								<ListItemButton onClick={() => setOpen(!open)}>
									<GroupRoundedIcon />
									<ListItemContent>
										<Typography level="title-sm">Users</Typography>
									</ListItemContent>
									<KeyboardArrowDownIcon
										sx={[
											open
												? {
														transform: "rotate(180deg)",
													}
												: {
														transform: "none",
													},
										]}
									/>
								</ListItemButton>
							)}
						>
							<List sx={{ gap: 0.5 }}>
								<ListItem>
									<ListItemButton
										component={Link}
										to="/admin/users/user-management"
										selected={currentPath === "/admin/users/user-management"}
									>
										Roles & permission
									</ListItemButton>
								</ListItem>
								<ListItem>
									<ListItemButton
										component={Link}
										to="/admin/users/create-user"
										selected={currentPath === "/admin/users/create-user"}
									>
										Create a new user
									</ListItemButton>
								</ListItem>
							</List>
						</Toggler>
					</ListItem>
				</List>
				<List
					size="sm"
					sx={{
						mt: "auto",
						flexGrow: 0,
						"--ListItem-radius": (theme) => theme.vars.radius.sm,
						"--List-gap": "8px",
						mb: 2,
					}}
				>
					<ListItem>
						<ListItemButton>
							<SupportRoundedIcon />
							Support
						</ListItemButton>
					</ListItem>
				</List>
			</Box>
			<Divider />
			<Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
				<Avatar
					variant="outlined"
					size="sm"
					src="https://muaxegiatot.com/wp-content/uploads/2021/05/dau-xe-mercedes-maybach-s680-4matic-2021-20202-muaxegiatot-vn.jpg"
				/>
				<Box sx={{ minWidth: 0, flex: 1 }}>
					<Typography level="title-sm">Username</Typography>
					<Typography level="body-xs">User email</Typography>
				</Box>
				<IconButton size="sm" variant="plain" color="neutral">
					<LogoutRoundedIcon onClick={handleLogout} />
				</IconButton>
			</Box>
		</Sheet>
	);
};

export default AdminSidebar;
