import { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      blue: {
        2: "#376FFF",
        3: "#0900FF",
        4: "#374BFF",
        5: "#6E83B7",
      },
      extraBlack: {
        1: "#242424",
      },
      gray: {
        0: "#F0F0F0",
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
    fontFamily: {
      brand: "var(--font-brand)",
    },
    extend: {},
  },
  plugins: [],
} satisfies Config;
