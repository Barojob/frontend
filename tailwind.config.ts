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
