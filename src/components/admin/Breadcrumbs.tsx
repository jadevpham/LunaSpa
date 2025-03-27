import { Box, Breadcrumbs, Link, Typography } from "@mui/joy";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

interface BreadcrumbItem {
	title: string;
	href?: string;
}

interface CustomBreadcrumbsProps {
	items: BreadcrumbItem[];
}

const CustomBreadcrumbs = ({ items }: CustomBreadcrumbsProps) => {
	return (
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
				{items.map((item, index) => {
					const isLast = index === items.length - 1;
					return isLast ? (
						<Typography
							key={index}
							color="primary"
							sx={{ fontWeight: 500, fontSize: 12 }}
						>
							{item.title}
						</Typography>
					) : (
						<Link
							key={index}
							underline="hover"
							color="neutral"
							href={item.href}
							sx={{ fontSize: 12, fontWeight: 500 }}
						>
							{item.title}
						</Link>
					);
				})}
			</Breadcrumbs>
		</Box>
	);
};

export default CustomBreadcrumbs;
