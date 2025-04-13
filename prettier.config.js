/**
 * @type {import("prettier").Config}
 */
export default {
  tabWidth: 2,
  semi: true,
  endOfLine: "lf",
  tailwindConfig: "./tailwind.config.ts",
  tailwindStylesheet: ".src/index.css",
  /**
   * @description
   * Tailwind CSS 클래스 사용하는 곳에 정렬이 필요한 Attribute, 이곳에 넣어주세요.
   */
  tailwindAttributes: [
    "labelClassName",
    "buttonClassName",
    "imageClassName",
    "listClassName",
    "itemClassName",
  ],
  plugins: ["prettier-plugin-tailwindcss"],
};
