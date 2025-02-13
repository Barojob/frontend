/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pretendard: [
          "Pretendard-Regular",
          "Pretendard-Medium",
          "Pretendard-SemiBold",
          "Pretendard-Bold",
          "Pretendard-Black",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
