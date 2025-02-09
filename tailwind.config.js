/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{html,ts,js,tsx,,jsx}"],
	theme: {
		extend: {
			spacing: {
				reset: "0", // Thêm reset spacing nếu cần
			},
		},
	},
	plugins: [],
};
