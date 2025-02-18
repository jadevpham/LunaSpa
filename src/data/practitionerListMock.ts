import { faker } from "@faker-js/faker";

interface Practitioner {
	name: string;
	stars: number;
	major: string;
	avatar: string;
}
// Tạo một mảng danh sách các nhân viên (practitioners)
const practitionersList: Practitioner[] = [];

// Số lượng nhân viên bạn muốn tạo
const numPractitioners = 10;

// Lặp để tạo dữ liệu cho từng nhân viên
for (let i = 0; i < numPractitioners; i++) {
	const practitioner = {
		name: faker.person.firstName(),
		stars: faker.number.float({ min: 3.5, max: 5, fractionDigits: 1 }),
		major: faker.person.jobTitle(),
		avatar: faker.image.avatar(),
	};

	practitionersList.push(practitioner);
}

export default practitionersList;
