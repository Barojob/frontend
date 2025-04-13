import eslint from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import reactRefreshPlugin from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import storybookPlugin from "eslint-plugin-storybook";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  reactPlugin.configs.flat.recommended,
  reactHooksPlugin.configs["recommended-latest"],
  reactRefreshPlugin.configs.recommended,
  storybookPlugin.configs["flat/recommended"],
  eslintConfigPrettier,
);
