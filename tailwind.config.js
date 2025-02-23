/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{html,ts,js,tsx,,jsx}"],
	theme: {
		extend: {
			spacing: {
				reset: "0", // Thêm reset spacing nếu cần
			},
			colors: {
				1: "#f2f2f2",
				2: "#0d1619",
				3: "#757676",
				4: "#bfbfbf",
				5: "#6950f3",
				6: "3d2e9f",
				7: "#EEEEEE",
			},
			borderWidth: {
				1.75: "1.75px",
			},
		},
	},
	plugins: [],
};
