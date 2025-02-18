import {
	AimOutlined,
	CheckOutlined,
	ClockCircleOutlined,
	DownOutlined,
	HeartFilled,
	StarFilled,
	UploadOutlined,
} from "@ant-design/icons";
import { Radio, Tabs, type RadioChangeEvent } from "antd";
import { useState } from "react";
import avatar from "../assets/react.svg";
import Footer from "../components/Footer";
import practitionersList from "../data/practitionerListMock";
import reviewsList from "../data/reviewListMock";
import { spaServices } from "../data/servicesListMock";
import CardItem from "../templates/CardItem";

type TabYPosition = "top" | "bottom";

// const ProfilePopover = (data: any) => {
// 	return
// 	(<div>
// 		<h1>

// 		</h1>
// 	</div>)
// };
// interface subServicesType {
// 	name: string;
// 	duration: string;
// 	therapist: string;
// 	description: string;
// }

// interface servicesType {
// 	name: string;
// 	subservices: subServicesType[];
// }
export default function BranchDetailPage() {
	const [mode, setMode] = useState<TabYPosition>("top");

	const handleModeChange = (e: RadioChangeEvent) => {
		setMode(e.target.value);
	};
	// const getSubservices = (services: servicesType[]) => {
	// 	return services.map((service: servicesType, index: number) => ({
	// 		label: service.name,
	// 		key: String(index + 1),
	// 		content: `<div key={String(index)}>hi</div>`,
	// 	}));
	// };
	// const array = getSubservices(spaServices);
	// console.log(array);
	return (
		<div className="">
			{/* Header */}
			<div className="shadow-md shadow-1">
				<div className="flex items-center justify-between px-6 py-3 mx-12 ">
					<h1 className="font-bold text-2xl">Header</h1>
					<div className="max-w-4xl mx-auto">
						<div className="flex flex-wrap bg-white rounded-full p-3 shadow-md items-center">
							{/* All services */}
							<div className="relative flex-1 flex items-center space-x-2 px-4 border-r">
								{/* Button mở dropdown */}
								<button>
									<div className="flex items-center gap-2">
										<span>🔍</span>
									</div>
								</button>
							</div>

							{/* Branches */}
							<div className="relative flex-1 flex items-center space-x-2 px-4 border-r">
								{/* Button mở dropdown */}
								<button>
									<div className="flex items-center gap-2">
										<span>🔍</span>
									</div>
								</button>
							</div>

							{/* Date */}
							<div className="relative flex-1 flex items-center space-x-2 px-4 border-r">
								{/* Button mở dropdown */}
								<button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white shadow-sm">
									<span>⏰</span>
								</button>
							</div>

							{/* Time */}
							<div className="relative flex-1 flex items-center space-x-2 px-4 border-r">
								{/* Button mở dropdown */}
								<button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white shadow-sm">
									<span>⏱️</span>
								</button>

								{/* Dropdown Time */}
							</div>

							{/* Button Search */}
							<button className="bg-black text-white px-6 py-2 rounded-full ml-2">
								Search
							</button>
						</div>
					</div>
					<div className="border-1.75 p-[0.2rem] rounded-full flex space-x-4 pr-3">
						<img src={avatar} alt="Avatar" className="w-10 aspect-square" />
						<DownOutlined />
					</div>
				</div>
			</div>
			{/* Container */}
			<div className=" px-6 py-3 mx-12">
				<div className="">
					<p className="inline-block text-sm text-gray-500 mb-4 pb-3">
						Home / Branch / Branch Detail
					</p>
					<div className="text-5xl font-extrabold">
						Dee Kar Hair Salon (Lgk)
					</div>
					<div className="flex justify-between">
						<div className="inline-flex items-end space-x-4 pt-1">
							<div className="flex items-center justify-center gap-1">
								<p className="font-semibold">4.9</p>
								<div className="space-x-[0.2rem]">
									<StarFilled />
									<StarFilled />
									<StarFilled />
									<StarFilled />
									<StarFilled />
								</div>
								<a className="font-semibold text-[#5C4AD1]">(29)</a>
							</div>
							<div className="flex space-x-2 items-center">
								<p className="text-sm">•</p>
								<p>Closed</p>
								<p>opens on Tuesday at 11:00</p>
							</div>
							<div className="flex space-x-2 items-center">
								<p className="text-sm">•</p>
								<p>Kuah, Langkawi</p>
								<a className="text-[#5C4AD1] font-semibold" href="#">
									Get directions
								</a>
							</div>
						</div>
						<div className="flex justify-center items-center space-x-2">
							<div className="flex justify-center items-center p-2 border-1.75  rounded-full w-12 aspect-square">
								<UploadOutlined className="text-2xl " />
							</div>
							<div className="flex justify-center items-center p-2 border-1.75  rounded-full w-12 aspect-square">
								<HeartFilled className="text-2xl text-pink-700" />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="relative px-6 py-3 mx-12 grid grid-cols-3 grid-rows-1 gap-6">
				<div className="col-span-2 row-span-2">
					<img
						src="https://images.fresha.com/locations/location-profile-images/1385435/2301275/9f6729bb-3df9-49be-81f0-e77b857d0280-DeeKarHairSalon-MY-Kedah-Langkawi-Kuah-Fresha.jpg?class=venue-gallery-large&dpr=2"
						alt=""
						className="w-full h-auto rounded-lg shadow-md"
					/>
				</div>
				<div className="col-span-1 flex flex-col gap-6">
					<img
						src="https://images.fresha.com/locations/location-profile-images/1385435/2301276/a07f6cea-c12b-4524-ad84-882da550e78e-DeeKarHairSalon-MY-Kedah-Langkawi-Kuah-Fresha.jpg?class=venue-gallery-small&dpr=2"
						alt=""
						className="w-full h-auto rounded-lg shadow-md"
					/>
					<img
						src="https://images.fresha.com/locations/location-profile-images/1385435/2301275/9f6729bb-3df9-49be-81f0-e77b857d0280-DeeKarHairSalon-MY-Kedah-Langkawi-Kuah-Fresha.jpg?class=venue-gallery-large&dpr=2"
						alt=""
						className="w-full h-auto rounded-lg shadow-md"
					/>
				</div>
				<div className="font-bold text-sm absolute py-[6px] px-4 rounded-md bottom-14 right-12 bg-white shadow-md border-1.75">
					See all images
				</div>
			</div>
			<div className="px-6 mx-12">
				<div className="relative grid grid-cols-3 grid-rows-1 gap-6">
					<div className="col-span-2 row-span-2">
						<div className="mt-6">
							{/* Services */}
							<div className="">
								<h1 className="text-4xl font-extrabold">Services</h1>
								{/* Tabs */}
								<div>
									<Radio.Group
										onChange={handleModeChange}
										value={mode}
										style={{ marginBottom: 8 }}
									></Radio.Group>
									<Tabs
										defaultActiveKey="1"
										tabPosition={mode}
										items={spaServices.map((spaService, i) => {
											const id = String(i + 1);
											return {
												label: spaService.name,
												key: id,
												children: spaService.subservices.map((subService) => {
													return (
														<div className="p-6 my-3 border rounded-md flex justify-between items-center hover:bg-gray-100 ease-in-out transition-all">
															<div className="">
																<h3 className="text-lg font-medium">
																	{subService.name}
																</h3>
																<div className="text-base text-gray-500 leading-none">
																	{subService.duration}
																</div>
																<div className="mt-2 font-medium">
																	from {subService.therapist}
																</div>
															</div>
															<div className="text-base font-semibold border rounded-3xl px-4 py-1 bg-white">
																Book
															</div>
														</div>
													);
												}),
											};
										})}
									/>
								</div>
								<button className="px-4 py-2 border text-base font-bold rounded-lg hover:bg-gray-100 ease-in-out transition-all">
									See all
								</button>
							</div>
						</div>
						<div className="mt-12">
							{/* Teams */}
							<div className="">
								<h1 className="text-5xl font-extrabold">Teams</h1>
								<div className="flex flex-wrap mt-16 gap-x-20 gap-y-10">
									{practitionersList.map((practitioner, i) => (
										<div className="flex flex-col items-center">
											<div className="relative font-bold">
												<img
													className=" h-32 aspect-square rounded-full"
													src={practitioner.avatar}
													alt={String(i)}
												/>
												<div className="px-3 py-1 flex gap-1 border rounded-full bg-white absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
													{practitioner.stars}
													<StarFilled />
												</div>
											</div>
											<div className="mt-6 w-32 flex-col flex items-center">
												<div className="font-bold">{practitioner.name}</div>
												<div className="text-sm text-center text-gray-500">
													{practitioner.major}
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
						<div className="mt-24">
							{/* Teams */}
							<div className="">
								<h1 className="text-5xl font-extrabold">Reviews</h1>
								<div className="mt-6 space-x-2 text-3xl">
									<StarFilled />
									<StarFilled />
									<StarFilled />
									<StarFilled />
									<StarFilled />
								</div>
								<div className="flex text-lg font-semibold">
									<div className="font-bold">4.9</div>
									<div className="text-[#5C4AD1]"> (29)</div>
								</div>
								<div className="mt-8 grid grid-cols-2 gap-6">
									{reviewsList.map((review) => (
										<div className="col-span-1 p-6 border rounded-lg">
											<div className="flex items-center font-bold">
												<img
													className="h-16 aspect-square rounded-full"
													src={review.avatar}
													alt={review.name}
												/>
												<div className="px-3 py-1">
													<div className="font-semibold">{review.name}</div>
													<div className="text-xs font-extralight">
														{/* Format ngày tháng */}
														{new Date(review.createdAt).toLocaleDateString(
															"en-US",
															{
																year: "numeric",
																month: "long",
																day: "numeric",
															},
														)}
													</div>
												</div>
											</div>
											<span className="mt-4 space-x-1 text-base">
												<StarFilled />
												<StarFilled />
												<StarFilled />
												<StarFilled />
												<StarFilled />
											</span>
											<div className="text-lg">{review.comment}</div>
										</div>
									))}
								</div>
								<button className="mt-8 px-4 py-2 border text-base font-bold rounded-lg hover:bg-gray-100 ease-in-out transition-all">
									See all
								</button>
							</div>
						</div>
						<div className="mt-24">
							{/* Teams */}
							<div className="">
								<h1 className="text-5xl font-extrabold">About</h1>
								<div className="mt-6 text-base">
									Dee Kar Hair Salon is a professional and stylish salon known
									for its exceptional hair care services. Offering a wide range
									of treatments, including haircuts, coloring, styling, and
									specialized hair treatments, the salon focuses on delivering
									personalized experiences to each client. With a team of
									skilled and passionate hairstylists, Dee Kar Hair Salon
									ensures that clients leave feeling confident and satisfied
									after every visit. The salon uses high-quality products and
									the latest techniques to cater to diverse hair needs!
								</div>
								{/* <Map
									style={{ width: "100vw", height: "100vh" }}
									defaultCenter={{ lat: 22.54992, lng: 0 }}
									defaultZoom={3}
									gestureHandling={"greedy"}
									disableDefaultUI={true}
								/> */}
								<img
									className="my-6 w-full h-auto rounded-lg shadow-md"
									src="https://i.pinimg.com/736x/95/08/fe/9508fe83c22e45725ad886b7cb67fe94.jpg"
									alt=""
								/>
								<div className="">
									9-2 Langkawi City, Jalan Mahawangsa 1, Persiaran Putra, Kuah,
									Langkawi, Kedah{" "}
									<a className="text-[#5C4AD1] font-semibold">Get directions</a>
								</div>
							</div>
						</div>
						<div className="mt-12">
							<div className="grid grid-cols-2 gap-6">
								<div className="col-span-1 space-y-4">
									<h1 className="text-2xl font-bold">Opening Times</h1>
									<div className="flex items-center justify-between">
										<div className="flex items-center  space-x-4">
											<div className="bg-gray-300 p-[6px] w-1 aspect-square rounded-full" />
											<div className="font-bold text-base">Monday</div>
										</div>
										<div className="">Closed</div>
									</div>
									<div className="flex items-center justify-between">
										<div className="flex items-center  space-x-4">
											<div className="bg-green-500 p-[6px] w-1 aspect-square rounded-full" />
											<div className="font-bold text-base">Tuesday</div>
										</div>
										<div className="">11:00 - 20:00</div>
									</div>
									<div className="flex items-center justify-between">
										<div className="flex items-center  space-x-4">
											<div className="bg-green-500 p-[6px] w-1 aspect-square rounded-full" />
											<div className="font-bold text-base">Wednesday</div>
										</div>
										<div className="">11:00 - 20:00</div>
									</div>
									<div className="flex items-center justify-between">
										<div className="flex items-center  space-x-4">
											<div className="bg-green-500 p-[6px] w-1 aspect-square rounded-full" />
											<div className="font-bold text-base">Monday</div>
										</div>
										<div className="">11:00 - 20:00</div>
									</div>
									<div className="flex items-center justify-between">
										<div className="flex items-center  space-x-4">
											<div className="bg-green-500 p-[6px] w-1 aspect-square rounded-full" />
											<div className="font-bold text-base">Monday</div>
										</div>
										<div className="">11:00 - 20:00</div>
									</div>
									<div className="flex items-center justify-between">
										<div className="flex items-center  space-x-4">
											<div className="bg-green-500 p-[6px] w-1 aspect-square rounded-full" />
											<div className="font-bold text-base">Monday</div>
										</div>
										<div className="">11:00 - 20:00</div>
									</div>
									<div className="flex items-center justify-between">
										<div className="flex items-center  space-x-4">
											<div className="bg-green-500 p-[6px] w-1 aspect-square rounded-full" />
											<div className="font-bold text-base">Monday</div>
										</div>
										<div className="">11:00 - 20:00</div>
									</div>
								</div>
								<div className="col-span-1 space-y-4">
									<h1 className="text-2xl font-bold">Additional information</h1>
									<div className="flex space-x-4 items-center">
										<CheckOutlined />
										<div className="text-base font-light">
											Instant Confirmation
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="mt-12 w-52">
							<div className="text-2xl font-bold">Other locations</div>
							<CardItem
								data={"test"}
								address={
									"D3-04-09 Tamarind Square, Persiaran Multimedia, Cyber 10, Cyberjaya, Selangor"
								}
								category="Hair Salon"
								img="https://images.fresha.com/locations/location-profile-images/1385435/2278646/4e32b51a-96c2-4b85-8685-74d01c92b6ae-DeeKarHairSalon-MY-Selangor-Cyberjaya-Cyber10-Fresha.jpg?class=gallery-modal-large&dpr=2&watermark=true"
								name="Dee Kar Hair Salon"
								star={4.9}
								vote={128}
							/>
						</div>
						<div className="mt-12 w-52">
							<div className="text-2xl font-bold">Venues nearby</div>
							<CardItem
								data={"test"}
								address={
									"D3-04-09 Tamarind Square, Persiaran Multimedia, Cyber 10, Cyberjaya, Selangor"
								}
								category="Hair Salon"
								img="https://images.fresha.com/locations/location-profile-images/1385435/2278646/4e32b51a-96c2-4b85-8685-74d01c92b6ae-DeeKarHairSalon-MY-Selangor-Cyberjaya-Cyber10-Fresha.jpg?class=gallery-modal-large&dpr=2&watermark=true"
								name="Dee Kar Hair Salon"
								star={4.9}
								vote={128}
							/>
						</div>
						<div className="my-12">
							<div className="text-3xl font-bold">
								Treat yourself anytime, anywhere
							</div>
							<div className="p-2 mt-6 rounded-full bg-black text-white text-sm font-bold  w-60 text-center">
								Other businesses in Langkawi
							</div>
							<div className="grid mt-6 grid-cols-2 w-[600px] gap-6 font-semibold">
								<ul className="col-span-1">
									<li>
										<a>Body Scrub Treatments</a>
									</li>
									<li>
										<a>Massage</a>
									</li>
									<li>
										<a>Spas</a>
									</li>
									<li>
										<a>Beauty Salons</a>
									</li>
									<li>
										<a>Facials</a>
									</li>
									<li>
										<a>Spa Packages</a>
									</li>
								</ul>
								<ul className="col-span-1">
									<li>
										<a>Body Scrub Treatments</a>
									</li>
									<li>
										<a>Massage</a>
									</li>
									<li>
										<a>Spas</a>
									</li>
									<li>
										<a>Beauty Salons</a>
									</li>
									<li>
										<a>Facials</a>
									</li>
									<li>
										<a>Spa Packages</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div className="col-span-1 flex flex-col gap-6">
						<div className="sticky-top-section sticky top-20 border-1.75 mt-3 rounded-lg shadow-xl">
							<div className="p-8 space-y-4">
								<h1 className="text-[40px] leading-none font-extrabold">
									Dee Kar Hair Salon (Lgk)
								</h1>
								<div className="flex items-start space-x-3">
									<p className="font-extrabold text-2xl">4.9</p>
									<p className="font-extrabold text-2xl space-x-1">
										<StarFilled />
										<StarFilled />
										<StarFilled />
										<StarFilled />
										<StarFilled />
									</p>
									<a className="font-bold text-2xl text-[#5C4AD1]">(29)</a>
								</div>
								<div className="bg-black px-auto text-white font-extrabold rounded-md py-3 text-center">
									Book now
								</div>
							</div>
							<div className="border-t-[1px] p-8 space-y-4">
								<div className="flex items-center space-x-3">
									<ClockCircleOutlined className="text-xl" />
									<div className="text-base font-semibold">
										<span className="text-red-700">Closed</span> opens on
										Tuesday at 11:00
									</div>
									<DownOutlined className="text-xs" />
								</div>
								<div className="flex items-start space-x-3">
									<AimOutlined className="text-xl" />
									<div className="text-base font-semibold">
										9-2 Langkawi City, Jalan Mahawangsa 1, Persiaran Putra,
										Kuah, Langkawi, Kedah{" "}
										<a className="text-[#5C4AD1] font-semibold">
											Get directions
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}
