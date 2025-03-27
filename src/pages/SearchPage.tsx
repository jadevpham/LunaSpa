import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { setFilterCriteria } from "../redux/filterSlice";
import { fetchBranches } from "../redux/branchesSlice";
import { fetchServices } from "../redux/servicesSlice";
import {
	selectFilteredBranches,
	selectFilteredServices,
	selectBranches,
	selectServices,
	selectFilterCriteria,
} from "../redux/selectors";
import { AppDispatch } from "../redux/store";

const SearchPage = () => {
	const dispatch = useDispatch<AppDispatch>();
	const [searchParams] = useSearchParams();

	// ✅ Lấy danh sách từ Redux
	const branchesList = useSelector(selectBranches);
	const servicesList = useSelector(selectServices);
	const filterCriteria = useSelector(selectFilterCriteria);

	// ✅ Nếu reload mất dữ liệu, fetch lại
	useEffect(() => {
		if (branchesList.length === 0) {
			dispatch(fetchBranches());
		}
		if (servicesList.length === 0) {
			dispatch(fetchServices());
		}
	}, [branchesList.length, servicesList.length, dispatch]);

	// ✅ Cập nhật filter từ URL vào Redux (chỉ chạy khi URL thay đổi)
	useEffect(() => {
		const filters = Object.fromEntries(searchParams.entries());

		// 🔥 Loại bỏ các giá trị không hợp lệ
		const cleanedFilters = Object.fromEntries(
			Object.entries(filters).filter(
				([_, value]) => value && value !== "undefined",
			),
		);

		dispatch(setFilterCriteria(cleanedFilters));
	}, [searchParams, dispatch]);

	// ✅ Lấy danh sách đã lọc từ Redux
	const filteredBranches = useSelector(selectFilteredBranches);
	const filteredServices = useSelector(selectFilteredServices);

	// ✅ Kiểm tra filter có tồn tại hay không (sửa lỗi "undefined" bị hiểu là chuỗi)
	const hasBranchFilter = !!(
		filterCriteria.branchId && filterCriteria.branchId !== "undefined"
	);
	const hasServiceFilter = !!(
		filterCriteria.serviceId && filterCriteria.serviceId !== "undefined"
	);

	const hasDateFilter = !!(
		filterCriteria.date && filterCriteria.date !== "undefined"
	);
	const hasStartTimeFilter = !!(
		filterCriteria.startTime && filterCriteria.startTime !== "undefined"
	);
	const hasEndTimeFilter = !!(
		filterCriteria.endTime && filterCriteria.endTime !== "undefined"
	);

	// ✅ Xác định danh sách cần hiển thị
	const branchesToShow = hasBranchFilter ? filteredBranches : branchesList;
	const servicesToShow = hasServiceFilter ? filteredServices : servicesList;

	// ✅ Hiển thị kết quả
	return (
		<>
			<div className="bg-gray-100">
				<div className="flex h-screen">
					{/* Left Panel: Salon List */}
					<div className="w-2/5 bg-white p-6 overflow-y-auto">
						<div className="flex justify-between items-center mb-4">
							<p className="text-sm text-gray-500">29 Branch</p>
						</div>
						<div className="space-y-4">
							{branchesToShow.length > 0 ? (
								branchesToShow.map((branch) => (
									<div className="bg-white shadow-md rounded-lg overflow-hidden">
										<div className="p-4">
											<img
												src={branch.images[0]}
												alt="Branch 1"
												className="w-full h-48 object-cover rounded-2xl"
											/>
											<h3 className="mt-3 text-xl font-bold">{branch.name}</h3>
											<p className="text-sm text-gray-500">
												{branch.contact.address}
											</p>
											<div className="mt-3">
												<h4 className="text-lg font-bold">Services</h4>
												<ul className="list-disc">
													{servicesToShow.length > 0 ? (
														servicesToShow.map((service) => (
															<div className="my-4 px-3 py-3 bg-white shadow-md  rounded-lg overflow-hidden">
																<li className="flex justify-between text-sm">
																	<span className="font-semibold">
																		{service.name}
																	</span>
																	<span className="font-semibold">
																		₫{service.price}
																	</span>
																</li>
																<p className="text-sm text-gray-500">
																	{service.description}
																</p>
																<div className="flex space-x-2 mt-2">
																	<button className="px-3 py-1 border rounded-lg text-sm border-5 text-5 hover:border-1.75 hover:bg-7 transition-all duration-300">
																		11:45
																	</button>
																	<button className="px-3 py-1 border rounded-lg text-sm border-5 text-5 hover:border-1.75 hover:bg-7 transition-all duration-300">
																		12:00
																	</button>
																	<button className="px-3 py-1 border rounded-lg text-sm border-5 text-5 hover:border-1.75 hover:bg-7 transition-all duration-300">
																		12:30
																	</button>
																	<button className="px-3 py-1 border rounded-lg text-sm border-5 text-5 hover:border-1.75 hover:bg-7 transition-all duration-300">
																		13:00
																	</button>
																</div>
															</div>
														))
													) : (
														<p>Không tìm thấy dịch vụ phù hợp</p>
													)}
												</ul>
											</div>
										</div>
									</div>
								))
							) : (
								<p>Không tìm thấy chi nhánh phù hợp</p>
							)}
						</div>
					</div>
					{/* Right Panel: Map */}
					<div className="w-3/5 bg-gray-200 relative">
						<iframe
							className="w-full h-full"
							src="https://www.openstreetmap.org/export/embed.html"
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default SearchPage;

{
	/* <div>
<h2>Kết quả tìm kiếm</h2>

<h3>Chi nhánh:</h3>
{branchesToShow.length > 0 ? (
	branchesToShow.map((branch) => <p key={branch.id}>{branch.name}</p>)
) : (
	<p>Không tìm thấy chi nhánh phù hợp</p>
)}

<h3>Dịch vụ:</h3>
{servicesToShow.length > 0 ? (
	servicesToShow.map((service) => (
		<p key={service.id}>{service.name}</p>
	))
) : (
	<p>Không tìm thấy dịch vụ phù hợp</p>
)}

<h3>Ngày:</h3>
{hasDateFilter ? <p>{filterCriteria.date}</p> : <p>Không có ngày</p>}

<h3>Thời gian bắt đầu:</h3>
{hasStartTimeFilter ? (
	<p>{filterCriteria.startTime}</p>
) : (
	<p>Không có thời gian bắt đầu</p>
)}

<h3>Thời gian kết thúc:</h3>
{hasEndTimeFilter ? (
	<p>{filterCriteria.endTime}</p>
) : (
	<p>Không có thời gian kết thúc</p>
)}
</div> */
}
