import { useRef, useState } from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import IconButton from "@mui/joy/IconButton";
import Stack from "@mui/joy/Stack";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardOverflow from "@mui/joy/CardOverflow";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import AccessTimeFilledRoundedIcon from "@mui/icons-material/AccessTimeFilledRounded";
import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import CountrySelector from "../../../components/admin/Users/CountrySelector";
import { DayPicker } from "react-day-picker";
import { format, getDaysInMonth, isValid, parse } from "date-fns";
import debounce from "lodash.debounce";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateEmail = (email: string) => {
	return emailRegex.test(email);
};

const CreateUserForm = () => {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		role: "",
		date_of_birth: "",
	});
	console.log(formData);
	const [date, setDate] = useState({ day: "", month: "", year: "" });
	const monthRef = useRef<HTMLInputElement>(null);
	const yearRef = useRef<HTMLInputElement>(null);
	const [selectedDate, setSelectedDate] = useState<Date | undefined>();
	const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
	const [avatarPreview, setAvatarPreview] = useState<string>(
		"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286",
	);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const getValidDay = (day: number, month: number, year: number) => {
		const maxDays = getDaysInMonth(new Date(year, month - 1));
		return Math.min(day, maxDays);
	};

	// Xử lý nhập ngày, tháng, năm
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		field: "day" | "month" | "year",
	) => {
		let value = e.target.value.replace(/\D/g, ""); // Chỉ cho nhập số

		if (field === "day") {
			const maxDays = getDaysInMonth(
				new Date(
					Number(date.year) || new Date().getFullYear(),
					(Number(date.month) || 1) - 1,
				),
			);
			value = Math.min(Number(value), maxDays).toString();
		}
		if (field === "month" && Number(value) > 12) value = "12";
		if (field === "year" && value.length > 4) value = value.slice(0, 4);

		setDate((prev) => ({ ...prev, [field]: value }));

		// Chuyển focus khi nhập đủ
		if (field === "day" && value.length === 2) monthRef.current?.focus();
		if (field === "month" && value.length === 2) yearRef.current?.focus();
		if (field === "year" && value.length === 4)
			validateDate({ ...date, [field]: value });
	};

	// Kiểm tra ngày hợp lệ
	const validateDate = (newDate: {
		day: string;
		month: string;
		year: string;
	}) => {
		if (!newDate.day || !newDate.month || !newDate.year) return;

		const day = getValidDay(
			Number(newDate.day),
			Number(newDate.month),
			Number(newDate.year),
		);
		const fullDate = `${day}-${newDate.month}-${newDate.year}`;
		const parsedDate = parse(fullDate, "dd-MM-yyyy", new Date());
		if (isValid(parsedDate)) {
			setSelectedDate(parsedDate);
			setFormData((prev) => ({
				...prev,
				date_of_birth: parsedDate.toISOString(),
			}));
			setDate({
				day: day.toString(),
				month: newDate.month,
				year: newDate.year,
			});
			setIsDatePickerOpen(false);
		} else {
			setDate({ day: "", month: "", year: "" });
		}
	};

	const handleDateSelect = (date: Date | undefined) => {
		if (date) {
			setSelectedDate(date);
			setFormData((prev) => ({ ...prev, date_of_birth: date.toISOString() }));
			setDate({
				day: format(date, "dd"),
				month: format(date, "MM"),
				year: format(date, "yyyy"),
			});
			setIsDatePickerOpen(false);
		}
	};

	const handleSelectRole = (_event: unknown, value: string | null) => {
		if (value) {
			setFormData((prev) => ({ ...prev, role: value }));
		}
	};
	const handleChangeInput = debounce(
		(
			e: React.ChangeEvent<HTMLInputElement>,
			field: "firstName" | "lastName" | "email",
		) => {
			const value = e.target.value;
			if (field === "email" && !validateEmail(value)) {
				console.error("Invalid email format");
				return;
			}
			setFormData((prev) => ({ ...prev, [field]: value }));
		},
		100,
	);

	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleUploadClick = () => {
		fileInputRef.current?.click();
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const maxSizeInMB = 2; //max 2mb
			const validImageTypes = ["image/jpeg", "image/png", "image/gif"];

			if (!validImageTypes.includes(file.type)) {
				setErrorMessage(
					"Invalid file type. Please upload an image (JPEG, PNG, GIF).",
				);
				return;
			}

			if (file.size > maxSizeInMB * 1024 * 1024) {
				setErrorMessage("File size exceeds 2MB. Please upload a smaller file.");
				return;
			}

			setErrorMessage(null);

			const fileURL = URL.createObjectURL(file);
			setAvatarPreview(fileURL);
			console.log("File uploaded:", file);
		}
	};

	return (
		<Box sx={{ flex: 1, width: "100%" }}>
			<Stack
				spacing={4}
				sx={{
					display: "flex",
					flexDirection: "column",
					width: "100%",
					maxWidth: "1050px",
					mx: "auto",
					px: { xs: 2, md: 6 },
					py: { xs: 2, md: 3 },
					overflowX: "hidden", // Ngăn tràn ngang
				}}
			>
				<Card>
					<Box sx={{ mb: 1 }}>
						<Typography level="title-md">Create new user</Typography>
						<Typography level="body-sm">
							Please fill out the form below to create a new user
						</Typography>
					</Box>
					<Divider />
					<Stack
						direction="row"
						spacing={3}
						sx={{ display: { xs: "none", md: "flex" }, my: 1 }}
					>
						<Stack direction="column" spacing={1}>
							<AspectRatio
								ratio="1"
								maxHeight={200}
								sx={{ flex: 1, minWidth: 120, borderRadius: "100%" }}
							>
								<img
									src={avatarPreview}
									srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
									loading="lazy"
									alt="Avatar"
								/>
							</AspectRatio>

							<IconButton
								onClick={handleUploadClick}
								aria-label="upload new picture"
								size="sm"
								variant="outlined"
								color="neutral"
								sx={{
									bgcolor: "background.body",
									position: "absolute",
									zIndex: 2,
									borderRadius: "50%",
									left: 100,
									top: 170,
									boxShadow: "sm",
								}}
							>
								<EditRoundedIcon />
							</IconButton>
							<input
								type="file"
								accept="image/*"
								ref={fileInputRef}
								style={{ display: "none" }}
								onChange={handleFileChange}
							/>
						</Stack>
						<Stack spacing={2} sx={{ flexGrow: 1 }}>
							<Stack spacing={1}>
								<FormLabel>Name</FormLabel>
								<Stack direction="row" spacing={2}>
									<FormControl sx={{ flexGrow: 1 }}>
										<Input
											size="sm"
											placeholder="First name"
											onChange={(e) => {
												handleChangeInput(e, "firstName");
											}}
										/>
									</FormControl>
								</Stack>
								<Stack direction="row" spacing={2}>
									<FormControl sx={{ flexGrow: 1 }}>
										<Input
											size="sm"
											placeholder="Last name"
											sx={{ flexGrow: 1 }}
											onChange={(e) => {
												handleChangeInput(e, "lastName");
											}}
										/>
									</FormControl>
								</Stack>
							</Stack>
							<Stack direction="row" spacing={2}>
								<FormControl sx={{ flexGrow: 1 }}>
									<FormLabel>Role</FormLabel>
									<Select
										onChange={handleSelectRole}
										defaultValue="User"
										startDecorator={<AdminPanelSettingsRoundedIcon />}
										size="sm"
									>
										<Option value={"Admin"}>Admin</Option>
										<Option value={"User"}>User</Option>
										<Option value={"Staff"}>Staff</Option>
									</Select>
								</FormControl>
								<FormControl sx={{ flexGrow: 1 }}>
									<FormLabel>Email</FormLabel>
									<Input
										size="sm"
										type="email"
										startDecorator={<EmailRoundedIcon />}
										placeholder="email"
										sx={{ flexGrow: 1 }}
										onChange={(e) => {
											handleChangeInput(e, "email");
										}}
									/>
								</FormControl>
							</Stack>
							<div>
								<CountrySelector />
							</div>
							<FormLabel>Date of Birth</FormLabel>
							<Stack direction="row" spacing={1}>
								<FormControl>
									<Input
										size="sm"
										placeholder="DD"
										value={date.day}
										onChange={(e) => handleChange(e, "day")}
									/>
								</FormControl>
								<FormControl>
									<Input
										size="sm"
										ref={monthRef}
										placeholder="MM"
										value={date.month}
										onChange={(e) => handleChange(e, "month")}
									/>
								</FormControl>
								<FormControl>
									<Input
										size="sm"
										ref={yearRef}
										placeholder="YYYY"
										value={date.year}
										onChange={(e) => handleChange(e, "year")}
									/>
								</FormControl>
								<Button
									size="sm"
									variant="outlined"
									onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
								>
									{isDatePickerOpen ? "Close" : "Pick a date"}
								</Button>
							</Stack>

							{isDatePickerOpen && (
								<DayPicker
									mode="single"
									defaultMonth={selectedDate}
									selected={selectedDate}
									onSelect={handleDateSelect}
									captionLayout="dropdown"
									startMonth={new Date(1900, 0)}
									endMonth={new Date()}
								/>
							)}
							{errorMessage && (
								<Typography textColor="danger.500" sx={{ mt: 1 }}>
									{errorMessage}
								</Typography>
							)}
						</Stack>
					</Stack>
					<Stack
						direction="column"
						spacing={2}
						sx={{ display: { xs: "flex", md: "none" }, my: 1 }}
					>
						<Stack direction="row" spacing={2}>
							<Stack direction="column" spacing={1}>
								<AspectRatio
									ratio="1"
									maxHeight={108}
									sx={{ flex: 1, minWidth: 108, borderRadius: "100%" }}
								>
									<img
										src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
										srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
										loading="lazy"
										alt=""
									/>
								</AspectRatio>
								<IconButton
									aria-label="upload new picture"
									size="sm"
									variant="outlined"
									color="neutral"
									sx={{
										bgcolor: "background.body",
										position: "absolute",
										zIndex: 2,
										borderRadius: "50%",
										left: 85,
										top: 180,
										boxShadow: "sm",
									}}
								>
									<EditRoundedIcon />
								</IconButton>
							</Stack>
							<Stack spacing={1} sx={{ flexGrow: 1 }}>
								<FormLabel>Name</FormLabel>
								<Stack direction="row" spacing={2}>
									<FormControl sx={{ flexGrow: 1 }}>
										<Input size="sm" placeholder="First name" />
									</FormControl>
								</Stack>
								<Stack direction="row" spacing={2}>
									<FormControl sx={{ flexGrow: 1 }}>
										<Input
											size="sm"
											placeholder="Last name"
											sx={{ flexGrow: 1 }}
										/>
									</FormControl>
								</Stack>
							</Stack>
						</Stack>
						<FormControl>
							<FormLabel>Role</FormLabel>
							<Select onChange={handleSelectRole} defaultValue="User">
								<Option value={"Admin"}>Admin</Option>
								<Option value={"User"}>User</Option>
								<Option value={"Staff"}>Staff</Option>
							</Select>
						</FormControl>
						<FormControl sx={{ flexGrow: 1 }}>
							<FormLabel>Email</FormLabel>
							<Input
								size="sm"
								type="email"
								startDecorator={<EmailRoundedIcon />}
								placeholder="email"
								defaultValue="siriwatk@test.com"
								sx={{ flexGrow: 1 }}
							/>
						</FormControl>
						<div>
							<CountrySelector />
						</div>
						<div>
							<FormControl sx={{ display: { sm: "contents" } }}>
								<FormLabel>Timezone</FormLabel>
								<Select
									size="sm"
									startDecorator={<AccessTimeFilledRoundedIcon />}
									defaultValue="1"
								>
									<Option value="1">
										Indochina Time (Bangkok){" "}
										<Typography textColor="text.tertiary" sx={{ ml: 0.5 }}>
											— GMT+07:00
										</Typography>
									</Option>
									<Option value="2">
										Indochina Time (Ho Chi Minh City){" "}
										<Typography textColor="text.tertiary" sx={{ ml: 0.5 }}>
											— GMT+07:00
										</Typography>
									</Option>
								</Select>
							</FormControl>
						</div>
					</Stack>
					<CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
						<CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
							<Button size="sm" variant="outlined" color="neutral">
								Cancel
							</Button>
							<Button size="sm" variant="solid">
								Save
							</Button>
						</CardActions>
					</CardOverflow>
				</Card>
			</Stack>
		</Box>
	);
};

export default CreateUserForm;
