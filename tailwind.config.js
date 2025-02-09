/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      spacing: {
        reset: "0", // Thêm reset spacing nếu cần
      },
    },
  },
  plugins: [],
}