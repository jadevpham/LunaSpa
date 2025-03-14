import * as React from "react";
import { ColorPaletteProp } from "@mui/joy/styles";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Chip from "@mui/joy/Chip";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Link from "@mui/joy/Link";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import Checkbox from "@mui/joy/Checkbox";
import IconButton, { iconButtonClasses } from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Dropdown from "@mui/joy/Dropdown";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import BlockIcon from "@mui/icons-material/Block";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import { format } from "date-fns";

const rows = [
	{
		_id: "67c92fb96d614541fe7834f1",
		email: "olivia@email.com",
		name: "Olivia Ryhe",
		date_of_birth: "1990-05-12T00:00:00.000Z",
		verify: 3,
		created_at: "2025-03-06T05:16:41.515Z",
		updated_at: "2025-03-06T16:39:48.274Z",
		roles: [
			{
				role_id: "67bf26b9c85168a42384261d",
				role_name: "Admin",
			},
		],
	},
	{
		_id: "67c92fb96d614541fe7834f2",
		email: "steve.hamp@email.com",
		name: "Steve Hampton",
		date_of_birth: "1985-08-21T00:00:00.000Z",
		verify: 1,
		created_at: "2025-03-06T05:20:12.123Z",
		updated_at: "2025-03-06T16:41:30.987Z",
		roles: [
			{
				role_id: "67bf26b9c85168a42384261e",
				role_name: "User",
			},
		],
	},
	{
		_id: "67c92fb96d614541fe7áda834f3",
		email: "ciaran.murray@email.com",
		name: "Ciaran Murray",
		date_of_birth: "1992-11-03T00:00:00.000Z",
		verify: 2,
		created_at: "2025-03-06T05:22:33.789Z",
		updated_at: "2025-03-06T16:42:15.456Z",
		roles: [
			{
				role_id: "67bf26b9c85168a42384261f",
				role_name: "Staff",
			},
		],
	},
	{
		_id: "67c92fb96d614541fe7834f4",
		email: "maria.mc@email.com",
		name: "Maria Macdonald",
		date_of_birth: "1987-06-15T00:00:00.000Z",
		verify: 1,
		created_at: "2025-03-06T05:24:45.654Z",
		updated_at: "2025-03-06T16:43:27.789Z",
		roles: [
			{
				role_id: "67bf26b9c85168a423842620",
				role_name: "User",
			},
		],
	},
	{
		_id: "67c92fb96d3213614541fe7834f3",
		email: "ciaran.murray@email.com",
		name: "Ciaran Murray",
		date_of_birth: "1992-11-03T00:00:00.000Z",
		verify: 2,
		created_at: "2025-03-06T05:22:33.789Z",
		updated_at: "2025-03-06T16:42:15.456Z",
		roles: [
			{
				role_id: "67bf26b9c85168a42384261f",
				role_name: "Staff",
			},
		],
	},
	{
		_id: "67c92fb96d614541fe783d4f4",
		email: "maria.mc@email.com",
		name: "Maria Macdonald",
		date_of_birth: "1987-06-15T00:00:00.000Z",
		verify: 1,
		created_at: "2025-03-06T05:24:45.654Z",
		updated_at: "2025-03-06T16:43:27.789Z",
		roles: [
			{
				role_id: "67bf26b9c85168a423842620",
				role_name: "User",
			},
		],
	},
	{
		_id: "67c192fb96dád614541fe7834f3",
		email: "ciaran.murray@email.com",
		name: "Ciaran Murray",
		date_of_birth: "1992-11-03T00:00:00.000Z",
		verify: 2,
		created_at: "2025-03-06T05:22:33.789Z",
		updated_at: "2025-03-06T16:42:15.456Z",
		roles: [
			{
				role_id: "67bf26b9c85168a42384261f",
				role_name: "Staff",
			},
		],
	},
	{
		_id: "67c92fb96d61454sd1fe7834f4",
		email: "maria.mc@email.com",
		name: "Maria Macdonald",
		date_of_birth: "1987-06-15T00:00:00.000Z",
		verify: 1,
		created_at: "2025-03-06T05:24:45.654Z",
		updated_at: "2025-03-06T16:43:27.789Z",
		roles: [
			{
				role_id: "67bf26b9c85168a423842620",
				role_name: "User",
			},
		],
	},
	{
		_id: "67c92fbd12d96d614541fe7834f3",
		email: "ciaran.murray@email.com",
		name: "Ciaran Murray",
		date_of_birth: "1992-11-03T00:00:00.000Z",
		verify: 2,
		created_at: "2025-03-06T05:22:33.789Z",
		updated_at: "2025-03-06T16:42:15.456Z",
		roles: [
			{
				role_id: "67bf26b9c85168a42384261f",
				role_name: "Staff",
			},
		],
	},
	{
		_id: "67c92fb96d6145a41fe7834f4",
		email: "maria.mc@email.com",
		name: "Maria Macdonald",
		date_of_birth: "1987-06-15T00:00:00.000Z",
		verify: 1,
		created_at: "2025-03-06T05:24:45.654Z",
		updated_at: "2025-03-06T16:43:27.789Z",
		roles: [
			{
				role_id: "67bf26b9c85168a423842620",
				role_name: "User",
			},
		],
	},
	{
		_id: "67c92fab96d614541fe7834f3",
		email: "ciaran.murray@email.com",
		name: "Ciaran Murray",
		date_of_birth: "1992-11-03T00:00:00.000Z",
		verify: 2,
		created_at: "2025-03-06T05:22:33.789Z",
		updated_at: "2025-03-06T16:42:15.456Z",
		roles: [
			{
				role_id: "67bf26b9c85168a42384261f",
				role_name: "Staff",
			},
		],
	},
	{
		_id: "67c92fb96da614541fe7834f4",
		email: "maria.mc@email.com",
		name: "Maria Macdonald",
		date_of_birth: "1987-06-15T00:00:00.000Z",
		verify: 1,
		created_at: "2025-03-06T05:24:45.654Z",
		updated_at: "2025-03-06T16:43:27.789Z",
		roles: [
			{
				role_id: "67bf26b9c85168a423842620",
				role_name: "User",
			},
		],
	},
	{
		_id: "67c92fb96d6a14541fe7834f3",
		email: "ciaran.murray@email.com",
		name: "Ciaran Murray",
		date_of_birth: "1992-11-03T00:00:00.000Z",
		verify: 2,
		created_at: "2025-03-06T05:22:33.789Z",
		updated_at: "2025-03-06T16:42:15.456Z",
		roles: [
			{
				role_id: "67bf26b9c85168a42384261f",
				role_name: "Staff",
			},
		],
	},
	{
		_id: "67c92fb96d614d541fe7834f4",
		email: "maria.mc@email.com",
		name: "Maria Macdonald",
		date_of_birth: "1987-06-15T00:00:00.000Z",
		verify: 1,
		created_at: "2025-03-06T05:24:45.654Z",
		updated_at: "2025-03-06T16:43:27.789Z",
		roles: [
			{
				role_id: "67bf26b9c85168a423842620",
				role_name: "User",
			},
		],
	},
	{
		_id: "67c92fb96d3614541fe7834f5",
		email: "fulton@email.com",
		name: "Charles Fulton",
		date_of_birth: "1991-02-28T00:00:00.000Z",
		verify: 0,
		created_at: "2025-03-06T05:26:59.123Z",
		updated_at: "2025-03-06T16:44:10.345Z",
		roles: [
			{
				role_id: "67bf26b9c85168a423842621",
				role_name: "Admin",
			},
		],
	},
	{
		_id: "67c92fb96d614541fe7834f6",
		email: "jay.hooper@email.com",
		name: "Jay Hooper",
		date_of_birth: "1993-07-10T00:00:00.000Z",
		verify: 1,
		created_at: "2025-03-06T05:30:15.678Z",
		updated_at: "2025-03-06T16:45:22.890Z",
		roles: [
			{
				role_id: "67bf26b9c85168a423842622",
				role_name: "User",
			},
		],
	},
	{
		_id: "67c92fb96d614541fe7834f7",
		email: "krystal.stevens@email.com",
		name: "Krystal Stevens",
		date_of_birth: "1989-12-01T00:00:00.000Z",
		verify: 1,
		created_at: "2025-03-06T05:32:48.321Z",
		updated_at: "2025-03-06T16:46:37.543Z",
		roles: [
			{
				role_id: "67bf26b9c85168a423842623",
				role_name: "Staff",
			},
		],
	},
	{
		_id: "67c92fb96d614541fe7834f8",
		email: "sachin.flynn@email.com",
		name: "Sachin Flynn",
		date_of_birth: "1994-09-15T00:00:00.000Z",
		verify: 1,
		created_at: "2025-03-06T05:35:10.654Z",
		updated_at: "2025-03-06T16:48:10.987Z",
		roles: [
			{
				role_id: "67bf26b9c85168a423842624",
				role_name: "User",
			},
		],
	},
];
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof unknown>(
	order: Order,
	orderBy: Key,
): (
	a: { [key in Key]: number | string },
	b: { [key in Key]: number | string },
) => number {
	return order === "desc"
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

function RowMenu() {
	return (
		<Dropdown>
			<MenuButton
				slots={{ root: IconButton }}
				slotProps={{ root: { variant: "plain", color: "neutral", size: "sm" } }}
			>
				<MoreHorizRoundedIcon />
			</MenuButton>
			<Menu size="sm" sx={{ minWidth: 140 }}>
				<MenuItem>Edit</MenuItem>
				<MenuItem>Rename</MenuItem>
				<MenuItem>Move</MenuItem>
				<Divider />
				<MenuItem color="danger">Delete</MenuItem>
			</Menu>
		</Dropdown>
	);
}
export default function UserTable() {
	const [order, setOrder] = React.useState<Order>("desc");
	const [selected, setSelected] = React.useState<readonly string[]>([]);
	const [open, setOpen] = React.useState(false);
	const [currentPage, setCurrentPage] = React.useState(1);
	const [itemsPerPage, setItemsPerPage] = React.useState(10);

	const totalPages = Math.ceil(rows.length / itemsPerPage);

	const paginatedData = rows.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage,
	);

	const handlePrevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	const handleChangeRowsPerPage = (
		_event: unknown,
		newValue: number | null,
	) => {
		setItemsPerPage(parseInt(newValue!.toString(), 10));
		setCurrentPage(1);
	};

	const renderPagination = () => {
		const maxPagesToShow = 5;
		const pages = [];

		if (totalPages <= maxPagesToShow) {
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i);
			}
		} else {
			if (currentPage <= 3) {
				pages.push(1, 2, 3, 4, "...", totalPages);
			} else if (currentPage >= totalPages - 2) {
				pages.push(
					1,
					"...",
					totalPages - 3,
					totalPages - 2,
					totalPages - 1,
					totalPages,
				);
			} else {
				pages.push(
					1,
					"...",
					currentPage - 1,
					currentPage,
					currentPage + 1,
					"...",
					totalPages,
				);
			}
		}

		return pages.map((page, index) => (
			<IconButton
				key={index}
				size="sm"
				variant={currentPage === page ? "outlined" : "soft"}
				color="neutral"
				onClick={() => typeof page === "number" && setCurrentPage(page)}
				disabled={typeof page !== "number"}
			>
				{page}
			</IconButton>
		));
	};

	const getStatusText = (status: number) => {
		switch (status) {
			case 0:
				return "UNVERIFIED";
			case 1:
				return "VERIFIED";
			case 2:
				return "DELETED";
			case 3:
				return "BLOCKED";
			default:
				return "UNKNOWN";
		}
	};

	const renderFilters = () => (
		<React.Fragment>
			<FormControl size="sm">
				<FormLabel>Status</FormLabel>
				<Select
					size="sm"
					placeholder="Filter by status"
					slotProps={{ button: { sx: { whiteSpace: "nowrap" } } }}
				>
					<Option value="paid">Paid</Option>
					<Option value="pending">Pending</Option>
					<Option value="refunded">Refunded</Option>
					<Option value="cancelled">Cancelled</Option>
				</Select>
			</FormControl>
			<FormControl size="sm">
				<FormLabel>Category</FormLabel>
				<Select size="sm" placeholder="All">
					<Option value="all">All</Option>
					<Option value="refund">Refund</Option>
					<Option value="purchase">Purchase</Option>
					<Option value="debit">Debit</Option>
				</Select>
			</FormControl>
			<FormControl size="sm">
				<FormLabel>Customer</FormLabel>
				<Select size="sm" placeholder="All">
					<Option value="all">All</Option>
					<Option value="olivia">Olivia Rhye</Option>
					<Option value="steve">Steve Hampton</Option>
					<Option value="ciaran">Ciaran Murray</Option>
					<Option value="marina">Marina Macdonald</Option>
					<Option value="charles">Charles Fulton</Option>
					<Option value="jay">Jay Hoper</Option>
				</Select>
			</FormControl>
		</React.Fragment>
	);
	return (
		<React.Fragment>
			<Sheet
				className="SearchAndFilters-mobile"
				sx={{ display: { xs: "flex", sm: "none" }, my: 1, gap: 1 }}
			>
				<Input
					size="sm"
					placeholder="Search"
					startDecorator={<SearchIcon />}
					sx={{ flexGrow: 1 }}
				/>
				<IconButton
					size="sm"
					variant="outlined"
					color="neutral"
					onClick={() => setOpen(true)}
				>
					<FilterAltIcon />
				</IconButton>
				<Modal open={open} onClose={() => setOpen(false)}>
					<ModalDialog aria-labelledby="filter-modal" layout="fullscreen">
						<ModalClose />
						<Typography id="filter-modal" level="h2">
							Filters
						</Typography>
						<Divider sx={{ my: 2 }} />
						<Sheet sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
							{renderFilters()}
							<Button color="primary" onClick={() => setOpen(false)}>
								Submit
							</Button>
						</Sheet>
					</ModalDialog>
				</Modal>
			</Sheet>
			<Box
				className="SearchAndFilters-tabletUp"
				sx={{
					borderRadius: "sm",
					py: 2,
					display: { xs: "none", sm: "flex" },
					flexWrap: "wrap",
					gap: 1.5,
					"& > *": {
						minWidth: { xs: "120px", md: "160px" },
					},
				}}
			>
				<FormControl sx={{ flex: 1 }} size="sm">
					<FormLabel>Search for user</FormLabel>
					<Input
						size="sm"
						placeholder="Search"
						startDecorator={<SearchIcon />}
					/>
				</FormControl>
				{renderFilters()}
			</Box>
			<Sheet
				className="UserTableContainer"
				variant="outlined"
				sx={{
					display: { xs: "none", sm: "initial" },
					width: "100%",
					borderRadius: "sm",
					flexShrink: 1,
					overflow: "auto",
					minHeight: 0,
				}}
			>
				<Table
					aria-labelledby="tableTitle"
					stickyHeader
					hoverRow
					sx={{
						"--TableCell-headBackground":
							"var(--joy-palette-background-level1)",
						"--Table-headerUnderlineThickness": "1px",
						"--TableRow-hoverBackground":
							"var(--joy-palette-background-level1)",
						"--TableCell-paddingY": "4px",
						"--TableCell-paddingX": "8px",
					}}
				>
					<thead>
						<tr>
							<th
								style={{ width: 48, textAlign: "center", padding: "12px 6px" }}
							>
								<Checkbox
									size="sm"
									indeterminate={
										selected.length > 0 && selected.length !== rows.length
									}
									checked={selected.length === rows.length}
									onChange={(event) => {
										setSelected(
											event.target.checked ? rows.map((row) => row._id) : [],
										);
									}}
									color={
										selected.length > 0 || selected.length === rows.length
											? "primary"
											: undefined
									}
									sx={{ verticalAlign: "text-bottom" }}
								/>
							</th>
							<th style={{ width: 180, padding: "12px 6px" }}>
								<Link
									underline="none"
									color="primary"
									component="button"
									onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
									endDecorator={<ArrowDropDownIcon />}
									sx={[
										{
											fontWeight: "lg",
											"& svg": {
												transition: "0.2s",
												transform:
													order === "desc" ? "rotate(0deg)" : "rotate(180deg)",
											},
										},
										order === "desc"
											? { "& svg": { transform: "rotate(0deg)" } }
											: { "& svg": { transform: "rotate(180deg)" } },
									]}
								>
									Email
								</Link>
							</th>
							<th style={{ width: 140, padding: "12px 6px" }}>Name</th>
							<th style={{ width: 140, padding: "12px 6px" }}>DOB</th>
							<th style={{ width: 240, padding: "12px 6px" }}>Created at</th>
							<th style={{ width: 240, padding: "12px 6px" }}>Updated at</th>
							<th style={{ width: 140, padding: "12px 6px" }}>Role </th>
							<th style={{ width: 140, padding: "12px 6px" }}>Status </th>
							<th style={{ width: 140, padding: "12px 6px" }}>Actions </th>
						</tr>
					</thead>
					<tbody>
						{paginatedData.sort(getComparator(order, "email")).map((row) => (
							<tr key={row._id}>
								<td style={{ textAlign: "center", width: 120 }}>
									<Checkbox
										size="sm"
										checked={selected.includes(row._id)}
										color={selected.includes(row._id) ? "primary" : undefined}
										onChange={(event) => {
											setSelected((ids) =>
												event.target.checked
													? ids.concat(row._id)
													: ids.filter((itemId) => itemId !== row._id),
											);
										}}
										slotProps={{ checkbox: { sx: { textAlign: "left" } } }}
										sx={{ verticalAlign: "text-bottom" }}
									/>
								</td>
								<td>
									<Typography level="body-xs">{row.email}</Typography>
								</td>
								<td>
									<Typography level="body-xs">{row.name}</Typography>
								</td>
								<td>
									<Typography level="body-xs">
										{format(new Date(row.date_of_birth), "dd/MM/yyyy")}
									</Typography>
								</td>
								<td>
									<Typography level="body-xs">
										{format(new Date(row.created_at), "dd/MM/yyyy pp")}
									</Typography>
								</td>
								<td>
									<Typography level="body-xs">
										{format(new Date(row.updated_at), "dd/MM/yyyy pp")}
									</Typography>
								</td>
								<td>
									<Typography level="body-xs">
										{row.roles.map((role) => role.role_name).join(", ")}
									</Typography>
								</td>

								<td>
									<Chip
										variant="soft"
										size="sm"
										startDecorator={
											{
												0: <AutorenewRoundedIcon />,
												1: <CheckCircleOutlineRoundedIcon />,
												2: <HighlightOffRoundedIcon />,
												3: <BlockIcon />,
											}[row.verify]
										}
										color={
											{
												0: "primary",
												1: "success",
												2: "danger",
												3: "warning",
											}[row.verify] as ColorPaletteProp
										}
									>
										<Typography level="body-xs">
											{getStatusText(row.verify)}
										</Typography>
									</Chip>
								</td>
								{/* <td>
									<Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
										<Avatar size="sm">{row.name[0]}</Avatar>
										<div>
											<Typography level="body-xs">
												{row.name}
											</Typography>
											<Typography level="body-xs">
												{row.email}
											</Typography>
										</div>
									</Box>
								</td> */}
								<td>
									<Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
										<Link level="body-xs" component="button">
											Download
										</Link>
										<RowMenu />
									</Box>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</Sheet>
			<Box
				className="Pagination-laptopUp"
				sx={{
					pt: 2,
					gap: 1,
					[`& .${iconButtonClasses.root}`]: { borderRadius: "50%" },
					display: {
						xs: "none",
						md: "flex",
					},
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Box sx={{ flex: 1.5 }} />
				<KeyboardArrowLeftIcon
					sx={{
						cursor: "pointer",
						fontSize: "2rem",
					}}
					onClick={handlePrevPage}
				/>
				{/* {[...Array(totalPages)].map((_, index) => (
					<IconButton
						key={index + 1}
						size="sm"
						variant={currentPage === Number(index + 1) ? "soft" : "outlined"}
						color="neutral"
						onClick={() => setCurrentPage(index + 1)}
						sx={{
							backgroundColor:
								currentPage === index + 1 ? "#dde7ee" : "transparent",
							color: currentPage === index + 1 ? "black" : "inherit",
						}}
					>
						{index + 1}
					</IconButton>
				))} */}
				{renderPagination()}
				<KeyboardArrowRightIcon
					sx={{
						cursor: "pointer",
						fontSize: "2rem",
					}}
					onClick={handleNextPage}
				/>
				<Box sx={{ flex: 1 }} />
				<FormControl orientation="horizontal" size="sm">
					<FormLabel>Rows per page:</FormLabel>
					<Select onChange={handleChangeRowsPerPage} value={itemsPerPage}>
						<Option value={5}>5</Option>
						<Option value={10}>10</Option>
						<Option value={25}>25</Option>
						<Option value={50}>50</Option>
					</Select>
				</FormControl>
			</Box>
		</React.Fragment>
	);
}
