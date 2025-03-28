import { useState, useEffect, Fragment, useCallback } from "react";
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
import { format } from "date-fns";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import BlockIcon from "@mui/icons-material/Block";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import axiosInstance from "../../../axios/axiosInstance";
import ViewDetailOrderModal from "./ViewDetailOrder";

type Customer = {
	_id: string;
	email: string;
	name: string;
	phone_number: string;
	address: string;
};

type Item = {
	_id: string;
	order_id: string;
	item_type: string;
	item_id: string;
	item_name: string;
	price: number;
	discount_price: number;
	quantity: number;
	slot_id: string | null;
	staff_profile_id: string | null;
	start_time: string | null;
	end_time: string | null;
	note: string | null;
};

type OrderType = {
	_id: string;
	customer_account_id: string;
	branch_id: string;
	created_at: string;
	updated_at: string;
	booking_time: string | null;
	start_time: string | null;
	end_time: string | null;
	status: string;
	total_price: number;
	discount_amount: number;
	final_price: number;
	payment_method: string;
	transaction_id: string | null;
	note: string;
	customer: Customer;
	branch: {
		_id: string;
		name: string;
		description: string;
		rating: number;
		contact: {
			phone: string;
			email: string;
			address: string;
		};
		created_at: string;
		updated_at: string;
	};
	items: Item[];
};
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

function getComparator<Key extends keyof OrderType>(
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

export default function OrderTable() {
	const [order, setOrder] = useState<Order>("desc");
	const [selected, setSelected] = useState<readonly string[]>([]);
	const [open, setOpen] = useState(false);
	const [rows, setRows] = useState<OrderType[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
	const [selectedCount, setSelectedCount] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [totalPages, setTotalPages] = useState(1);
	const [totalCount, setTotalCount] = useState(0);
	const [status, setStatus] = useState("");
	const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const statusOptions = [
		{ _id: "confirmed", name: "Confirmed" },
		{ _id: "pending", name: "Pending" },
		{ _id: "cancelled", name: "Cancelled" },
	];

	const handleViewDetail = (order: OrderType) => {
		setSelectedOrder(order);
		setIsModalOpen(true);
	};

	const getOrders = async () => {
		const params = new URLSearchParams();

		if (status) {
			params.append("status", status);
		}
		if (typeof itemsPerPage === "number" && !isNaN(itemsPerPage)) {
			params.append("limit", itemsPerPage.toString());
		}
		if (typeof currentPage === "number" && !isNaN(currentPage)) {
			params.append("page", currentPage.toString());
		}

		try {
			const orderResponse = await axiosInstance.get(
				`/orders?${params.toString()}`,
			);
			setRows(orderResponse.data.result.data);
			setTotalCount(orderResponse.data.total_count);
			setTotalPages(orderResponse.data.total_pages);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	useEffect(() => {
		getOrders();
	}, []);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedSearchTerm(searchTerm);
		}, 200);

		return () => {
			clearTimeout(handler);
		};
	}, [searchTerm]);

	useEffect(() => {
		getOrders();
	}, [debouncedSearchTerm, currentPage, itemsPerPage, status]);

	const handlePrevPage = useCallback(() => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	}, [currentPage]);

	const handleNextPage = useCallback(() => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	}, [currentPage, totalPages]);

	const handleChangeRowsPerPage = useCallback(
		(_event: unknown, newValue: number | null) => {
			setItemsPerPage(parseInt(newValue!.toString(), 10));
			setCurrentPage(1);
		},
		[],
	);

	const handleCheckboxChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		rowId: string,
	) => {
		if (event.target.checked) {
			setSelected((ids) => [...ids, rowId]);
		} else {
			setSelected((ids) => ids.filter((id) => id !== rowId));
		}
		setSelectedCount(selected.length + (event.target.checked ? 1 : -1));
	};

	const handleStatusChange = (_event: unknown, newValue: string | null) => {
		setStatus(newValue || "");
		if (newValue) {
			setCurrentPage(1);
		}
		setSelected([]);
		setSelectedCount(0);
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

	const renderFilters = () => (
		<Fragment>
			<FormControl size="sm">
				<FormLabel>Status</FormLabel>
				<Select
					size="sm"
					placeholder="Filter by status"
					onChange={handleStatusChange}
					slotProps={{ button: { sx: { whiteSpace: "nowrap" } } }}
					value={status}
				>
					<Option value="">All</Option>
					{statusOptions.map((s) => (
						<Option key={s._id} value={s._id}>
							{s.name}
						</Option>
					))}
				</Select>
			</FormControl>
		</Fragment>
	);
	return (
		<Fragment>
			<Sheet
				className="SearchAndFilters-mobile"
				sx={{ display: { xs: "flex", sm: "none" }, my: 1, gap: 1 }}
			>
				<Input
					size="sm"
					placeholder="Search"
					startDecorator={<SearchIcon />}
					onChange={(e) => setSearchTerm(e.target.value)}
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
					<FormLabel>Search for order</FormLabel>
					<Input
						size="sm"
						placeholder="Search"
						startDecorator={<SearchIcon />}
					/>
				</FormControl>
				{renderFilters()}
			</Box>
			{searchTerm && (
				<Typography level="body-sm">
					Search result: {totalCount} found
				</Typography>
			)}
			<Sheet
				className="OrderTableContainer"
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
				{selectedCount > 0 && (
					<Typography level="body-sm" sx={{ padding: 1 }}>
						Selected: {selectedCount}
					</Typography>
				)}
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
							<th style={{ width: 140, padding: "12px 6px" }}>Order Id</th>

							<th style={{ width: 120, padding: "12px 6px" }}>
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
									Date
								</Link>
							</th>
							<th style={{ width: 140, padding: "12px 6px" }}>Status</th>
							<th style={{ width: 240, padding: "12px 6px" }}>Customer</th>
							<th style={{ width: 140, padding: "12px 6px" }}>Action</th>
						</tr>
					</thead>
					<tbody>
						{[...rows].sort(getComparator(order, "_id")).map((row) => (
							<tr key={row._id}>
								<td style={{ textAlign: "center", width: 120 }}>
									<Checkbox
										size="sm"
										checked={selected.includes(row._id)}
										color={selected.includes(row._id) ? "primary" : undefined}
										onChange={(event) => handleCheckboxChange(event, row._id)}
										slotProps={{ checkbox: { sx: { textAlign: "left" } } }}
										sx={{ verticalAlign: "text-bottom" }}
									/>
								</td>
								<td>
									<Typography level="body-xs">{row._id}</Typography>
								</td>
								<td>
									<Typography level="body-xs">
										{format(new Date(row.created_at), "dd/MM/yyyy")}
									</Typography>
								</td>
								<td>
									<Chip
										variant="soft"
										size="sm"
										startDecorator={
											{
												confirmed: <CheckRoundedIcon />,
												pending: <AutorenewRoundedIcon />,
												cancelled: <BlockIcon />,
											}[row.status]
										}
										color={
											{
												confirmed: "success",
												pending: "neutral",
												cancelled: "danger",
											}[row.status] as ColorPaletteProp
										}
									>
										{row.status.charAt(0).toUpperCase() + row.status.slice(1)}
									</Chip>
								</td>
								<td>
									<Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
										<div>
											<Typography level="body-xs">
												{row.customer.name}
											</Typography>
											<Typography level="body-xs">
												{row.customer.email}
											</Typography>
										</div>
									</Box>
								</td>
								<td>
									<Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
										<Button onClick={() => handleViewDetail(row)}>
											Detail
										</Button>
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
			<ViewDetailOrderModal
				order={selectedOrder}
				isOpen={isModalOpen}
				onClose={() => {
					console.log("Modal closed");
					setIsModalOpen(false);
				}}
			/>
		</Fragment>
	);
}
