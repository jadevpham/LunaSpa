import { faker } from "@faker-js/faker";

interface Review {
	name: string;
	createdAt: Date;
	rating: number;
	comment: string;
	avatar: string;
}

// Tạo một mảng danh sách các đánh giá (reviews)
const reviewsList: Review[] = [];

// Số lượng đánh giá bạn muốn tạo
const numReviews = 10;

// Lặp để tạo dữ liệu cho từng đánh giá
for (let i = 0; i < numReviews; i++) {
	const review: Review = {
		name: faker.person.firstName(),
		createdAt: faker.date.past({ years: 2010 }), // Tạo ngày tháng trong quá khứ trong vòng 1 năm
		rating: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }), // Số sao ngẫu nhiên từ 1 đến 5
		comment: faker.lorem.paragraph(), // Nội dung bình luận ngẫu nhiên,
		avatar: faker.image.avatar(),
	};

	reviewsList.push(review);
}

export default reviewsList;
