import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
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
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import { format } from "date-fns";
import { Fragment, useEffect, useState, useCallback, useMemo } from "react";
import { Avatar } from "@mui/joy";
import axiosInstance from "../../../axios/axiosInstance";
import EditUserModal from "./EditUserModal";
import { toast } from "react-toastify";

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

function getComparator<Key extends keyof Account>(
	order: Order,
	orderBy: Key,
): (a: User, b: User) => number {
	return order === "desc"
		? (a, b) => descendingComparator(a.account, b.account, orderBy)
		: (a, b) => -descendingComparator(a.account, b.account, orderBy);
}

type Role = {
	role_id: string;
	role_name: string;
};
type Account = {
	_id: string;
	name: string;
	phone_number: string;
	email: string;
	address: string;
	avatar: string;
	roles: Role;
	date_of_birth: string;
	verify: number;
	created_at: string;
	updated_at: string;
};
type Condition = {
	_id: string;
	name: string;
	description: string;
	instructions: string;
	created_at: string;
	updated_at: string;
};
type User = {
	account: Account;
	conditions: Condition[];
	_id: string;
};

const getVerifyStatus = (status: number): string => {
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

export default function UserTable() {
	const [order, setOrder] = useState<Order>("asc");
	const [selected, setSelected] = useState<readonly string[]>([]);
	const [open, setOpen] = useState(false);

	const [rows, setRows] = useState<User[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
	const [selectedCount, setSelectedCount] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [totalPages, setTotalPages] = useState(1);
	const [totalCount, setTotalCount] = useState(0);

	const [selectedUser, setSelectedUser] = useState<User | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [userToDelete, setUserToDelete] = useState<User | null>(null);
	const [selectedRole, setSelectedRole] = useState<string>("");

	const handleEdit = (user: User) => {
		setSelectedUser(user);
		setIsModalOpen(true);
	};

	const handleSave = (updatedUser: User) => {
		setRows((prevRows) =>
			prevRows.map((row) => (row._id === updatedUser._id ? updatedUser : row)),
		);
		setIsModalOpen(false);
	};

	const handleDeleteClick = (user: User) => {
		setUserToDelete(user);
		setIsDeleteModalOpen(true);
	};

	const confirmDelete = () => {
		if (userToDelete) {
			axiosInstance
				.delete(`/user-profiles/${userToDelete._id}`)
				.then(() => {
					setRows((prevRows) =>
						prevRows.filter((row) => row._id !== userToDelete._id),
					);
					toast.success("user deleted successfully");
				})
				.catch((error) => {
					console.error("Error deleting user:", error);
					toast.error("Failed to delete user");
				})
				.finally(() => {
					setIsDeleteModalOpen(false);
					setUserToDelete(null);
				});
		}
	};

	const cancelDelete = () => {
		setIsDeleteModalOpen(false);
		setUserToDelete(null);
	};

	function RowMenu({ row }: { row: User }) {
		// console.log(row);
		return (
			<Dropdown>
				<MenuButton
					slots={{ root: IconButton }}
					slotProps={{
						root: { variant: "plain", color: "neutral", size: "sm" },
					}}
				>
					<MoreHorizRoundedIcon />
				</MenuButton>
				<Menu size="sm" sx={{ minWidth: 140 }}>
					<MenuItem onClick={() => handleEdit(row)}>Edit</MenuItem>
					<Divider />
					<MenuItem onClick={() => handleDeleteClick(row)} color="danger">
						Delete
					</MenuItem>
				</Menu>
			</Dropdown>
		);
	}
	const getUserProfile = async () => {
		const params = new URLSearchParams();
		if (typeof itemsPerPage === "number" && !isNaN(itemsPerPage)) {
			params.append("limit", itemsPerPage.toString());
		}
		if (typeof currentPage === "number" && !isNaN(currentPage)) {
			params.append("page", currentPage.toString());
		}
		if (searchTerm) {
			params.append("search", searchTerm);
		}
		if (selectedRole) {
			params.append("role", selectedRole);
		}
		try {
			const userResponse = await axiosInstance.get(
				`/user-profiles?${params.toString()}`,
			);
			console.log(userResponse.data.result.data);
			setTotalCount(userResponse.data.total_count);
			setTotalPages(userResponse.data.total_pages);
			setRows(userResponse.data.result.data);
		} catch (error) {
			console.error("Error fetching data:", error);
			// Handle error (e.g., show a notification)
		}
	};

	console.log(rows);
	useEffect(() => {
		getUserProfile();
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
		getUserProfile();
	}, [itemsPerPage, currentPage, debouncedSearchTerm, selectedRole]);

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

	const handleRoleChange = (_event: unknown, newValue: string | null) => {
		setSelectedRole(newValue || "");
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
					slotProps={{ button: { sx: { whiteSpace: "nowrap" } } }}
					onChange={handleRoleChange}
				>
					<Option value="">All</Option>
					<Option value="Admin">Admin</Option>
					<Option value="User">User</Option>
					<Option value="Staff">Staff</Option>
					<Option value="Receptionist">Receptionist</Option>
					<Option value="Practitioner">Practitioner</Option>
				</Select>
			</FormControl>
		</Fragment>
	);

	const sortedRows = useMemo(() => {
		return rows.sort(getComparator(order, "created_at"));
	}, [rows, order]);

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
					<FormLabel>Search for user</FormLabel>
					<Input
						size="sm"
						placeholder="Search"
						startDecorator={<SearchIcon />}
						onChange={(e) => setSearchTerm(e.target.value)}
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
										setSelectedCount(event.target.checked ? rows.length : 0);
									}}
									color={
										selected.length > 0 || selected.length === rows.length
											? "primary"
											: undefined
									}
									sx={{ verticalAlign: "text-bottom" }}
								/>
							</th>
							<th style={{ width: 100, padding: "12px 6px" }}>Image</th>
							<th style={{ width: 180, padding: "12px 6px" }}>Name</th>
							<th style={{ width: 180, padding: "12px 6px" }}>Email</th>
							<th style={{ width: 130, padding: "12px 6px" }}>Phone number</th>
							<th style={{ width: 100, padding: "12px 6px" }}>Role</th>
							<th style={{ width: 100, padding: "12px 6px" }}>Status</th>
							<th style={{ width: 140, padding: "12px 6px" }}>
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
									Created at
								</Link>
							</th>
							<th style={{ width: 140, padding: "12px 6px" }}>Updated at</th>
							<th style={{ width: 140, padding: "12px 6px" }}>Actions </th>
						</tr>
					</thead>
					<tbody>
						{sortedRows.map((row) => (
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
									<Avatar
										alt={row.account.name}
										src={row.account.avatar}
										sx={{ width: 70, height: 70 }}
									/>
								</td>
								<td>
									<Typography level="body-xs">{row.account.name}</Typography>
								</td>
								<td>
									<Typography level="body-xs">{row.account.email}</Typography>
								</td>
								<td>
									<Typography level="body-xs">
										{row.account.phone_number}
									</Typography>
								</td>
								<td>
									<Typography level="body-xs">
										{row.account.roles[0].role_name}
									</Typography>
								</td>
								<td>
									<Typography level="body-xs">
										{getVerifyStatus(row.account.verify)}
									</Typography>
								</td>

								<td>
									<Typography level="body-xs">
										{format(new Date(row.account.created_at), "dd/MM/yyyy")}
									</Typography>
								</td>
								<td>
									<Typography level="body-xs">
										{format(new Date(row.account.updated_at), "dd/MM/yyyy")}
									</Typography>
								</td>
								<td>
									<Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
										<RowMenu row={row} />
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
			<EditUserModal
				user={selectedUser}
				isOpen={isModalOpen}
				onClose={() => {
					setIsModalOpen(false);
				}}
				onSave={handleSave}
			/>

			<Modal open={isDeleteModalOpen} onClose={cancelDelete}>
				<ModalDialog>
					<ModalClose />
					<Typography level="h4">Confirm Deletion</Typography>
					<Typography>
						Are you sure you want to delete {userToDelete?.account.name}?
					</Typography>
					<div className="flex justify-end gap-2 mt-4">
						<Button variant="plain" color="neutral" onClick={cancelDelete}>
							Cancel
						</Button>
						<Button variant="solid" color="danger" onClick={confirmDelete}>
							Delete
						</Button>
					</div>
				</ModalDialog>
			</Modal>
		</Fragment>
	);
}
