import { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        brand: ["var(--font-brand)", "sans-serif"],
        pretendard: [
          "Pretendard-Regular",
          "Pretendard-Medium",
          "Pretendard-SemiBold",
          "Pretendard-Bold",
          "Pretendard-Black",
          "sans-serif",
        ],
      },
      colors: {
        blue: {
          2: "#376FFF",
          3: "#0900FF",
          4: "#374BFF",
        },
        extraBlack: {
          1: "#242424",
        },
        gray: {
          1: "#615F5F",
          2: "#B3B3B3",
          3: "#494949",
          4: "#707070",
          5: "#E0E0E0",
        },
        main: {
          1: "#E1E5EF",
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".h-screen": {
          height: ["100vh /* fallback for Opera, IE and etc. */", "100dvh"],
        },
        ".w-screen": {
          width: ["100vw /* fallback for Opera, IE and etc. */", "100dvw"],
        },
      });
    }),
  ],
} satisfies Config;
